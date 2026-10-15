import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router"
import type { Route } from "./+types/detail";

type Pokemon = {
  id: number
  name: string
  types: { name: string }[]
  image: string
}

export default function Detail({ params }: Route.ComponentProps) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
        const { id, name, sprites } = response.data

        setPokemon({
          id,
          name,
          types: response.data.types,
          image: sprites.other["official-artwork"].front_default,
        })
      } catch (error) {
        console.error("포켓몬 데이터 에러: ", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPokemon()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center text-xl font-semibold text-slate-900 animate-pulse">
        로딩 중...
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 flex items-center justify-center text-xl font-semibold text-slate-900">
        포켓몬을 찾을 수 없습니다.
      </div>
    )
  }

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