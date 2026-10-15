// import { useEffect, useState } from "react"
import axios from "axios"
import type { Route } from "./+types/list";
import { Link, useLoaderData } from "react-router"

type Pokemon = {
  id: number
  name: string
  image: string
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100")
  const results = response.data.results

  const pokemonData: Pokemon[] = await Promise.all(
    results.map(async ({ url }: { url: string }) => {
      const pokemonResponse = await axios.get(url)
      const { id, name, sprites } = pokemonResponse.data
      
      const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      
      const koreanName = species.data.names.find(
        (item: { language: { name: string } }) => 
          item.language.name === "ko"
      )?.name

      return {
        id,
        name: koreanName || name,
        image: sprites.other["official-artwork"].front_default,
      }
    })
  )

  return pokemonData
}

export default function List() {
  const pokemons = useLoaderData<typeof clientLoader>()

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">포켓몬 목록</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {pokemons.map((pokemon) => (
          <Link 
            to={`detail/${pokemon.id}`}
          className="bg-white rounded-xl shadow hover:shadow-md transition
                      p-4 flex flex-col items-center gap-2
                      border border-slate-200 hover:border-yellow-400"
            key={pokemon.id}>
            <img className="w-24 h-24" src={pokemon.image} alt={pokemon.name} />
            <p className="font-semibold text-slate-700">{pokemon.name}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
