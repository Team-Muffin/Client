import React, { useEffect, useRef, useState } from "react";
import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/dist/style.css";

// Function to generate unique IDs
const generateUniqueId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export function Dialog({
  birthdate,
  setBirthdate,
}: {
  birthdate: string;
  setBirthdate: React.Dispatch<React.SetStateAction<string>>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useRef(generateUniqueId()); // Unique ID for dialog element
  const headerId = useRef(generateUniqueId()); // Unique ID for header element

  const [month, setMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setBirthdate("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setBirthdate(format(date, "yyyy-MM-dd"));
    }
    dialogRef.current?.close();
  };

  return (
    <div>
      <input
        type="text"
        id="birthdate"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Birthdate"
        value={birthdate}
        readOnly // Make the input read-only to prevent direct editing
        onClick={toggleDialog}
      />

      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId.current} // Use generated unique ID
        aria-modal="true"
        aria-labelledby={headerId.current} // Use generated unique ID
        onClose={() => setIsDialogOpen(false)}
      >
        <DayPicker
          month={month}
          onMonthChange={setMonth}
          initialFocus
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          captionLayout="dropdown-buttons"
          fromYear={1950}
          toYear={2024}
          locale={ko}
          style={{
            width: "70vw",
          }}
        />
      </dialog>
    </div>
  );
}
