"use client";
import React, { useState } from "react";
import { Category } from "../types";
import { Plus } from "lucide-react";

interface SidebarProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (catId: string) => void;
  onAdd: (name: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategoryId,
  onSelect,
  onAdd,
}) => {
  const [adding, setAdding] = useState(false);
  const [newCat, setNewCat] = useState("");

  const handleAdd = () => {
    if (!newCat.trim()) return;
    onAdd(newCat.trim());
    setNewCat("");
    setAdding(false);
  };

  return (
    <aside className="flex flex-col w-56 min-w-40 max-w-xs h-full bg-white border-r border-gray-100 shadow-sm py-6 px-4 gap-4">
      <h2 className="text-primary font-semibold text-lg mb-2">Categories</h2>
      <ul className="flex flex-col gap-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className={`px-3 py-1 rounded cursor-pointer hover:bg-primary/10 ${
              selectedCategoryId === cat.id
                ? "bg-primary/10 text-primary font-bold"
                : "text-gray-700"
            }`}
            onClick={() => onSelect(cat.id)}
          >
            {cat.name}
          </li>
        ))}
      </ul>
      {adding ? (
        <div className="flex mt-3">
          <input
            className="w-full border px-2 py-1 rounded text-sm focus:outline-primary"
            type="text"
            value={newCat}
            placeholder="New category"
            onChange={(e) => setNewCat(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            autoFocus
          />
          <button
            className="ml-2 px-2 py-1 rounded bg-accent text-white hover:bg-primary transition-all"
            onClick={handleAdd}
          >
            <Plus size={18} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="mt-3 px-2 py-1 rounded text-sm bg-accent text-white hover:bg-primary transition-all flex items-center gap-1"
        >
          <Plus size={18} /> Add Category
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
