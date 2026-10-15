import { Link } from "react-router"
import type { Route } from "./+types/detail";

const pokemons = [
  { id: 1, name: "이상해씨", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" },
  { id: 4, name: "파이리", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png" },
  { id: 7, name: "꼬부기", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png" },
  { id: 25, name: "피카츄", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" },
  { id: 39, name: "니드런♀", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/29.png" },
  { id: 52, name: "니드런♂", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/32.png" },
  { id: 133, name: "이브이", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/133.png" },
  { id: 150, name: "뮤츠", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png" },
  { id: 151, name: "뮤", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/151.png" },
  { id: 152, name: "치코리타", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png" },
]

export default function Detail({ params }: Route.ComponentProps) {
  const pokemon = pokemons.find(p => p.id === Number(params.id))
  if (!pokemon) { 
    return <div className="min-h-screen bg-slate-700 p-6">포켓몬을 찾을 수 없습니다.</div>
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