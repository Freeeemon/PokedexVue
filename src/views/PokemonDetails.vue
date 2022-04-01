<template>
  <div
    class="background-color"
    v-bind:style="getColor.color1"
    v-if="onePokemon != undefined"
  >
    <img class="margin-top-pokemon" :src="onePokemon.image" alt="" />
    <img class="margin-top-pokemon width-vue" :src="onePokemon.imagefrontshiny" alt="" />
    <img class="margin-top-pokemon width-vue" :src="onePokemon.imagebackshiny" alt="" />
    <div v-bind:style="getColor.color2" class="name-id">
      <h2>N° : {{ pokemonId }}</h2>
      <h2>{{ onePokemon.name }}</h2>
    </div>
    <div class="weight-height">
      <h2>{{ onePokemon.weight }} kg</h2>
      <h2>{{ onePokemon.height }} cm</h2>
    </div>
    <div class="type">
      <h2 v-for="(t, type) in onePokemon.types" v-bind:key="type">{{ t }}</h2>
    </div>
    <audio class="sound" autoplay controls :src="onePokemon.sound"></audio>
  </div>
</template>

<style scoped>
.background-color {
  border-radius: 44px;
}
h1 {
  display: block;
  font-size: 1em;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
}

.name-id {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: white;
  border-radius: 20px;
  margin: 0px 364px;
  margin-top: 5rem;
}

.sound {
  margin-top: 2rem;
}

.weight-height {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: white;
  background-color: slategray;
  border-radius: 20px;
  margin: 0px 424px;
  margin-top: 2rem;
}

.type {
  display: flex;
  justify-content: center;
  gap: 2rem;
  color: white;
  background-color: slategray;
  border-radius: 20px;
  margin: 0px 424px;
  margin-top: 2rem;
}

.margin-top-pokemon {
  margin-top: 2rem;
}

.width-vue {
  width: 
  10%;
}
</style>

<script>
import { PokemonService } from "../services/pokemonService.js";
export default {
  name: "PokemonDetails",
  data() {
    return {
      pokemonId: 0,
      onePokemon: null,
      service: new PokemonService(),
    };
  },

  computed: {
    getColor() {
      if (this.onePokemon.types != undefined) {
        let colors = [];

        console.log("Couleurs");

        console.log(colors);

        this.onePokemon.types.forEach((t) => {
          switch (t) {
            case "bug":
              colors.push("#91c12b");
              break;
            case "poison":
              colors.push("#ab6bc9");
              break;
            case "flying":
              colors.push("#8faadd");
              break;
            case "grass":
              colors.push("#63bc5a");
              break;
            case "fighting":
              colors.push("#cf3f6b");
              break;
            case "ghost":
              colors.push("#5169ae");
              break;
            case "fairy":
              colors.push("#ed90e7");
              break;
            case "ice":
              colors.push("#74cec0");
              break;
            case "normal":
              colors.push("#929ba3");
              break;
            case "fire":
              colors.push("#ff9e54");
              break;
            case "dragon":
              colors.push("#036dc4");
              break;
            case "electric":
              colors.push("#f4d339");
              break;
            case "steel":
              colors.push("#5a8fa3");
              break;
            case "psychic":
              colors.push("#fa727a");
              break;
            case "ground":
              colors.push("#d87843");
              break;
            case "dark":
              colors.push("#5a5365");
              break;
            case "water":
              colors.push("#4f91d7");
              break;
            case "rock":
              colors.push("#c5b78c");
              break;
          }
        });

        return {
          color1: "background-color: " + colors[0],
          color2: "background-color:" + colors[1],
        };
      }

      return "";
    },
  },

  mounted() {
    let route = this.$route;
    this.pokemonId = route.params.id;

    this.service.getPokemon(this.pokemonId).then((result) => {
      this.onePokemon = result;
    });
  },
};
</script>
