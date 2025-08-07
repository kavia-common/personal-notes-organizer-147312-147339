import { useState, useEffect } from "react";
import { Category } from "../types";
import { v4 as uuidv4 } from "uuid";

// Get categories from localStorage or return default
const defaultCategories: Category[] = [
  { id: "all", name: "All" },
  { id: "uncategorized", name: "Uncategorized" },
];

const loadCategories = (): Category[] => {
  if (typeof window === "undefined") return defaultCategories;
  const raw = localStorage.getItem("categories");
  if (!raw) return defaultCategories;
  try {
    const parsed = JSON.parse(raw) as Category[];
    // Always ensure at least All and Uncategorized are present
    return [
      ...defaultCategories.filter(
        (d) => !parsed.find((cat) => cat.id === d.id)
      ),
      ...parsed,
    ];
  } catch {
    return defaultCategories;
  }
};

const saveCategories = (categories: Category[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("categories", JSON.stringify(categories));
  }
};

// PUBLIC_INTERFACE
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  useEffect(() => {
    setCategories(loadCategories());
  }, []);

  useEffect(() => {
    saveCategories(categories);
  }, [categories]);

  // PUBLIC_INTERFACE
  const addCategory = (name: string) => {
    const newCat: Category = {
      id: uuidv4(),
      name,
    };
    setCategories((prev) => [...prev, newCat]);
    return newCat;
  };

  // PUBLIC_INTERFACE
  const deleteCategory = (id: string) => {
    if (id === "all" || id === "uncategorized") return;
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  return {
    categories,
    addCategory,
    deleteCategory,
    setCategories,
  };
}
