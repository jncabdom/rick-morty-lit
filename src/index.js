import { RMCharacter, fetchData } from "./components/RMCharacter.js";

const container = document.querySelector(".characters-container");
const characterNumber = 10;

for (let i = 1; i <= characterNumber; i++) {
  fetchData(i).then(data => {
    const newChar = new RMCharacter(data);
    container.appendChild(newChar);
  });
}
