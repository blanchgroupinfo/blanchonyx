import React, { useState, useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, CalendarRange, Menu, X, ArrowLeft, Clock, Bell, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCurrentCreatorDate, CreatorDay } from "@/lib/creatorCalendar";
import MonthView from "@/components/calendar/MonthView";
import YearView from "@/components/calendar/YearView";
import DayDetailPanel from "@/components/calendar/DayDetailPanel";
import GregorianClock from "@/components/calendar/GregorianClock";
import SunTimesPanel from "@/components/calendar/SunTimesPanel";
import LocationSearch from "@/components/calendar/LocationSearch";
import ExportPanel from "@/components/calendar/ExportPanel";

import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/Footer";
import LOGO_BROWN from "@/assets/b-logo-brown.png";

const UPCOMING_EVENTS = [
  {
    category: "governance",
    title: "Governance Deadline — Ethics Proposal",
    description: "Final day to cast your vote on the Community Ethics proposal.",
    time: "11:59 PM UTC",
  },
  {
    category: "networking",
    title: "Blanch Corridor Commerce Day",
    description: "Exclusive B2B matchmaking for Partner tier and above.",
    time: "9:00 AM EST",
  },
  {
    category: "community",
    title: "Annual Retreat — Elder Council",
    description: "Annual Royal Priesthood Network retreat and strategy session.",
    time: "All Day",
  },
  {
    category: "reminder",
    title: "BOX Token Release — Phase 3",
    description: "Phase 3 BOX token distribution for verified members.",
    time: "12:00 UTC",
  },
  {
    category: "governance",
    title: "S.H.I.E.L.D. Governance — Treasury Vote",
    description: "Community treasury allocation vote. Executive tier and above.",
    time: "12:00 UTC",
  },
];

const CATEGORY_STYLES: Record<string, { badge: string; border: string; bg: string; text: string }> = {
  governance: {
    badge: "bg-red-500/10 text-red-400 border-red-500/30",
    border: "border-red-500/20",
    bg: "from-red-500/5 to-transparent",
    text: "text-red-400"
  },
  networking: {
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    border: "border-emerald-500/20",
    bg: "from-emerald-500/5 to-transparent",
    text: "text-emerald-400"
  },
  community: {
    badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
    border: "border-indigo-500/20",
    bg: "from-indigo-500/5 to-transparent",
    text: "text-indigo-400"
  },
  reminder: {
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    border: "border-amber-500/20",
    bg: "from-amber-500/5 to-transparent",
    text: "text-amber-400"
  }
};

function downloadSingleEventICS(title: string, description: string, timeDetail: string) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  
  const dateStr = `${year}${month}${day}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Creators Restoration Calendar//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${dateStr}`,
    `DTEND;VALUE=DATE:${dateStr}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description} (${timeDetail})`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function CreatorsCalendar() {
  const today = getCurrentCreatorDate();
  const [view, setView] = useState<string>("month"); // "month" | "year"
  const [year, setYear] = useState<number>(today?.year ?? 1);
  const [month, setMonth] = useState<number>(today?.month ?? 1);
  const [selectedDay, setSelectedDay] = useState<CreatorDay | null>(today);
  const [location, setLocation] = useState<{ name: string; lat: number; lng: number } | null>(null);
  const [sunTimes, setSunTimes] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch sun times when location or selected day changes
  useEffect(() => {
    if (!location || !selectedDay) return;
    const date = selectedDay.gregorianDate;
    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    fetch(
      `https://api.sunrise-sunset.org/json?lat=${location.lat}&lng=${location.lng}&date=${dateStr}&formatted=0`
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.status === "OK") setSunTimes(data.results);
      });
  }, [location, selectedDay]);

  const handleMonthNavigate = (dir: number) => {
    let newMonth = month + dir;
    let newYear = year;
    if (newMonth < 1) { newMonth = 12; newYear--; }
    if (newMonth > 12) { newMonth = 1; newYear++; }
    if (newYear < 1) newYear = 1;
    setMonth(newMonth);
    setYear(newYear);
  };

  const handleYearNavigate = (dir: number) => {
    const newYear = Math.max(1, year + dir);
    setYear(newYear);
  };

  const handleMonthSelectFromYear = (m: number) => {
    setMonth(m);
    setView("month");
  };

  const goToToday = () => {
    if (today) {
      setYear(today.year);
      setMonth(today.month);
      setSelectedDay(today);
      setView("month");
    }
  };

  const navLinks = [
    { href: "/", label: "🏠 Home" },
    { href: "/business-network", label: "💼 Business Network" },
    { href: "/creators-calendar", label: "📅 Creator's Calendar", active: true },
    { href: "/royal-priesthood", label: "👑 Royal Priesthood" },
    { href: "/vision", label: "👁️ Smart City Vision" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-14">
        {/* ── HEADER ── */}
        <div
        className="text-center py-8 px-4 border-b border-border"
        style={{
          background: "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)",
          borderColor: "#1e293b",
        }}
      >
        <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "#a78bfa" }}>
          ✦ PRAISE MOST HIGH AHAYAH BA SHAM YASHAYA ✦
        </div>
        <h1
          className="font-heading text-3xl md:text-4xl font-bold mb-2"
          style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Creator's Restoration Calendar
        </h1>
        <p className="text-sm text-muted-foreground max-w-xl mx-auto">
          Anchored to March 17, 2013 · 364-day year · 12 months · 7-day week
        </p>
        <p className="text-xs text-muted-foreground/60 italic mt-1">
          "This is the day which AHAYAH hath made; we will rejoice and be glad in it." — Psalms 118:24
        </p>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-6 min-h-[calc(100vh-200px)]">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="w-full lg:w-80 xl:w-96 border border-border/40 bg-card/40 backdrop-blur-sm p-4 rounded-xl space-y-4 flex-shrink-0" style={{ borderColor: "#1e293b" }}>
          <GregorianClock />
          <LocationSearch onLocationChange={setLocation} />
          {location && (
            <SunTimesPanel
              lat={location.lat}
              lng={location.lng}
              date={selectedDay?.gregorianDate ?? new Date()}
            />
          )}
          <ExportPanel year={year} month={month} />
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 space-y-4">
          {/* View Controls */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant={view === "month" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setView("month")}
              >
                <CalendarDays className="w-4 h-4" />
                Month
              </Button>
              <Button
                variant={view === "year" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setView("year")}
              >
                <CalendarRange className="w-4 h-4" />
                Year
              </Button>
              <Button
                variant={view === "upcoming" ? "default" : "outline"}
                size="sm"
                className="gap-2"
                onClick={() => setView("upcoming")}
              >
                <Clock className="w-4 h-4" />
                Upcoming
              </Button>
            </div>

            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
          </div>

          {/* Calendar View */}
          <div
            className="bg-card border border-border rounded-xl p-4"
            style={{ borderColor: "#1e293b" }}
          >
            {view === "month" ? (
              <MonthView
                year={year}
                month={month}
                onNavigate={handleMonthNavigate}
                onDaySelect={setSelectedDay}
                selectedDay={selectedDay}
              />
            ) : view === "year" ? (
              <YearView
                year={year}
                onNavigate={handleYearNavigate}
                onMonthSelect={handleMonthSelectFromYear}
              />
            ) : (
              <div className="space-y-6 py-2">
                <div className="flex items-center justify-between border-b border-border/40 pb-4">
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">Upcoming Milestones & Gatherings</h3>
                    <p className="text-xs text-muted-foreground">Kingdom-aligned governance, network sessions, and reminders.</p>
                  </div>
                  <Bell className="w-5 h-5 text-primary/60 animate-pulse" />
                </div>
                
                <div className="grid gap-4">
                  {UPCOMING_EVENTS.map((event, idx) => {
                    const style = CATEGORY_STYLES[event.category] || CATEGORY_STYLES.reminder;
                    return (
                      <div 
                        key={idx} 
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl border ${style.border} bg-gradient-to-r ${style.bg} hover:border-primary/40 transition-all duration-300`}
                      >
                        <div className="space-y-1.5 flex-1 max-w-xl">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${style.badge}`}>
                              {event.category}
                            </span>
                          </div>
                          <h4 className="font-heading text-base font-bold text-foreground tracking-wide">
                            {event.title}
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {event.description}
                          </p>
                        </div>
                        
                        <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/20">
                          <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-background/50 px-2.5 py-1 rounded-md border border-border/30">
                            <Clock className="w-3.5 h-3.5 text-primary" />
                            <span>{event.time}</span>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-xs gap-1.5 hover:bg-primary/20 hover:text-primary transition-all"
                            onClick={() => downloadSingleEventICS(event.title, event.description, event.time)}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            Add to Calendar
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Day Detail */}
          {view !== "upcoming" && (
            <DayDetailPanel day={selectedDay} sunTimes={sunTimes} />
          )}
        </main>
      </div>
      </div>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/creators-calendar")({
  component: CreatorsCalendar,
});
