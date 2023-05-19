import { pokeInfo, searchPokemon, get20Pokemons } from "./requests.js";

function search() {
  const searchButton = document.querySelector("button");

  const searchIfo = document.querySelector("input");

  searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    if (searchIfo.value == "") {
      alert("Digite um Pokemon para pesquisar");
    } else {
      renderLoading();
      setTimeout(async () => {
        const wantedPoke = searchIfo.value;

        const result = await searchPokemon(wantedPoke.toLowerCase());

        if (result == "erro") {
          renderError(wantedPoke);
        } else {
          renderPokemon(result);
        }
        searchIfo.value = "";
      }, 2000);
    }
  });
}
search();

function renderError(pokemon) {
  const pokeList = document.querySelector("ul");

  pokeList.innerHTML = "";

  const errorInfo = document.createElement("h2");
  errorInfo.classList.add("poke-section__info");
  errorInfo.innerText = `Erro. Pokémon "${pokemon}" não encontrado. Tente Novamente`;

  pokeList.appendChild(errorInfo);
}

function renderLoading() {
  const pokeList = document.querySelector("ul");
  pokeList.innerHTML = "";

  const loadInfo = document.createElement("h2");
  loadInfo.classList.add("poke-section__info");
  loadInfo.innerText = "Carregando...";

  pokeList.appendChild(loadInfo);
}

function renderPokemon(pokemon, search = true) {
  const pokeList = document.querySelector("ul");

  if (search) {
    pokeList.innerHTML = "";
  }

  const pokeInfo = document.createElement("li");
  pokeInfo.classList.add("poke-section__poke");

  const pokeImage = document.createElement("img");
  pokeImage.classList.add("poke__image");
  pokeImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
  pokeImage.alt = pokemon.name;

  const pokeName = document.createElement("h2");
  pokeName.classList.add("poke__name");
  pokeName.innerText = pokemon.name;

  pokeInfo.append(pokeImage, pokeName);

  pokeList.appendChild(pokeInfo);
}

function initialRender() {
  renderLoading();
  setTimeout(async () => {
    const data = await get20Pokemons();

    if (data == "erro") {
      renderError();
    } else {
      const pokeList = document.querySelector("ul");
      pokeList.innerHTML = "";
      const betterData = data.results;
      betterData.forEach(
        async (pokemon) =>
          await pokeInfo(pokemon.url).then((poke) => renderPokemon(poke, false))
      );
    }
  }, 2000);
}
initialRender();
