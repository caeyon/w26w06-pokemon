import type { Route } from "./+types/detail";

const pokemon = { id: 25, name: "피카츄", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png" }

export default function Detail() {
  const p =pokemon

  return (
    <div>
      <div>
        <img src={p.image} alt={p.name} />
        <h1>{p.name}</h1>
        <span>
          No. {p.id}
        </span>
      </div>
    </div>
  );
}
