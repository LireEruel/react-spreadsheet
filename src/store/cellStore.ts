// store.ts
import { create } from "zustand";

interface CellState {
  selectedCell: string;
  isEditing: boolean;
  setSelectedCell: (cell: string) => void;
  setIsEditing: (editing: boolean) => void;
}

const useCellStore = create<CellState>((set) => ({
  selectedCell: "A1",
  isEditing: false,
  setSelectedCell: (cell) => set({ selectedCell: cell, isEditing: false }),
  setIsEditing: (editing) => set({ isEditing: editing }),
}));

export default useCellStore;
