import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Plus, Bell, Star, Clock, Users, Shield, RefreshCw, X, CheckCircle, ExternalLink } from "lucide-react";
import { base44 } from "@/api/base44Client";

const LOGO_BROWN = "https://media.base44.com/images/public/user_68f1042648c5da44207e521e/168359697_Blogobrown.png";

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
    base44.entities.GovernanceProposal.filter({ status: "active" }, "-end_date", 10).then(setProposals);
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
      {/* Header */}
      <div className="border-b border-border/30 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={LOGO_BROWN} alt="Blanch Onyx" className="h-9 w-auto" />
            <div className="hidden sm:block">
              <p className="font-heading text-xs tracking-[0.3em] text-primary">BLANCH ONYX</p>
              <p className="text-[9px] tracking-[0.2em] text-white/40">CREATORS CALENDAR</p>
            </div>
          </Link>
          <Link to="/dashboard" className="flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-white hover:text-primary transition-colors">
            <ArrowLeft className="w-3 h-3" /> Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <p className="text-xs tracking-[0.3em] text-primary uppercase mb-2">Member Tools</p>
          <h1 className="font-heading text-3xl md:text-4xl tracking-[0.1em] text-foreground mb-2">Creators Calendar</h1>
          <p className="font-display text-base text-white italic">Community networking events, governance deadlines & kingdom milestones — sync directly to your Google Calendar.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-border/30 mb-8">
          {["calendar", "upcoming", "governance"].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-all border-b-2 -mb-px capitalize ${
                activeTab === tab ? "border-primary text-primary" : "border-transparent text-white hover:text-foreground"
              }`}>
              {tab}
            </button>
          ))}
        </div>

        {/* CALENDAR TAB */}
        {activeTab === "calendar" && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar grid */}
            <div className="lg:col-span-2">
              <div className="border border-border/30 bg-card p-6">
                {/* Month nav */}
                <div className="flex items-center justify-between mb-6">
                  <button onClick={prevMonth} className="p-2 hover:bg-primary/10 text-white hover:text-primary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                  <h2 className="font-heading text-lg tracking-[0.1em] text-foreground">{MONTHS[viewMonth]} {viewYear}</h2>
                  <button onClick={nextMonth} className="p-2 hover:bg-primary/10 text-white hover:text-primary transition-colors"><ChevronRight className="w-4 h-4" /></button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-2">
                  {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] tracking-[0.1em] text-white/50 uppercase py-1">{d}</div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                  {calDays.map((day, i) => {
                    const events = getEventsForDay(day);
                    const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                    const isSelected = day === selectedDay;
                    return (
                      <div
                        key={i}
                        onClick={() => day && setSelectedDay(isSelected ? null : day)}
                        className={`min-h-[52px] p-1.5 rounded cursor-pointer transition-all ${
                          !day ? "opacity-0 pointer-events-none" :
                          isSelected ? "bg-primary/20 border border-primary/40" :
                          isToday ? "border border-primary/30 bg-primary/5" :
                          "hover:bg-card/80 border border-transparent"
                        }`}
                      >
                        {day && (
                          <>
                            <span className={`text-[11px] font-heading block ${isToday ? "text-primary" : "text-foreground"}`}>{day}</span>
                            <div className="flex flex-wrap gap-0.5 mt-1">
                              {events.map(e => (
                                <span key={e.id} className={`w-2 h-2 rounded-full ${EVENT_TYPES[e.type]?.dot || "bg-white"}`} title={e.title} />
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected day events */}
              {selectedDay && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 border border-border/30 bg-card p-5">
                  <h3 className="font-heading text-sm tracking-[0.1em] text-foreground mb-3">
                    {MONTHS[viewMonth]} {selectedDay}, {viewYear}
                  </h3>
                  {getEventsForDay(selectedDay).length === 0 ? (
                    <p className="text-white text-xs italic">No events this day.</p>
                  ) : (
                    <div className="space-y-3">
                      {getEventsForDay(selectedDay).map(event => (
                        <div key={event.id} className={`border rounded p-3 ${EVENT_TYPES[event.type]?.color}`}>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-heading text-xs">{event.title}</p>
                              <p className="text-[10px] opacity-70 mt-0.5">{event.time}</p>
                            </div>
                            <button onClick={() => handleSync(event)} className="text-[9px] tracking-[0.1em] uppercase border border-current px-2 py-1 hover:opacity-80 transition-opacity flex items-center gap-1 shrink-0">
                              <ExternalLink className="w-2.5 h-2.5" /> Google Cal
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Sidebar: upcoming */}
            <div className="space-y-4">
              <div className="border border-border/30 bg-card p-5">
                <h3 className="font-heading text-xs tracking-[0.15em] text-primary uppercase mb-4">Next Events</h3>
                <div className="space-y-3">
                  {upcomingEvents.slice(0, 5).map(event => (
                    <div key={event.id} className="flex gap-3 items-start">
                      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${EVENT_TYPES[event.type]?.dot}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground leading-snug line-clamp-1">{event.title}</p>
                        <p className="text-[10px] text-white mt-0.5">{event.date} · {event.time}</p>
                      </div>
                      <button onClick={() => handleSync(event)} title="Sync to Google Calendar"
                        className={`shrink-0 ${syncedEvents[event.id] ? "text-green-400" : "text-white/40 hover:text-primary"} transition-colors`}>
                        {syncedEvents[event.id] ? <CheckCircle className="w-3.5 h-3.5" /> : <RefreshCw className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="border border-border/30 bg-card p-5">
                <h3 className="font-heading text-xs tracking-[0.15em] text-primary uppercase mb-3">Legend</h3>
                {Object.entries(EVENT_TYPES).map(([type, styles]) => (
                  <div key={type} className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${styles.dot}`} />
                    <span className="text-xs text-white capitalize">{type}</span>
                  </div>
                ))}
              </div>

              {/* Sync all CTA */}
              <div className="border border-primary/20 bg-primary/5 p-5">
                <p className="font-heading text-xs text-foreground mb-2">Sync All to Google Calendar</p>
                <p className="text-[11px] text-white mb-3">Add all upcoming governance deadlines and networking events to your personal calendar.</p>
                <button
                  onClick={() => upcomingEvents.forEach(e => handleSync(e))}
                  className="w-full py-2.5 bg-primary text-primary-foreground font-heading text-[10px] tracking-[0.15em] uppercase hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3 h-3" /> Sync All Events
                </button>
              </div>
            </div>
          </div>
        )}

        {/* UPCOMING TAB */}
        {activeTab === "upcoming" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-sm tracking-[0.1em] text-foreground">All Upcoming Events</h2>
              <span className="text-[10px] text-white">{upcomingEvents.length} events</span>
            </div>
            {upcomingEvents.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                className={`border rounded p-5 ${EVENT_TYPES[event.type]?.color}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] tracking-[0.1em] uppercase opacity-70">{event.type}</span>
                    </div>
                    <p className="font-heading text-sm text-foreground">{event.title}</p>
                    <p className="text-xs opacity-80 mt-1">{event.desc}</p>
                    <p className="text-[10px] opacity-60 mt-2">{event.date} · {event.time}</p>
                  </div>
                  <button onClick={() => handleSync(event)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-2 text-[9px] tracking-[0.1em] uppercase border border-current transition-all ${syncedEvents[event.id] ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                    {syncedEvents[event.id] ? <><CheckCircle className="w-3 h-3" /> Synced</> : <><RefreshCw className="w-3 h-3" /> Google Cal</>}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* GOVERNANCE TAB */}
        {activeTab === "governance" && (
          <div>
            <div className="border border-primary/20 bg-primary/5 p-5 mb-6 flex items-center gap-3">
              <Shield className="w-4 h-4 text-primary shrink-0" />
              <p className="text-sm text-foreground">Sync active S.H.I.E.L.D. governance deadlines directly to your calendar so you never miss a vote.</p>
            </div>
            {proposals.length === 0 ? (
              <div className="text-center py-16 text-white">
                <Shield className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="font-display italic">No active governance proposals at this time.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {proposals.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                    className="border border-primary/20 bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <span className="text-[9px] tracking-[0.15em] text-primary uppercase">Active Proposal</span>
                        <p className="font-heading text-sm text-foreground mt-1">{p.title}</p>
                        <p className="text-xs text-white mt-1 line-clamp-2">{p.description}</p>
                        {p.end_date && <p className="text-[10px] text-amber-400 mt-2">⏱ Deadline: {p.end_date}</p>}
                      </div>
                      <div className="flex flex-col gap-2 shrink-0">
                        <Link to="/dashboard" className="text-[9px] tracking-[0.1em] uppercase border border-primary/40 text-primary px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Vote
                        </Link>
                        {p.end_date && (
                          <button onClick={() => handleSync({ id: p.id, title: p.title, date: p.end_date, desc: p.description, time: "11:59 PM UTC" })}
                            className={`text-[9px] tracking-[0.1em] uppercase border border-white/20 px-3 py-2 transition-all flex items-center gap-1 ${syncedEvents[p.id] ? "text-green-400 border-green-400/40" : "text-white hover:text-primary hover:border-primary/40"}`}>
                            {syncedEvents[p.id] ? <><CheckCircle className="w-3 h-3" /> Synced</> : <><RefreshCw className="w-3 h-3" /> Cal</>}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}