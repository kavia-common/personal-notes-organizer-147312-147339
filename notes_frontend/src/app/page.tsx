"use client";
import React, { useState, useMemo } from "react";
import { useNotes } from "./hooks/useNotes";
import { useCategories } from "./hooks/useCategories";
import { useUser } from "./hooks/useUser";
import Sidebar from "./components/Sidebar";
import TopNav from "./components/TopNav";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";

const colorVars = `
:root {
  --primary: #1e88e5;
  --secondary: #90caf9;
  --accent: #fbc02d;
}
`;

export default function Home() {
  // App state hooks
  const user = useUser();
  const {
    notes,
    addNote,
    updateNote,
    deleteNote,
  } = useNotes();
  const {
    categories,
    addCategory,
  } = useCategories();

  // UI state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isNew, setIsNew] = useState(false);

  // computed filtered notes
  const filteredNotes = useMemo(() => {
    let filtered = notes;
    if (selectedCategoryId && selectedCategoryId !== "all") {
      filtered = filtered.filter(n => n.category === selectedCategoryId);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [notes, selectedCategoryId, searchQuery]);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedNoteId) || null,
    [notes, selectedNoteId]
  );

  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
    setShowEditor(false);
    setIsNew(false);
  };

  const handleCreate = () => {
    setSelectedNoteId(null);
    setShowEditor(true);
    setIsNew(true);
  };

  const handleSave = (fields: { title: string; content: string; category: string }) => {
    if (isNew) {
      const newNote = addNote(fields.title, fields.content, fields.category);
      setSelectedNoteId(newNote.id);
    } else if (selectedNote) {
      updateNote(selectedNote.id, fields);
    }
    setShowEditor(false);
    setIsNew(false);
  };

  // New category event
  const handleAddCategory = (name: string) => {
    const newCat = addCategory(name);
    setSelectedCategoryId(newCat.id);
  };

  // Minimalistic demo authentication
  // Optionally replace with real auth
  // Show a login UI if user is null (never for now)
  // ...

  // Responsive design handled by flex/grid
  return (
    <div className="flex flex-col min-h-screen bg-gray-50" style={{ minWidth: 0 }}>
      <style>{colorVars}</style>
      <TopNav user={user} onSearch={setSearchQuery} searchValue={searchQuery} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelect={(catId) => {
            setSelectedCategoryId(catId);
            setSelectedNoteId(null);
            setShowEditor(false);
          }}
          onAdd={handleAddCategory}
        />

        {/* Main content area */}
        <main className="flex-1 flex flex-col h-full py-7 px-8 bg-white overflow-auto">
          <div className="flex gap-4 mb-6">
            <button
              className="bg-primary text-white px-5 py-2 rounded hover:bg-accent font-semibold transition-all"
              onClick={handleCreate}
            >
              + New Note
            </button>
          </div>
          <div className="flex flex-col-reverse lg:flex-row gap-8 h-[70vh]">
            <section className="w-full lg:w-1/3 min-w-64 max-w-sm">
              <NoteList
                notes={filteredNotes}
                selectedId={selectedNoteId}
                onSelect={handleSelectNote}
                onDelete={deleteNote}
              />
            </section>
            <section className="flex-1 max-w-3xl">
              {showEditor || (isNew && !selectedNote) ? (
                <NoteEditor
                  note={null}
                  categories={categories}
                  onSave={handleSave}
                  onCancel={() => {
                    setShowEditor(false);
                    setIsNew(false);
                  }}
                  isNew={true}
                />
              ) : selectedNote ? (
                <NoteEditor
                  note={selectedNote}
                  categories={categories}
                  onSave={handleSave}
                  onCancel={() => setSelectedNoteId(null)}
                  isNew={false}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-xl">
                  Select or create a note to begin.
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
