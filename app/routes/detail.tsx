// import { useEffect, useState } from "react"
import axios from "axios"
import { Link, useLoaderData } from "react-router"
import type { Route } from "./+types/detail";

type Pokemon = {
  id: number
  name: string
  types: { name: string }[]
  image: string
}

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url)
  // 맨 마지막 id만 가져옴
  const pokemonId = url.pathname.split("/").filter(Boolean).pop()
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  const { id, name, sprites } = response.data

  const species = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

  const koreanName = species.data.names.find(
    (item: { language: { name: string } }) => 
      item.language.name === "ko"
  )?.name

  return {
    id,
    name: koreanName || name,
    types: response.data.types,
    image: sprites.other["official-artwork"].front_default,
  }
}

export default function Detail({ params }: Route.ComponentProps) {
  const pokemon = useLoaderData<typeof clientLoader>()

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Link 
        to="/" 
        className="mb-3 block mx-auto w-max px-6 py-2 bg-slate-400 hover:bg-slate-700 text-white text-sm rounded-lg">
        목록으로 돌아가기
      </Link>
      <div className="bg-white rounded-xl shadow p-8 max-w-md mx-auto
                      text-center flex flex-col items-center gap-4">
        <img src={pokemon.image} alt={pokemon.name} className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-slate-800">{pokemon.name}</h1>
        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          No. {pokemon.id}
        </span>
      </div>
    </div>
  )
}