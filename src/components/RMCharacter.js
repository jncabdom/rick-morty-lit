import { LitElement, html, css } from "lit";

const PREFIX_URL = "https://rickandmortyapi.com/api/character/";

export async function fetchData(charId) {
  return fetch(`${PREFIX_URL}${charId}`)
    .then(response => response.json())
    .then(data => {
      const episodePromises = data.episode.map(url => fetch(url));
      return Promise.all(episodePromises).then(values => {
        return {
          name: data.name,
          status: data.status,
          species: data.species,
          gender: data.gender,
          origin: data.origin.name,
          image: data.image,
          episodes: values
        };
      });
    });
};

export class RMCharacter extends LitElement {
  constructor(data) {
    super();
    this.data = {
      name: data.name,
      status: data.status,
      species: data.species,
      gender: data.gender,
      origin: data.origin.name,
      image: data.image,
      episodes: data.episodes
    };
    console.log(this.episodes);
    this.episodeNames = [];
    this.charId = this.getAttribute("character-id");
  }

  static get styles() {
    return css``;
  }

  render() {
    return html`
    <div class="container">
      <div class ="data">
          <div class="name">${this.data.name}</div>
          <div class="status">${this.data.status}</div>
          <div class="species">${this.data.species}</div>
          <div class="gender">${this.data.gender}</div>
          <div class="origin">${this.data.origin}</div>
      </div>
      <img src="${this.data.image}" alt="${this.data.name}" class="image">
    </div>`;
  }
}

customElements.define("rm-character", RMCharacter);
