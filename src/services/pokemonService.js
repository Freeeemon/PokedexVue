
import axios from 'axios';
// import { resolve } from 'core-js/library/es6/promise';
 import { Pokemon } from '../models/pokemon';
//import { reject, resolve } from 'core-js/fn/promise';



export class PokemonService {

    getPokemon(id) {
        return new Promise((resolve, reject) => {
            axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
                .then(response => {
                    console.log(response.data.sprites.versions["generation-v"]["black-white"].animated.front_shiny);
                    // je récupère mes éléments concernant l'API d'un seul pokemon
                    let pokemonData = response.data
                    let pokemonType = response.data.types;

                    // je créer un tableau vide pour stocker mes éléments récupérés
                    let typeTable = [];

                    // Je récupère uniquement les types, et je le push dans mon tableau ci-dessus
                    for (let t = 0; t < pokemonType.length; t++) {
                        typeTable.push(response.data.types[t].type.name);
                    }
                    //pokemonData n'est pas un tableau mais un objet(json)


                    // je créer un objet pokemon
                    let pokemon = new Pokemon()

                    // Je lui passe toutes les propriétés suivantes : 
                    pokemon.id = pokemonData.base_experience
                    pokemon.image = pokemonData.sprites.other.dream_world.front_default;
                    pokemon.imagefrontshiny = pokemonData.sprites.front_shiny;
                    pokemon.imagebackshiny = pokemonData.sprites.back_shiny;
                    pokemon.name = pokemonData.name;
                    pokemon.weight = pokemonData.weight;
                    pokemon.types = typeTable;
                    pokemon.height = pokemonData.height;
                    pokemon.sound = "https://www.pokebip.com/audio/cris-sl/" + id + ".mp3"


                    resolve(pokemon)
                })

                .catch(reason => {
                    reject("Erreur lors de la récupération des pokémons" + reason)
                })

        })
    }



    //Cette méthode retourne un tableau de pokemon
    getPokemons() {

        return new Promise((resolve, reject) => {

            let pokemons = []

            axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
                .then(response => {

                    console.log(response.data.results)
                    let result = response.data.results;
                    result.forEach(p => {


                        let substrings = p.url.split("/");
                        let id = substrings[substrings.length - 2];

                        p.id = id

                        p.image= 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/shiny/'+ id +'.gif'

                        pokemons.push(p)
                    })
                    resolve(pokemons)
                })
                .catch(reason => {
                    reject("Erreur lors de la récupération des pokémons" + reason)
                })

        })





    }



}