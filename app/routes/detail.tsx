import type { Route } from "./+types/detail";

const pokemon = { id: 25, name: "피카츄", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" }

export default function Detail() {
  const p = pokemon

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="bg-white rounded-xl shadow p-8 max-w-md mx-auto
                      text-center flex flex-col items-center gap-4">
        <img src={p.image} alt={p.name} className="w-32 h-32" />
        <h1 className="text-3xl font-bold text-slate-800">{p.name}</h1>
        <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
          No. {p.id}
        </span>
      </div>
    </div>
  );
}