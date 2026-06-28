import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMonthDays, DAY_NAMES, MONTH_LENGTHS, CreatorDay } from "@/lib/creatorCalendar";

const FEAST_COLORS: Record<string, string> = {
  feast: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  fast: "bg-red-500/20 text-red-300 border-red-500/40",
  new_month: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  memorial: "bg-purple-500/20 text-purple-300 border-purple-500/40",
  preparation: "bg-orange-500/20 text-orange-300 border-orange-500/40",
};

interface MonthViewProps {
  year: number;
  month: number;
  onNavigate: (dir: number) => void;
  onDaySelect: (day: CreatorDay) => void;
  selectedDay: CreatorDay | null;
}

export default function MonthView({ year, month, onNavigate, onDaySelect, selectedDay }: MonthViewProps) {
  const days = getMonthDays(year, month);

  // Find what day-of-week index the first day falls on (0=Day1..6=Shabbat)
  const firstDayWeekIndex = days[0]?.dayOfWeek ?? 0;

  const weekHeaders = DAY_NAMES.map((d) => d.short.replace("Day ", "D"));
  const fullHeaders = ["D1 Yawam Achad", "D2 Shanay", "D3 Shalayashaya", "D4 Rabayaiy", "D5 Hamayashaya", "D6 Shashaya", "Shabbat"];

  return (
    <div className="flex flex-col gap-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => onNavigate(-1)}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <div className="font-heading text-xl font-bold text-primary">
            Month {month}
          </div>
          <div className="text-sm text-muted-foreground">
            Restoration Year {year} · {MONTH_LENGTHS[month - 1]} Days
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onNavigate(1)}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1">
        {fullHeaders.map((h, i) => (
          <div
            key={i}
            className={`text-center text-xs font-semibold py-2 rounded-md ${
              i === 6
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground"
            }`}
          >
            <span className="hidden sm:block">{h}</span>
            <span className="sm:hidden">{weekHeaders[i]}</span>
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {/* Empty leading cells */}
        {Array.from({ length: firstDayWeekIndex }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day cells */}
        {days.map((day) => {
          const isSelected =
            selectedDay &&
            selectedDay.year === day.year &&
            selectedDay.month === day.month &&
            selectedDay.dayOfMonth === day.dayOfMonth;

          const isToday =
            day.gregorianDate.toDateString() === new Date().toDateString();

          return (
            <button
              key={day.dayOfMonth}
              onClick={() => onDaySelect(day)}
              className={`
                relative flex flex-col items-center justify-start p-1.5 rounded-lg border min-h-[64px] text-left transition-all
                ${isSelected ? "border-primary bg-primary/20 ring-1 ring-primary" : "border-border hover:border-primary/40 hover:bg-muted/60"}
                ${day.isShabbat ? "bg-primary/5" : "bg-card"}
                ${isToday ? "ring-2 ring-amber-400" : ""}
              `}
            >
              <span
                className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full
                  ${isToday ? "bg-amber-400 text-black" : day.isShabbat ? "text-primary" : "text-foreground"}
                `}
              >
                {day.dayOfMonth}
              </span>
              <span className="text-[9px] text-muted-foreground mt-0.5 leading-tight">
                {day.gregorianDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </span>
              {day.feast && (
                <span
                  className={`mt-1 text-[8px] px-1 py-0.5 rounded border leading-tight text-center w-full truncate ${
                    FEAST_COLORS[day.feast.type] || "bg-muted text-muted-foreground"
                  }`}
                >
                  {day.feast.name}
                </span>
              )}
              {day.isShabbat && !day.feast && (
                <span className="mt-1 text-[8px] text-primary/60 font-medium">Shabbat</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-2 border-t border-border text-xs">
        {Object.entries(FEAST_COLORS).map(([type, cls]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded border ${cls}`} />
            <span className="text-muted-foreground capitalize">{type.replace("_", " ")}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-muted-foreground">Today</span>
        </div>
      </div>
    </div>
  );
}
