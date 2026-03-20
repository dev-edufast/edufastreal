import React from "react";
import { Filter, SlidersHorizontal, Search } from "lucide-react";
import { Button } from "./Button";

export type StoryCategory = "all" | "career" | "entrepreneurship" | "higher-studies" | "social-impact";
export type SortOption = "newest" | "oldest" | "featured";

interface StoryFiltersProps {
  selectedCategory?: StoryCategory;
  onCategoryChange?: (category: StoryCategory) => void;
  sortBy?: SortOption;
  onSortChange?: (sort: SortOption) => void;
  totalStories?: number;
  // Props used by success-stories.tsx
  searchTerm?: string;
  categoryFilter?: string;
  storyCategories?: string[];
  onSearchChange?: (value: string) => void;
}

const categories: { value: StoryCategory; label: string }[] = [
  { value: "all", label: "All Stories" },
  { value: "career", label: "Career Growth" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "higher-studies", label: "Higher Studies" },
  { value: "social-impact", label: "Social Impact" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "featured", label: "Featured" },
];

export function StoryFilters({
  selectedCategory = "all",
  onCategoryChange,
  sortBy = "newest",
  onSortChange,
  totalStories = 0,
  searchTerm = "",
  categoryFilter,
  storyCategories = [],
  onSearchChange,
}: StoryFiltersProps) {
  // Use storyCategories if provided (from success-stories.tsx), otherwise use default categories
  const displayCategories = storyCategories.length > 0 
    ? storyCategories.map(cat => ({ value: cat.toLowerCase().replace(/\s+/g, '-') as StoryCategory, label: cat }))
    : categories;

  return (
    <div className="story-filters">
      <div className="filters-header">
        <div className="results-count">
          <Filter size={16} />
          <span>{totalStories} stories</span>
        </div>
        
        {onSearchChange && (
          <div className="search-control">
            <Search size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stories..."
              className="search-input"
            />
          </div>
        )}
        
        {onSortChange && (
          <div className="sort-control">
            <SlidersHorizontal size={16} />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="sort-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="category-filters">
        {displayCategories.map((category) => {
          const isActive = categoryFilter 
            ? category.label === categoryFilter
            : selectedCategory === category.value;
          
          return (
            <Button
              key={category.value}
              variant={isActive ? "primary" : "outline"}
              size="sm"
              onClick={() => {
                if (onCategoryChange) {
                  onCategoryChange(category.value);
                }
              }}
              className="category-button"
            >
              {category.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default StoryFilters;
