import type { Route } from "./+types/list";
//mport { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "포켓몬스터" },
    { name: "description", content: "포켓몬 도감" },
  ];
}

export default function Home() {
  return <h2>포켓몬 목록</h2>;
}
