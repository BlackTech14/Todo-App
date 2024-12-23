import React from "react";

import "./TodoModal.css";

interface TodoModalProps {
  isOpen: boolean;
  title: string;
  todoText: string;
  onTextChange: (text: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * TodoModal Component
 *
 * A reusable modal component for adding or editing todo items.
 */
export const TodoModal: React.FC<TodoModalProps> = ({
  isOpen,
  title,
  todoText,
  onTextChange,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{title}</h2>
        <input
          type="text"
          placeholder="Input your note..."
          value={todoText}
          onChange={(e) => onTextChange(e.target.value)}
          className="modal-input"
        />
        <div className="modal-buttons">
          <button className="cancel-button" onClick={onClose}>
            CANCEL
          </button>
          <button className="apply-button" onClick={onSubmit}>
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};
