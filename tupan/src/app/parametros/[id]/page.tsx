"use client"; 

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ParametrosID() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Captura o 'id' da URL
  const nome= searchParams.get("nome"); // Captura o 'nome' da URL

  useEffect(() => {
    if (id) {
      console.log("ID da URL:", id);
    }
  }, [id]);

  return (
    <div>
      {id && nome ? <p>Parâmetro = {id} Nome = {nome}</p>: <p>Carregando o ID...</p>}
    </div>
  );
}
