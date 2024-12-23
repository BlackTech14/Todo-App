import React from "react";
import searchLightSvg from "../../assets/icons/search-light.svg";
import searchDarkSvg from "../../assets/icons/search-dark.svg";
import lightSvg from "../../assets/icons/light.svg";
import darkSvg from "../../assets/icons/dark.svg";
import "./TodoHeader.css";

interface TodoHeaderProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  isDarkMode: boolean;
  onThemeToggle: () => void;
  selectedFilter: string;
  onFilterChange: (value: string) => void;
}

/**
 * TodoHeader Component
 *
 * Displays the search bar, filter dropdown, and theme toggle button.
 */
export const TodoHeader: React.FC<TodoHeaderProps> = ({
  searchText,
  onSearchChange,
  isDarkMode,
  onThemeToggle,
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <div className="header">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search note..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <img
          src={isDarkMode ? searchDarkSvg : searchLightSvg}
          alt="search"
          className="search-icon"
        />
      </div>

      <div className="header-buttons">
        <select
          className="filter-dropdown"
          value={selectedFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="all">All</option>
          <option value="completed">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <button className="theme-button" onClick={onThemeToggle}>
          <img src={isDarkMode ? darkSvg : lightSvg} />
        </button>
      </div>
    </div>
  );
};
