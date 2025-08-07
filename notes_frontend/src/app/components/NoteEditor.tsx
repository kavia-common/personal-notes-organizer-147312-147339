"use client";
import React, { useState, useEffect } from "react";
import { Note, Category } from "../types";

interface NoteEditorProps {
  note: Note | null;
  categories: Category[];
  onSave: (fields: { title: string; content: string; category: string }) => void;
  onCancel: () => void;
  isNew: boolean;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  categories,
  onSave,
  onCancel,
  isNew,
}) => {
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [category, setCategory] = useState(note?.category || "uncategorized");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setCategory(note?.category || "uncategorized");
  }, [note]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title: title.trim(), content, category });
  };

  return (
    <form
      onSubmit={handleSave}
      className="flex flex-col h-full gap-4 p-6 bg-white rounded-lg border border-gray-100"
    >
      <input
        className="text-lg font-semibold border-b outline-none pb-2 pl-1"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
        maxLength={100}
      />
      <select
        className="mb-2 p-1 rounded border bg-gray-50 font-semibold max-w-xs"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <textarea
        className="flex-1 resize-none rounded border px-2 py-2 font-mono bg-gray-50"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        maxLength={2000}
        rows={12}
      />
      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="bg-primary text-white px-5 py-2 rounded hover:bg-accent font-semibold transition-all"
        >
          {isNew ? "Create" : "Save"}
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded border border-gray-300 hover:bg-gray-100 text-gray-700"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;
