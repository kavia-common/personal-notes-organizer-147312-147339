"use client";
import React from "react";
import { Note } from "../types";
import { Trash2 } from "lucide-react";

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedId,
  onSelect,
  onDelete,
}) => {
  if (!notes.length)
    return (
      <div className="text-gray-400 py-14 w-full text-center text-sm">
        No notes.
      </div>
    );
  return (
    <ul className="flex flex-col gap-2 w-full">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer border border-transparent transition-colors ${
            selectedId === note.id
              ? "bg-secondary/30 border-primary"
              : "hover:bg-gray-50"
          }`}
          onClick={() => onSelect(note.id)}
        >
          <div className="flex-1 min-w-0 truncate">
            <div className="font-semibold text-gray-900 truncate">{note.title}</div>
            <div className="text-xs text-gray-500 truncate">
              {note.content?.substring(0, 50) || ""}
            </div>
          </div>
          <button
            className="ml-2 p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(note.id);
            }}
            title="Delete"
            aria-label="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
