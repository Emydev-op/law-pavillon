import React from "react";

export default function useRemovePointerEvent(isOpen: boolean | undefined) {
  const handleRemovePointerEvent = () => {
    const removePointerEventsNone = () => {
      if (typeof window !== 'undefined') {
        document.body.style.removeProperty("pointer-events");
    }
    };

    removePointerEventsNone();

    if (!isOpen) {
      setTimeout(removePointerEventsNone, 0);
    }
  };

  React.useEffect(() => {
    handleRemovePointerEvent();
  }, [isOpen]);

  return { handleRemovePointerEvent };
}
