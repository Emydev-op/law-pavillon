import React from "react";

export default function useRemovePointerEvent(isOpen: boolean | undefined) {
  const removePointerEventsNone = React.useCallback(() => {
    if (typeof window !== "undefined") {
      document.body.style.removeProperty("pointer-events");
    }
  }, []);

  const handleRemovePointerEvent = React.useCallback(() => {
    removePointerEventsNone();
  }, [removePointerEventsNone]);

  React.useEffect(() => {
    handleRemovePointerEvent();
  }, [isOpen, handleRemovePointerEvent]);

  return { handleRemovePointerEvent };
}
