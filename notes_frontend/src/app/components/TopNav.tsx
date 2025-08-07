"use client";
import React from "react";
import { User } from "../types";

interface TopNavProps {
  user: User | null;
  onSearch: (q: string) => void;
  searchValue: string;
}

const TopNav: React.FC<TopNavProps> = ({ user, onSearch, searchValue }) => {
  return (
    <nav className="w-full h-16 border-b border-gray-100 flex items-center justify-between bg-white/90 px-6 sticky top-0 z-10">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <span>🗒️</span>
        <span>Notes</span>
      </div>
      <input
        type="search"
        value={searchValue}
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded px-3 py-1 w-72 max-w-xs bg-gray-50 text-gray-700 outline-none focus:border-primary"
        placeholder="Search notes..."
        aria-label="Search notes"
      />
      <div className="flex items-center gap-3">
        {user && (
          <span className="text-sm text-gray-500">Signed in as {user.name}</span>
        )}
        {/* Optional log out */}
      </div>
    </nav>
  );
};

export default TopNav;
