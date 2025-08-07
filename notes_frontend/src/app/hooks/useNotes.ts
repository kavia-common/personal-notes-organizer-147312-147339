import { useState, useEffect } from "react";
import { Note } from "../types";
import { v4 as uuidv4 } from "uuid";

// Get notes from localStorage or return empty[]
const loadNotes = (): Note[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem("notes");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Note[];
  } catch {
    return [];
  }
};

// Save notes to localStorage
const saveNotes = (notes: Note[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("notes", JSON.stringify(notes));
  }
};

// PUBLIC_INTERFACE
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // PUBLIC_INTERFACE
  const addNote = (title: string, content: string, category: string) => {
    const newNote: Note = {
      id: uuidv4(),
      title,
      content,
      category,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  };

  // PUBLIC_INTERFACE
  const updateNote = (
    id: string,
    fields: Partial<Omit<Note, "id" | "createdAt">>
  ) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...fields, updatedAt: new Date().toISOString() }
          : note
      )
    );
  };

  // PUBLIC_INTERFACE
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // PUBLIC_INTERFACE
  const getNotesByCategory = (category: string | null) => {
    if (!category) return notes;
    return notes.filter((note) => note.category === category);
  };

  // PUBLIC_INTERFACE
  const searchNotes = (query: string) => {
    const lower = query.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(lower) ||
        n.content.toLowerCase().includes(lower)
    );
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNotesByCategory,
    searchNotes,
    setNotes,
  };
}
