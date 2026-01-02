import { DOMParser } from "@b-fuze/deno-dom"

const TARGET = "alpacahack"
const document = await fetch(
  "https://en.wikipedia.org/wiki/List_of_animal_names",
)
  .then((res) => res.text())
  .then((html) => new DOMParser().parseFromString(html, "text/html"))
const animalNames = new Set<string>()
const tables = document.querySelectorAll("table.wikitable")

for (const table of tables) {
  const rows = table.querySelectorAll("tr")

  for (const row of rows) {
    const firstCell = row.querySelector("td")

    if (!firstCell) {
      continue
    }

    const link = firstCell.querySelector("a")

    if (link) {
      const animalName = link.textContent.trim().toLowerCase()

      animalNames.add(animalName)
    }
  }
}

const candidates: string[] = []

for (let i = 0; i < TARGET.length; i++) {
  for (let j = i + 1; j <= TARGET.length; j++) {
    const sub = TARGET.slice(i, j)

    if (animalNames.has(sub)) {
      candidates.push(sub)
    }
  }
}

console.log(candidates)
