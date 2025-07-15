"use client";
import React from "react";

/**
 * A custom hook to manage modal open/close toggle state.
 *
 * @param initialValue - The initial open/close state of the modal (default: false).
 * @returns An object with `isOpen` boolean state and toggle methods.
 *
 * @example
 * const { isOpen, toggleClick, toggleClose, toggleOpen } = useToggleModal(false);
 */
export default function useToggleModal(initialValue: boolean = false) {
  const [isOpen, setIsOpen] = React.useState<boolean>(initialValue);

  const toggleClick = () => setIsOpen((prev) => !prev);
  const toggleClose = () => setIsOpen(false);
  const toggleOpen = () => setIsOpen(true);

  return {
    isOpen,
    toggleClick,
    toggleClose,
    toggleOpen,
  };
}
