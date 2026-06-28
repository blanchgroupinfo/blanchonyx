import React, { useState } from "react";
import { Download, FileText, Calendar, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMonthDays, creatorToGregorian, FEAST_DAYS } from "@/lib/creatorCalendar";

interface ExportPanelProps {
  year: number;
  month: number;
}

function generateICS(year: number) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Creators Restoration Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Creator's Restoration Year ${year}`,
  ];

  // Add feast days
  Object.entries(FEAST_DAYS).forEach(([key, feast]) => {
    const [m, d] = key.split("-").map(Number);
    const greg = creatorToGregorian(year, m, d);
    const dateStr = greg.toISOString().slice(0, 10).replace(/-/g, "");

    lines.push("BEGIN:VEVENT");
    lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
    lines.push(`DTEND;VALUE=DATE:${dateStr}`);
    lines.push(`SUMMARY:${feast.name}${feast.detail ? " - " + feast.detail : ""}`);
    lines.push(`DESCRIPTION:Creator's Restoration Year ${year} Month ${m} Day ${d}`);
    lines.push("END:VEVENT");
  });

  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

function downloadFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function generateCSV(year: number, month: number) {
  const days = getMonthDays(year, month);
  const rows = [["Creator Month", "Creator Day", "Day Name", "Gregorian Date", "Holy Day", "Holy Day Type"]];
  days.forEach((d) => {
    rows.push([
      String(d.month),
      String(d.dayOfMonth),
      d.dayName.full,
      d.gregorianDate.toLocaleDateString("en-US"),
      d.feast ? d.feast.name : "",
      d.feast ? d.feast.type : "",
    ]);
  });
  return rows.map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
}

export default function ExportPanel({ year, month }: ExportPanelProps) {
  const [exporting, setExporting] = useState<string | null>(null);

  const handleExportICS = () => {
    setExporting("ics");
    const content = generateICS(year);
    downloadFile(content, `creators-calendar-year-${year}.ics`, "text/calendar");
    setTimeout(() => setExporting(null), 1000);
  };

  const handleExportCSV = () => {
    setExporting("csv");
    const content = generateCSV(year, month);
    downloadFile(content, `creators-calendar-month-${month}-year-${year}.csv`, "text/csv");
    setTimeout(() => setExporting(null), 1000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2 text-primary font-heading text-sm font-semibold uppercase tracking-wider">
        <Download className="w-4 h-4" />
        Export
      </div>

      <div className="space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-xs"
          onClick={handleExportICS}
          disabled={exporting === "ics"}
        >
          <Calendar className="w-3.5 h-3.5" />
          {exporting === "ics" ? "Exporting..." : "Export Year to .ICS (Google/Apple/Outlook)"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-xs"
          onClick={handleExportCSV}
          disabled={exporting === "csv"}
        >
          <FileText className="w-3.5 h-3.5" />
          {exporting === "csv" ? "Exporting..." : `Export Month ${month} to CSV`}
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start gap-2 text-xs"
          onClick={handlePrint}
        >
          <Printer className="w-3.5 h-3.5" />
          Print / Save as PDF
        </Button>
      </div>

      <div className="text-xs text-muted-foreground pt-1 border-t border-border">
        .ICS works with Google Calendar, Apple Calendar, Outlook & Linux calendar apps
      </div>
    </div>
  );
}
