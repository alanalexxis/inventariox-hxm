import banner from "assets/img/profile/banner.svg";
import Card from "components/card";
import React, { useEffect, useState } from "react";
const Banner = () => {
  const [pokemon, setPokemon] = useState(null); // Estado para almacenar los datos del Pokemon aleatorio

  useEffect(() => {
    const fetchRandomPokemon = async () => {
      try {
        // Hace una solicitud a la API de Pokemon para obtener un Pokemon aleatorio
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=1000"
        );
        const data = await response.json();
        const pokemonList = data.results;
        const randomIndex = Math.floor(Math.random() * pokemonList.length);
        const randomPokemon = pokemonList[randomIndex];
        const spanishTypeNames = {
          normal: "normal",
          fighting: "lucha",
          flying: "volador",
          poison: "veneno",
          ground: "tierra",
          rock: "roca",
          bug: "bicho",
          ghost: "fantasma",
          steel: "acero",
          fire: "fuego",
          water: "agua",
          grass: "planta",
          electric: "eléctrico",
          psychic: "psíquico",
          ice: "hielo",
          dragon: "dragón",
          dark: "siniestro",
          fairy: "hada",
        };
        // Hace una solicitud a la API de Pokemon para obtener los datos del Pokemon aleatorio
        const pokemonResponse = await fetch(randomPokemon.url);
        const pokemonData = await pokemonResponse.json();
        const pokemonDetails = {
          name: pokemonData.name,
          image: pokemonData.sprites.front_default,
          hp: pokemonData.stats.find((stat) => stat.stat.name === "hp")
            .base_stat,
          attack: pokemonData.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: pokemonData.stats.find(
            (stat) => stat.stat.name === "defense"
          ).base_stat,
          types: pokemonData.types.map(
            (type) => spanishTypeNames[type.type.name]
          ),
          experience: pokemonData.base_experience, // Obtener la experiencia
          // Otros datos del Pokemon que desees incluir
        };

        setPokemon(pokemonDetails); // Actualiza el estado con los datos del Pokemon aleatorio
      } catch (error) {
        console.error(error);
      }
    };

    fetchRandomPokemon(); // Llama a la función de solicitud de la API al montar o actualizar el componente
  }, []);
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[127px] w-[127px] items-center justify-center rounded-full border-[4px] border-white bg-white dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={pokemon && pokemon.image}
            alt=""
          />
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {pokemon &&
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}{" "}
          <span className="text-xl font-normal text-gray-700 dark:text-white">
            {pokemon && pokemon.hp} HP
          </span>
        </h4>
        <p className="text-base font-normal text-gray-600">
          Tipo: {pokemon && pokemon.types.join(", ")}
        </p>
      </div>

      <div className="mt-6 mb-3 flex gap-4 md:!gap-14">
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {" "}
            {pokemon && pokemon.attack}K
          </p>
          <p className="text-sm font-normal text-gray-600">Ataque</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {pokemon && pokemon.defense}K
          </p>
          <p className="text-sm font-normal text-gray-600">Defensa</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-navy-700 dark:text-white">
            {pokemon && pokemon.experience}XP
          </p>
          <p className="text-sm font-normal text-gray-600">Experiencia</p>
        </div>
      </div>
    </Card>
  );
};

export default Banner;
