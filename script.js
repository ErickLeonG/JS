const fetchPokemon = () => {
  const pokeNameInput = document.getElementById("pokeName");
  let pokeName = pokeNameInput.value;
  pokeName = pokeName.toLowerCase();
  const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
  fetch(url)
    .then((res) => {
      if (res.status != "200") {
        reset();
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data) {
        //Name
        document.getElementById("pokeName").value = toTitle(data.name);
        pokeText(toTitle(data.name), "name");
        //Number
        pokeText(data.id, "number");
        //Image
        pokeImage(data.sprites.front_default);
        //Type
        let pokeType = "";
        data.types.forEach((type) => {
          pokeType += toTitle(type.type.name) + " / ";
        });
        pokeText(pokeType.slice(0, -3), "type");
        //Stats
        for (let i = 0; i <= 5; i++) {
          pokeText(data.stats[i].base_stat, data.stats[i].stat.name);
        }
        //Ability
        pokeText(toTitle(data.abilities[0].ability.name), "ability");
      }
    });
};

const pokeImage = (url) => {
  const pokePhoto = document.getElementById("pokeImg");
  pokePhoto.src = url;
};

const pokeText = (string, id) => {
  const pokeInfo = document.getElementById(id);
  pokeInfo.innerText = string;
};

function reset() {
  pokeText("???", "name");
  pokeText("???", "number");
  pokeImage(
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
  );
  pokeText("???", "type");
  pokeText("???", "hp");
  pokeText("???", "attack");
  pokeText("???", "defense");
  pokeText("???", "special-attack");
  pokeText("???", "special-defense");
  pokeText("???", "speed");
  pokeText("???", "ability");
}

function toTitle(string) {
  string = string.charAt(0).toUpperCase() + string.slice(1);
  return string;
}
