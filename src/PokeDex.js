import React from "react";
import PokemonSelect from "./PokemonSelect";
import PokemonCard from "./PokemonCard";
import "./PokeDex.css";
import { useAxios } from "./hooks";

/* Renders a list of pokemon cards.
 * Can also add a new card at random,
 * or from a dropdown of available pokemon. */
function PokeDex() {
  const [pokemon, addPokemon] = useAxios('https://pokeapi.co/api/v2/pokemon/');
  return (
    <div className="PokeDex">
      <div className="PokeDex-buttons">
        <h3>Please select your pokemon:</h3>
        <PokemonSelect add={addPokemon} />
      </div>
      <div className="PokeDex-card-area">
        {pokemon.map(cardData => (
          // Add a guard clause to ensure all data exists
          cardData.sprites && cardData.stats ? (
            <PokemonCard
              key={cardData.id}
              front={cardData.sprites.front_default}
              back={cardData.sprites.back_default}
              name={cardData.name}
              stats={cardData.stats.map(stat => ({
                value: stat.base_stat,
                name: stat.stat.name,
              }))}
            />
          ) : (
            <p key={cardData.id || Math.random()}>Loading...</p> // Handle cases where data is incomplete
          )
        ))}
      </div>
    </div>
  );
}

export default PokeDex;
