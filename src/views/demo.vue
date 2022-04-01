<template>
  <div>
    <h1>POKEDEX</h1>
    <div class="caught-seen">
      <h3>CAUGHT : 151</h3>
      <h3>SEEN : 151</h3>
    </div>

    <div class="display-pokemon">
      <div
        class="display-pokemon"
        v-for="(obj, index) in pokemons"
        v-bind:key="index"
      >
        <h1>
          <router-link v-bind:to="'/pokemons/' + obj.id">
            <div class="display"><img :src="obj.image" alt="" /></div>
          </router-link>
        </h1>

        <h2 v-for="(t, i) in obj.types" v-bind:key="i">
          <!--on accede aux type des pokemons -->
          {{ t }}
        </h2>
      </div>

      <!-- index est pour le tableau, on a besoin d'une boucle -->
    </div>
  </div>
</template>

<style scoped>
ul {
  text-decoration: none;
  list-style: none;
}

.display img {
  width: 90px;
}

.display-pokemon {
  display: flex;
  flex-wrap: wrap;
  margin: 25px;
  margin-top: 4%;
}

.caught-seen {
  display: -webkit-inline-box;
  gap: 1rem;
}

.bar1 {
  height: 10px;
  width: 10px;
  background-color: #000000;
}
</style>


<script>
import { PokemonService } from "../services/pokemonService.js";

export default {
  name: "demo",

  // Tout ce qui est dans data() est réactif, que des variables
  data() {
    return {
      maVariable: "Bonjour !",
      compteur: 0,
      firstName: "",
      pokemons: [],
      service: new PokemonService(),
    };
  },

  // Que des fonctions dans methods
  methods: {
    direBonjour() {
      alert("Bonjour " + this.firstName);
    },
  },

  // Cette fonction sera appelée lorsuqe le composant est prêt à l'emploi
  mounted() {
    setInterval(() => {
      this.compteur++;
    }, 1000);

    this.service.getPokemons().then((pokemons) => {
      this.pokemons = pokemons;
    });
  },
};
</script>