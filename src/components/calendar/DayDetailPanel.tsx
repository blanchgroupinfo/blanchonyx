import React from "react";
import { Sun, Star, Calendar } from "lucide-react";
import { CreatorDay } from "@/lib/creatorCalendar";

const FEAST_COLORS: Record<string, string> = {
  feast: "text-amber-400",
  fast: "text-red-400",
  new_month: "text-blue-400",
  memorial: "text-purple-400",
  preparation: "text-orange-400",
};

interface DayDetailPanelProps {
  day: CreatorDay | null;
  sunTimes: any;
}

export default function DayDetailPanel({ day, sunTimes }: DayDetailPanelProps) {
  if (!day) {
    return (
      <div className="bg-card border border-border rounded-xl p-6 text-center text-muted-foreground">
        <Calendar className="w-8 h-8 mx-auto mb-3 opacity-40" />
        <p className="text-sm">Select a day to view details</p>
      </div>
    );
  }

  const gregStr = day.gregorianDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatSunTime = (isoStr: string) => {
    if (!isoStr) return "--:--";
    return new Date(isoStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-accent/10 border-b border-border p-5">
        <div className="font-heading text-2xl font-bold text-primary">
          Month {day.month}, Day {day.dayOfMonth}
        </div>
        <div className="text-sm text-foreground/80 mt-1">
          Restoration Year {day.year}
        </div>
        <div className="text-sm text-muted-foreground mt-0.5">
          {day.dayName.full}
        </div>
        {day.isShabbat && (
          <div className="mt-2 inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/30">
            <Star className="w-3 h-3" /> Shabbat — Day of Rest
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Gregorian */}
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Gregorian Date</div>
          <div className="text-sm font-medium">{gregStr}</div>
        </div>

        {/* Day info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Day of Week</div>
            <div className="text-sm font-semibold mt-0.5">Day {day.dayOfWeek + 1} of 7</div>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <div className="text-xs text-muted-foreground">Day of Year</div>
            <div className="text-sm font-semibold mt-0.5">Day {day.dayOfYear} of 364</div>
          </div>
        </div>

        {/* Feast */}
        {day.feast && (
          <div className="border border-border rounded-lg p-3 bg-muted/30">
            <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Holy Day</div>
            <div className={`font-semibold text-sm ${FEAST_COLORS[day.feast.type] || ""}`}>
              {day.feast.name}
            </div>
            {day.feast.detail && (
              <div className="text-xs text-muted-foreground mt-1">{day.feast.detail}</div>
            )}
          </div>
        )}

        {/* Day begins note */}
        <div className="text-xs text-muted-foreground italic border-t border-border pt-3">
          ✦ The day begins at dawn/sunrise and ends at the following sunrise
        </div>

        {/* Sun times */}
        {sunTimes && (
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider mb-2">
              <Sun className="w-3.5 h-3.5" /> Sun Times for This Day
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Dawn", key: "civil_twilight_begin", color: "text-indigo-400" },
                { label: "Sunrise", key: "sunrise", color: "text-amber-500" },
                { label: "Sunset", key: "sunset", color: "text-orange-500" },
                { label: "Dusk", key: "civil_twilight_end", color: "text-indigo-500" },
              ].map(({ label, key, color }) => (
                <div key={key} className="bg-muted/40 rounded-lg p-2">
                  <div className={`text-xs font-medium ${color}`}>{label}</div>
                  <div className="text-sm font-bold">{formatSunTime(sunTimes[key])}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
