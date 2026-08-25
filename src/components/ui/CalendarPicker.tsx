"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

interface CalendarPickerProps {
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
}

export function CalendarPicker({ value, onChange, disabled }: CalendarPickerProps) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = useMemo(() => getDaysInMonth(viewYear, viewMonth), [viewYear, viewMonth]);
  const firstDay = useMemo(() => getFirstDayOfMonth(viewYear, viewMonth), [viewYear, viewMonth]);

  const monthName = new Date(viewYear, viewMonth).toLocaleString("en-US", { month: "long" });

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = formatDate(viewYear, viewMonth, day);
    const dateObj = new Date(viewYear, viewMonth, day);
    const isPast = dateObj < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isSun = dateObj.getDay() === 0;
    const isDisabled = isPast || isSun;
    const isSelected = value === dateStr;

    cells.push(
      <button
        key={day}
        type="button"
        disabled={isDisabled || disabled}
        onClick={() => onChange(dateStr)}
        className={cn(
          "relative h-10 w-10 rounded-lg text-sm font-medium transition-colors",
          isSelected && "bg-brand-blue text-white",
          !isSelected && !isDisabled && "text-navy hover:bg-brand-blue/10",
          isDisabled && "text-text-grey/30 cursor-not-allowed",
        )}
      >
        {day}
      </button>,
    );
  }

  return (
    <div className="select-none">
      <div className="mb-2 flex items-center justify-between">
        <button type="button" onClick={prevMonth} className="grid h-11 w-11 place-items-center rounded-md text-navy hover:bg-grey-line" aria-label="Previous month">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-sm font-semibold text-navy">{monthName} {viewYear}</span>
        <button type="button" onClick={nextMonth} className="grid h-11 w-11 place-items-center rounded-md text-navy hover:bg-grey-line" aria-label="Next month">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-6 gap-1 text-center text-xs font-medium text-text-grey">
        {WEEKDAYS.map((d) => (
          <div key={d} className="pb-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-1">{cells}</div>
    </div>
  );
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

function formatTimeLabel(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

interface TimeSlotPickerProps {
  value: string;
  onChange: (time: string) => void;
  disabled?: boolean;
}

export function TimeSlotPicker({ value, onChange, disabled }: TimeSlotPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {TIME_SLOTS.map((slot) => (
        <button
          key={slot}
          type="button"
          disabled={disabled}
          onClick={() => onChange(slot)}
          className={cn(
            "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
            value === slot
              ? "border-brand-blue bg-brand-blue text-white"
              : "border-grey-line bg-white text-navy hover:border-brand-blue/50 hover:bg-brand-blue/5",
          )}
        >
          {formatTimeLabel(slot)}
        </button>
      ))}
    </div>
  );
}
