import React, { useState, useEffect } from "react";
import { Clock, Calendar as CalendarIcon } from "lucide-react";
import { getCurrentCreatorDate } from "@/lib/creatorCalendar";

export default function GregorianClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const creatorDate = getCurrentCreatorDate();

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatGregorian = (d: Date) => {
    return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center gap-2 text-primary font-heading text-sm font-semibold uppercase tracking-wider">
        <Clock className="w-4 h-4" />
        Gregorian Time
      </div>
      <div className="text-3xl font-body font-bold tracking-tight text-foreground">
        {formatTime(now)}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarIcon className="w-3.5 h-3.5" />
        {formatGregorian(now)}
      </div>

      {creatorDate && (
        <div className="pt-3 border-t border-border space-y-1">
          <div className="text-primary font-heading text-sm font-semibold uppercase tracking-wider">
            Creator's Restoration Date
          </div>
          <div className="text-lg font-body font-bold text-foreground">
            Month {creatorDate.month}, Day {creatorDate.dayOfMonth}
          </div>
          <div className="text-sm text-muted-foreground">
            Restoration Year {creatorDate.year} · {creatorDate.dayName.full}
          </div>
        </div>
      )}
    </div>
  );
}
