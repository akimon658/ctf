const decoder = new TextDecoder()

let input = ""

for await (const chunk of Deno.stdin.readable) {
  input += decoder.decode(chunk)
}

input = input.replace(/\0/g, "")
let output = input.replace(
  /(?:\+\s*)?\[char\]\s*(\d+)/gi,
  (_, code) => {
    const charCode = parseInt(code, 10)
    const char = String.fromCharCode(charCode)

    return char
  },
)
output = output.replace(/([\w"')]|\))\s*\+\s*(?=["'(\w])/g, "$1")

console.log(output)
