<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Plus, Bell, Star, Clock, Users, Shield, RefreshCw, X, CheckCircle, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import LOGO_BROWN from "@/assets/b-logo-brown.png";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

const EVENT_TYPES = {
  governance: { color: "bg-primary/20 border-primary/40 text-primary", dot: "bg-primary" },
  networking: { color: "bg-blue-500/20 border-blue-500/40 text-blue-400", dot: "bg-blue-400" },
  community: { color: "bg-green-500/20 border-green-500/40 text-green-400", dot: "bg-green-400" },
  reminder: { color: "bg-amber-500/20 border-amber-500/40 text-amber-400", dot: "bg-amber-400" },
};

const SAMPLE_EVENTS = [
  { id: 1, title: "S.H.I.E.L.D. Governance Vote — Protocol Upgrade", date: "2026-06-15", type: "governance", desc: "Vote on DLT protocol upgrade proposal. All members eligible.", time: "12:00 UTC" },
  { id: 2, title: "Royal Network Mixer — Virtual", date: "2026-06-18", type: "networking", desc: "Monthly members-only networking session. Founders and Royal tier.", time: "7:00 PM EST" },
  { id: 3, title: "H.E.E.D. Community Summit", date: "2026-06-22", type: "community", desc: "Quarterly community development summit — all tiers welcome.", time: "10:00 AM EST" },
  { id: 4, title: "Governance Deadline — Ethics Proposal", date: "2026-06-28", type: "governance", desc: "Final day to cast your vote on the Community Ethics proposal.", time: "11:59 PM UTC" },
  { id: 5, title: "Blanch Corridor Commerce Day", date: "2026-07-04", type: "networking", desc: "Exclusive B2B matchmaking for Partner tier and above.", time: "9:00 AM EST" },
  { id: 6, title: "Annual Retreat — Elder Council", date: "2026-07-12", type: "community", desc: "Annual Royal Priesthood Network retreat and strategy session.", time: "All Day" },
  { id: 7, title: "BOX Token Release — Phase 3", date: "2026-07-20", type: "reminder", desc: "Phase 3 BOX token distribution for verified members.", time: "12:00 UTC" },
  { id: 8, title: "S.H.I.E.L.D. Governance — Treasury Vote", date: "2026-07-25", type: "governance", desc: "Community treasury allocation vote. Executive tier and above.", time: "12:00 UTC" },
];

function buildCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

function buildGoogleCalUrl(event) {
  const dt = event.date.replace(/-/g, "");
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.desc + " — Blanch Onyx Social Club");
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dt}/${dt}&details=${details}`;
}

export default function CreatorsCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [activeTab, setActiveTab] = useState("calendar");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [syncedEvents, setSyncedEvents] = useState({});
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    supabase
      .from("governance_proposals")
      .select("*")
      .eq("status", "active")
      .order("end_date", { ascending: false })
      .limit(10)
      .then(({ data, error }) => {
        if (!error && data) setProposals(data);
      });
  }, []);

  const calDays = buildCalendarDays(viewYear, viewMonth);

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return SAMPLE_EVENTS.filter(e => e.date === dateStr);
  };

  const upcomingEvents = SAMPLE_EVENTS.filter(e => new Date(e.date) >= today).sort((a, b) => new Date(a.date) - new Date(b.date));

  const govDeadlines = proposals.map(p => ({
    id: `gov-${p.id}`,
    title: p.title,
    date: p.end_date || "",
    type: "governance",
    desc: p.description,
    time: "11:59 PM UTC",
    isLive: true,
  })).filter(e => e.date);

  const allEvents = [...SAMPLE_EVENTS, ...govDeadlines];

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  const handleSync = (event) => {
    setSyncedEvents(prev => ({ ...prev, [event.id]: true }));
    window.open(buildGoogleCalUrl(event), "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-muted-foreground/60">CREATORS CALENDAR</p>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-3">Events & Governance</p>
          <h1 className="font-heading text-3xl md:text-5xl tracking-[0.1em] text-foreground mb-4">Creators Calendar</h1>
          <p className="font-display text-lg text-muted-foreground italic max-w-2xl">
            Track governance deadlines, network events, and community summits.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 mb-8 border-b border-border/30">
          {["calendar", "upcoming", "governance"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[11px] tracking-[0.15em] uppercase transition-all border-b-2 ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
              {tab}
            </button>
          ))}
        </div>

        {activeTab === "calendar" && (
          <div className="border border-border/30 bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="p-2 hover:bg-muted transition-colors"><ChevronLeft className="w-5 h-5" /></button>
              <h2 className="font-heading text-lg tracking-[0.1em] text-foreground">{MONTHS[viewMonth]} {viewYear}</h2>
              <button onClick={nextMonth} className="p-2 hover:bg-muted transition-colors"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {DAYS.map(d => <div key={d} className="text-center text-[10px] tracking-wider text-muted-foreground uppercase py-2">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calDays.map((day, i) => {
                const dayEvents = getEventsForDay(day);
                return (
                  <div key={i} onClick={() => day && setSelectedDay(day)}
                    className={`min-h-[60px] p-1 border border-border/20 text-xs ${day ? "hover:border-primary/40 cursor-pointer" : ""}`}>
                    {day && (
                      <>
                        <span className="text-muted-foreground text-[10px]">{day}</span>
                        {dayEvents.map((e, j) => (
                          <div key={j} className={`mt-0.5 px-1 py-0.5 text-[8px] rounded ${EVENT_TYPES[e.type]?.color}`}>
                            {e.title.substring(0, 20)}...
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === "upcoming" && (
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="border border-border/30 bg-card p-5 hover:border-primary/20 transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded ${EVENT_TYPES[event.type]?.color}`}>{event.type}</span>
                    <h3 className="font-heading text-sm text-foreground mt-2">{event.title}</h3>
                    <p className="text-muted-foreground text-xs mt-1">{event.desc}</p>
                    <p className="text-muted-foreground text-[10px] mt-2"><Clock className="w-3 h-3 inline mr-1" />{event.time}</p>
                  </div>
                  <button onClick={() => handleSync(event)} className="text-[10px] text-primary hover:underline flex items-center gap-1">
                    {syncedEvents[event.id] ? <><CheckCircle className="w-3 h-3" /> Synced</> : <><Plus className="w-3 h-3" /> Add to Calendar</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "governance" && (
          <div className="space-y-3">
            {govDeadlines.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-10">No active governance proposals at this time.</p>
            ) : govDeadlines.map(e => (
              <div key={e.id} className="border border-primary/20 bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] text-green-400 uppercase tracking-wider">Live</span>
                </div>
                <h3 className="font-heading text-sm text-foreground">{e.title}</h3>
                <p className="text-muted-foreground text-xs mt-1">{e.desc}</p>
                <p className="text-primary text-[10px] mt-2">Deadline: {e.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/creators-calendar")({
  component: CreatorsCalendar,
});
=======
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
>>>>>>> Stashed changes
