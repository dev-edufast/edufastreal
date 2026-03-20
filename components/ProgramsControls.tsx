import React from "react";

interface ProgramsControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeCategory: string;
  setActiveCategory: (category: any) => void;
  categories: string[];
  className?: string;
}

export function ProgramsControls({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
  categories,
  className = ""
}: ProgramsControlsProps) {
  return (
    <section className={`programs-controls ${className}`}>
      <div className="container">
        <input
          type="text"
          placeholder="Search programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={activeCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProgramsControls;
