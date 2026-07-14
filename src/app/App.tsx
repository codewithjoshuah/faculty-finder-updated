import { useState } from "react";
import {
  Bell,
  Search,
  Home,
  Users,
  Calendar,
  User,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  BookOpen,
  GraduationCap,
} from "lucide-react";

const faculty = [
  {
    id: 1,
    name: "Dr. Priya Ramesh",
    department: "Computer Science & Engineering",
    subject: "Data Structures & Algorithms",
    cabin: "CSE-204",
    phone: "+91 98400 11234",
    email: "priya.ramesh@adtu.edu.in",
    status: "available" as const,
    avatar: "PR",
    avatarColor: "from-violet-500 to-purple-600",
    schedule: {
      Monday: ["9:00 AM – 10:30 AM", "2:00 PM – 3:30 PM"],
      Tuesday: ["10:30 AM – 12:00 PM"],
      Wednesday: ["9:00 AM – 10:30 AM", "3:30 PM – 5:00 PM"],
      Thursday: ["11:00 AM – 12:30 PM"],
      Friday: ["9:00 AM – 10:30 AM", "1:00 PM – 2:30 PM"],
    },
  },
  {
    id: 2,
    name: "Prof. Arun Kumar",
    department: "Electronics Engineering",
    subject: "Digital Signal Processing",
    cabin: "ECE-108",
    phone: "+91 98401 55678",
    email: "arun.kumar@adtu.edu.in",
    status: "teaching" as const,
    avatar: "AK",
    avatarColor: "from-blue-500 to-indigo-600",
    schedule: {
      Monday: ["10:30 AM – 12:00 PM"],
      Tuesday: ["9:00 AM – 10:30 AM", "2:00 PM – 3:30 PM"],
      Wednesday: ["11:00 AM – 12:30 PM"],
      Thursday: ["9:00 AM – 10:30 AM", "3:00 PM – 4:30 PM"],
      Friday: ["10:30 AM – 12:00 PM"],
    },
  },
  {
    id: 3,
    name: "Dr. Meenakshi Iyer",
    department: "Mathematics",
    subject: "Calculus & Linear Algebra",
    cabin: "MATH-301",
    phone: "+91 98402 99012",
    email: "meenakshi.iyer@adtu.edu.in",
    status: "break" as const,
    avatar: "MI",
    avatarColor: "from-emerald-500 to-teal-600",
    schedule: {
      Monday: ["8:00 AM – 9:30 AM"],
      Tuesday: ["11:00 AM – 12:30 PM", "2:30 PM – 4:00 PM"],
      Wednesday: ["8:00 AM – 9:30 AM", "2:00 PM – 3:30 PM"],
      Thursday: ["10:00 AM – 11:30 AM"],
      Friday: ["8:00 AM – 9:30 AM", "3:00 PM – 4:30 PM"],
    },
  },
  {
    id: 4,
    name: "Prof. Rajesh Natarajan",
    department: "Mechanical Engineering",
    subject: "Thermodynamics",
    cabin: "MECH-115",
    phone: "+91 98403 33456",
    email: "rajesh.natarajan@adtu.edu.in",
    status: "available" as const,
    avatar: "RN",
    avatarColor: "from-orange-500 to-red-500",
    schedule: {
      Monday: ["11:00 AM – 12:30 PM", "3:00 PM – 4:30 PM"],
      Tuesday: ["8:00 AM – 9:30 AM"],
      Wednesday: ["10:00 AM – 11:30 AM"],
      Thursday: ["8:00 AM – 9:30 AM", "2:00 PM – 3:30 PM"],
      Friday: ["11:00 AM – 12:30 PM"],
    },
  },
  {
    id: 5,
    name: "Dr. Lakshmi Subramaniam",
    department: "Physics",
    subject: "Quantum Mechanics",
    cabin: "PHY-209",
    phone: "+91 98404 77890",
    email: "lakshmi.sub@adtu.edu.in",
    status: "teaching" as const,
    avatar: "LS",
    avatarColor: "from-pink-500 to-rose-600",
    schedule: {
      Monday: ["2:00 PM – 3:30 PM"],
      Tuesday: ["10:30 AM – 12:00 PM"],
      Wednesday: ["9:00 AM – 10:30 AM"],
      Thursday: ["2:30 PM – 4:00 PM"],
      Friday: ["10:30 AM – 12:00 PM", "2:00 PM – 3:30 PM"],
    },
  },
  {
    id: 6,
    name: "Prof. Venkat Krishnan",
    department: "Civil Engineering",
    subject: "Structural Analysis",
    cabin: "CIVIL-306",
    phone: "+91 98405 21345",
    email: "venkat.krishnan@adtu.edu.in",
    status: "available" as const,
    avatar: "VK",
    avatarColor: "from-cyan-500 to-sky-600",
    schedule: {
      Monday: ["8:00 AM – 9:30 AM", "12:00 PM – 1:30 PM"],
      Tuesday: ["3:00 PM – 4:30 PM"],
      Wednesday: ["11:00 AM – 12:30 PM"],
      Thursday: ["9:00 AM – 10:30 AM"],
      Friday: ["8:00 AM – 9:30 AM"],
    },
  },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as const;

const timetable: Record<string, { time: string; subject: string; faculty: string; room: string }[]> = {
  Monday: [
    { time: "8:00 – 9:00", subject: "Mathematics", faculty: "Dr. Meenakshi Iyer", room: "LH-01" },
    { time: "9:00 – 10:00", subject: "Data Structures", faculty: "Dr. Priya Ramesh", room: "LH-02" },
    { time: "10:15 – 11:15", subject: "Physics Lab", faculty: "Dr. Lakshmi Subramaniam", room: "PL-01" },
    { time: "12:00 – 1:00", subject: "Thermodynamics", faculty: "Prof. Rajesh Natarajan", room: "LH-03" },
  ],
  Tuesday: [
    { time: "9:00 – 10:00", subject: "Digital Signal Processing", faculty: "Prof. Arun Kumar", room: "EL-01" },
    { time: "10:15 – 11:15", subject: "Mathematics", faculty: "Dr. Meenakshi Iyer", room: "LH-01" },
    { time: "11:30 – 12:30", subject: "Structural Analysis", faculty: "Prof. Venkat Krishnan", room: "LH-04" },
    { time: "2:00 – 3:00", subject: "Quantum Mechanics", faculty: "Dr. Lakshmi Subramaniam", room: "PL-02" },
  ],
  Wednesday: [
    { time: "8:00 – 9:00", subject: "Data Structures Lab", faculty: "Dr. Priya Ramesh", room: "CL-01" },
    { time: "10:00 – 11:00", subject: "Thermodynamics", faculty: "Prof. Rajesh Natarajan", room: "LH-03" },
    { time: "11:15 – 12:15", subject: "Structural Analysis", faculty: "Prof. Venkat Krishnan", room: "LH-04" },
    { time: "2:00 – 3:00", subject: "DSP Lab", faculty: "Prof. Arun Kumar", room: "EL-02" },
  ],
  Thursday: [
    { time: "9:00 – 10:00", subject: "Data Structures", faculty: "Dr. Priya Ramesh", room: "LH-02" },
    { time: "10:15 – 11:15", subject: "DSP", faculty: "Prof. Arun Kumar", room: "EL-01" },
    { time: "11:30 – 12:30", subject: "Mathematics", faculty: "Dr. Meenakshi Iyer", room: "LH-01" },
    { time: "2:30 – 3:30", subject: "Quantum Mechanics", faculty: "Dr. Lakshmi Subramaniam", room: "PL-02" },
  ],
  Friday: [
    { time: "8:00 – 9:00", subject: "Mathematics", faculty: "Dr. Meenakshi Iyer", room: "LH-01" },
    { time: "9:00 – 10:00", subject: "Thermodynamics", faculty: "Prof. Rajesh Natarajan", room: "LH-03" },
    { time: "10:30 – 11:30", subject: "DSP", faculty: "Prof. Arun Kumar", room: "EL-01" },
    { time: "2:00 – 3:00", subject: "Structural Analysis", faculty: "Prof. Venkat Krishnan", room: "LH-04" },
  ],
};

const statusConfig = {
  available: { label: "Available", bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500", border: "border-emerald-200" },
  teaching: { label: "Teaching", bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500", border: "border-red-200" },
  break: { label: "On Break", bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500", border: "border-amber-200" },
};

const dayColors: Record<string, string> = {
  Monday: "from-violet-500 to-purple-600",
  Tuesday: "from-blue-500 to-indigo-600",
  Wednesday: "from-emerald-500 to-teal-600",
  Thursday: "from-orange-500 to-amber-600",
  Friday: "from-pink-500 to-rose-600",
};

type Faculty = typeof faculty[0];
type NavTab = "home" | "faculty" | "search" | "schedule" | "profile";

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [activeNav, setActiveNav] = useState<NavTab>("home");
  const [activeDay, setActiveDay] = useState<string>("Monday");
  const [notifCount] = useState(3);

  const filtered = faculty.filter((f) => {
    const q = search.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.department.toLowerCase().includes(q) ||
      f.subject.toLowerCase().includes(q) ||
      f.cabin.toLowerCase().includes(q)
    );
  });

  return (
    <div
      className="min-h-screen pb-28"
      style={{
        background: "#F8FAFC",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #7C3AED, #5B21B6)" }}
        />
        <div
          className="absolute top-1/2 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #7C3AED, #5B21B6)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #5B21B6, #7C3AED)" }}
        />
      </div>

      {/* ── TOP HEADER ────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-40 px-4 sm:px-6 lg:px-10"
        style={{
          background: "rgba(248, 250, 252, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(124, 58, 237, 0.08)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
          {/* Student identity */}
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              JG
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800 leading-none">Joshuah Gnanraj</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium tracking-wide">ADT24SOCB0520</p>
            </div>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
            >
              <GraduationCap size={15} className="text-white" />
            </div>
            <span className="font-bold text-slate-800 text-base tracking-tight">CampusSync</span>
          </div>

          {/* Notification */}
          <div className="relative cursor-pointer group">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 group-hover:scale-105"
              style={{ background: "rgba(124, 58, 237, 0.08)" }}
            >
              <Bell size={17} className="text-violet-600" />
            </div>
            {notifCount > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
              >
                {notifCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Glassmorphism badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 border border-violet-200"
            style={{ background: "rgba(237, 233, 254, 0.7)", backdropFilter: "blur(12px)" }}
          >
            <MapPin size={12} className="text-violet-600" />
            <span className="text-xs font-semibold text-violet-700 tracking-widest uppercase">Faculty Cabin Finder</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-3"
            style={{
              background: "linear-gradient(135deg, #0F172A 0%, #7C3AED 60%, #5B21B6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            CampusSync
          </h1>
          <p className="text-slate-500 text-base sm:text-lg font-medium mb-8">
            Locate faculty, check availability & plan your day — all in one place.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div
              className="flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all duration-300 focus-within:shadow-lg"
              style={{
                background: "#ffffff",
                boxShadow: "0 4px 24px rgba(124, 58, 237, 0.1), 0 1px 4px rgba(0,0,0,0.06)",
                border: "1.5px solid rgba(124, 58, 237, 0.15)",
              }}
            >
              <Search size={18} className="text-violet-400 shrink-0" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search faculty, department or subject..."
                className="flex-1 bg-transparent outline-none text-slate-700 text-sm placeholder-slate-400 font-medium"
              />
              {search && (
                <button onClick={() => setSearch("")} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-8">
            {[
              { label: "Faculty", value: "124" },
              { label: "Departments", value: "14" },
              { label: "Available Now", value: "38" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY DIRECTORY ──────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Faculty Directory</h2>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                {filtered.length} faculty member{filtered.length !== 1 ? "s" : ""} found
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-violet-700 border border-violet-100"
              style={{ background: "rgba(237, 233, 254, 0.6)" }}>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Status
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Search size={36} className="text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No faculty found for &quot;{search}&quot;</p>
              <button onClick={() => setSearch("")} className="mt-3 text-violet-600 text-sm font-semibold hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((f) => {
                const s = statusConfig[f.status];
                return (
                  <div
                    key={f.id}
                    className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
                    style={{
                      background: "#ffffff",
                      boxShadow: "0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                      border: "1px solid rgba(124, 58, 237, 0.08)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 8px 32px rgba(124, 58, 237, 0.14), 0 2px 8px rgba(0,0,0,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124, 58, 237, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "0 2px 16px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(124, 58, 237, 0.08)";
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.avatarColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      >
                        {f.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-800 text-sm leading-tight truncate">{f.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 font-medium leading-snug line-clamp-2">{f.department}</p>
                      </div>
                    </div>

                    {/* Info rows */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(124, 58, 237, 0.08)" }}>
                          <BookOpen size={11} className="text-violet-600" />
                        </div>
                        <span className="text-xs text-slate-600 font-medium truncate">{f.subject}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: "rgba(124, 58, 237, 0.08)" }}>
                          <MapPin size={11} className="text-violet-600" />
                        </div>
                        <span className="text-xs text-slate-600 font-semibold tracking-wide">{f.cabin}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3"
                      style={{ borderTop: "1px solid rgba(124, 58, 237, 0.07)" }}>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${s.bg} ${s.text} ${s.border}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
                        {s.label}
                      </span>
                      <button
                        onClick={() => setSelectedFaculty(f)}
                        className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-800 transition-colors group-hover:gap-1.5"
                      >
                        View More
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── TIMETABLE ──────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 lg:px-10 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-800">Weekly Timetable</h2>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">B.Tech CSE — Semester 4, Section B</p>
          </div>

          {/* Day tabs */}
          <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
            {weekDays.map((day) => {
              const isActive = activeDay === day;
              return (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: `linear-gradient(135deg, ${day === "Monday" ? "#7C3AED, #5B21B6" : day === "Tuesday" ? "#3B82F6, #4338CA" : day === "Wednesday" ? "#10B981, #0D9488" : day === "Thursday" ? "#F59E0B, #D97706" : "#EC4899, #E11D48"})`,
                          color: "#ffffff",
                          boxShadow: "0 4px 12px rgba(124,58,237,0.25)",
                        }
                      : {
                          background: "#ffffff",
                          color: "#64748B",
                          border: "1px solid rgba(124,58,237,0.1)",
                        }
                  }
                >
                  {day.slice(0, 3)}
                </button>
              );
            })}
          </div>

          {/* Schedule cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {timetable[activeDay].map((slot, i) => (
              <div
                key={i}
                className="rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "#ffffff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  border: "1px solid rgba(124, 58, 237, 0.08)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(124, 58, 237, 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
                }}
              >
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg mb-3 text-[10px] font-bold tracking-wide"
                  style={{ background: "rgba(124, 58, 237, 0.08)", color: "#7C3AED" }}
                >
                  <Clock size={10} />
                  {slot.time}
                </div>
                <h4 className="font-semibold text-slate-800 text-sm mb-1 leading-snug">{slot.subject}</h4>
                <p className="text-xs text-slate-500 font-medium mb-2 line-clamp-1">{slot.faculty}</p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                  <MapPin size={10} className="text-violet-400" />
                  {slot.room}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACULTY DETAIL PANEL ───────────────────────────────── */}
      {selectedFaculty && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(15, 23, 42, 0.4)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedFaculty(null)}
        >
          <div
            className="w-full max-w-md rounded-3xl overflow-hidden relative"
            style={{
              background: "#ffffff",
              boxShadow: "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(124,58,237,0.12)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Panel header gradient */}
            <div
              className="px-6 pt-8 pb-6 relative"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)" }}
            >
              <button
                onClick={() => setSelectedFaculty(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.15)" }}
              >
                <X size={15} className="text-white" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedFaculty.avatarColor} flex items-center justify-center text-white font-bold text-xl border-2 border-white/20`}
                >
                  {selectedFaculty.avatar}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg leading-tight">{selectedFaculty.name}</h3>
                  <p className="text-white/70 text-xs font-medium mt-0.5 leading-snug">{selectedFaculty.department}</p>
                </div>
              </div>

              {/* Status badge */}
              <div className="mt-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${statusConfig[selectedFaculty.status].bg} ${statusConfig[selectedFaculty.status].text}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusConfig[selectedFaculty.status].dot}`} />
                  {statusConfig[selectedFaculty.status].label}
                </span>
              </div>
            </div>

            {/* Panel body */}
            <div className="px-6 py-5 space-y-3">
              {[
                { icon: BookOpen, label: "Subject", value: selectedFaculty.subject },
                { icon: MapPin, label: "Cabin Number", value: selectedFaculty.cabin },
                { icon: Phone, label: "Phone", value: selectedFaculty.phone },
                { icon: Mail, label: "Email", value: selectedFaculty.email },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-3 rounded-xl"
                  style={{ background: "#F8FAFC", border: "1px solid rgba(124,58,237,0.07)" }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: "rgba(124, 58, 237, 0.1)" }}
                  >
                    <Icon size={16} className="text-violet-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
                    <p className="text-sm text-slate-800 font-semibold truncate">{value}</p>
                  </div>
                </div>
              ))}

              {/* Mini timetable */}
              <div className="pt-2">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">This Week&apos;s Schedule</p>
                <div className="space-y-2">
                  {weekDays.map((day) => {
                    const slots = selectedFaculty.schedule[day];
                    return (
                      <div key={day} className="flex items-start gap-3">
                        <span className="text-[11px] font-bold text-violet-600 w-10 shrink-0 pt-0.5">{day.slice(0, 3)}</span>
                        <div className="flex flex-wrap gap-1.5">
                          {slots.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] px-2 py-0.5 rounded-md font-medium text-slate-600"
                              style={{ background: "rgba(124,58,237,0.08)" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                className="w-full mt-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── FLOATING BOTTOM NAV ────────────────────────────────── */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-30 px-4 w-full max-w-sm">
        <div
          className="flex items-center justify-around py-2 px-3 rounded-[28px]"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: "0 8px 32px rgba(124, 58, 237, 0.18), 0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid rgba(124, 58, 237, 0.12)",
          }}
        >
          {(
            [
              { id: "home", icon: Home, label: "Home" },
              { id: "faculty", icon: Users, label: "Faculty" },
              { id: "search", icon: Search, label: "Search" },
              { id: "schedule", icon: Calendar, label: "Schedule" },
              { id: "profile", icon: User, label: "Profile" },
            ] as { id: NavTab; icon: typeof Home; label: string }[]
          ).map(({ id, icon: Icon, label }) => {
            const isActive = activeNav === id;
            const isCenter = id === "search";
            return (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                className={`flex flex-col items-center gap-0.5 transition-all duration-200 ${
                  isCenter ? "relative -top-3" : ""
                }`}
              >
                {isCenter ? (
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                      boxShadow: "0 4px 16px rgba(124,58,237,0.45)",
                    }}
                  >
                    <Icon size={20} className="text-white" />
                  </div>
                ) : (
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                      isActive ? "scale-105" : ""
                    }`}
                    style={
                      isActive
                        ? { background: "rgba(124, 58, 237, 0.12)" }
                        : {}
                    }
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-violet-600" : "text-slate-400"}
                    />
                  </div>
                )}
                {!isCenter && (
                  <span
                    className={`text-[9px] font-semibold ${
                      isActive ? "text-violet-600" : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
