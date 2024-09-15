import { useState } from "react";

export interface SortState {
  column: string | null;
  direction: "asc" | "desc" | null;
}

export const useTableSort = () => {
  const [sortState, setSortState] = useState<SortState>({
    column: null,
    direction: null,
  });

  const toggleSort = (column: string) => {
    setSortState((prevState) => {
      if (prevState.column === column) {
        const newDirection = prevState.direction === "asc" ? "desc" : "asc";
        return { column, direction: newDirection };
      }
      return { column, direction: "asc" };
    });
  };

  return { sortState, toggleSort };
};
