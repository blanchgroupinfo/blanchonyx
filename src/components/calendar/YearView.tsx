import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMonthDays, FEAST_DAYS } from "@/lib/creatorCalendar";

const FEAST_COLORS: Record<string, string> = {
  feast: "#f59e0b",
  fast: "#ef4444",
  new_month: "#3b82f6",
  memorial: "#a855f7",
  preparation: "#f97316",
};

interface YearViewProps {
  year: number;
  onNavigate: (dir: number) => void;
  onMonthSelect: (month: number) => void;
}

export default function YearView({ year, onNavigate, onMonthSelect }: YearViewProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => onNavigate(-1)}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <div className="font-heading text-xl font-bold text-primary">
            Restoration Year {year}
          </div>
          <div className="text-sm text-muted-foreground">364-Day Calendar · 12 Months</div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => onNavigate(1)}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Month Mini-Grids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
          const days = getMonthDays(year, month);
          const firstDayWeek = days[0]?.dayOfWeek ?? 0;
          const todayStr = new Date().toDateString();

          return (
            <button
              key={month}
              onClick={() => onMonthSelect(month)}
              className="bg-card border border-border rounded-xl p-3 text-left hover:border-primary/50 hover:bg-muted/40 transition-all group w-full"
            >
              <div className="font-heading text-sm font-bold text-primary mb-2 group-hover:text-primary">
                Month {month}
              </div>

              {/* Mini 7-col grid */}
              <div className="grid grid-cols-7 gap-px">
                {["1", "2", "3", "4", "5", "6", "S"].map((h, i) => (
                  <div key={i} className={`text-center text-[9px] font-bold pb-1 ${i === 6 ? "text-primary" : "text-muted-foreground"}`}>
                    {h}
                  </div>
                ))}

                {Array.from({ length: firstDayWeek }).map((_, i) => (
                  <div key={`e-${i}`} />
                ))}

                {days.map((day) => {
                  const isToday = day.gregorianDate.toDateString() === todayStr;
                  const hasFeast = !!day.feast;
                  const feastColor = hasFeast ? FEAST_COLORS[day.feast.type] : null;

                  return (
                    <div
                      key={day.dayOfMonth}
                      title={hasFeast ? day.feast.name : day.dayName.full}
                      className={`
                        text-center text-[9px] rounded aspect-square flex items-center justify-center
                        ${isToday ? "bg-amber-400 text-black font-bold" : ""}
                        ${hasFeast && !isToday ? "font-bold" : ""}
                        ${day.isShabbat && !isToday && !hasFeast ? "text-primary/70" : "text-foreground/70"}
                      `}
                      style={hasFeast && !isToday ? { color: feastColor } : {}}
                    >
                      {day.dayOfMonth}
                    </div>
                  );
                })}
              </div>

              {/* Feast summary */}
              <div className="mt-2 space-y-0.5">
                {Object.entries(FEAST_DAYS)
                  .filter(([key]) => key.startsWith(`${month}-`))
                  .slice(0, 3)
                  .map(([key, feast]) => (
                    <div key={key} className="text-[9px] flex items-center gap-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: FEAST_COLORS[feast.type] || "#888" }}
                      />
                      <span className="text-muted-foreground truncate">{feast.name}</span>
                    </div>
                  ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
