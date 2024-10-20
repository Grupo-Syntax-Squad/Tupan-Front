"use client";
import { useTableSort } from "@/hooks/filtragem";
import { TableProps } from "@/types/interfaces";
import Link from "next/link";
import { ReactNode } from "react";
import { useDynamicContext } from "@/app/context";


export const Tabela = ({ colunas, dados }: TableProps) => {
  const { sortState, toggleSort } = useTableSort();
  const {state, setValue} = useDynamicContext();

  const sortedData = [...dados].sort((a, b) => {
    if (sortState.column) {
      const columnA = a[sortState.column as keyof typeof a];
      const columnB = b[sortState.column as keyof typeof b];

      if (typeof columnA === "string" && typeof columnB === "string") {
        return sortState.direction === "asc"
          ? columnA.localeCompare(columnB)
          : columnB.localeCompare(columnA);
      }

      if (typeof columnA === "number" && typeof columnB === "number") {
        return sortState.direction === "asc"
          ? columnA - columnB
          : columnB - columnA;
      }
    }
    return 0;
  });

  return (
    <>
      <link
        href="https://cdn.jsdelivr.net/npm/flowbite@2.5.1/dist/flowbite.min.css"
        rel="stylesheet"
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {colunas.map((coluna, index) => (
                <th
                  key={index}
                  scope="col"
                  className="px-6 py-3 cursor-pointer"
                  onClick={() => toggleSort(coluna.acessor)}
                >
                  {coluna.label}
                  {sortState.column === coluna.acessor && (
                    <span>{sortState.direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </th>
              ))}
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, rowIndex) => {
              return (
                <tr
                  key={rowIndex}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {colunas.map((coluna, colIndex) => (
                    <td key={colIndex} className="px-6 py-4">
                      {row[coluna.acessor] as ReactNode}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right">
                    <Link
                      title="Editar"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={{ pathname: `estacoes/${rowIndex + 1}`, query: { id: rowIndex + 1, nome: `${row.nome}`, status: `${row.status}`} }}
                      onClick={() => {
                        setValue("nome", `${row.nome}`);
                        setValue("status", `${row.status}`);
                      }}
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
