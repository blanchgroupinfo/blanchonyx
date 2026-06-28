import React, { useState, useEffect } from "react";
import { Sun, Sunrise, Sunset, Moon } from "lucide-react";

interface SunTimesPanelProps {
  lat: number;
  lng: number;
  date: Date;
}

export default function SunTimesPanel({ lat, lng, date }: SunTimesPanelProps) {
  const [sunData, setSunData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lat || !lng) return;
    setLoading(true);

    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    
    fetch(`https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=${dateStr}&formatted=0`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "OK") {
          setSunData(data.results);
        }
      })
      .finally(() => setLoading(false));
  }, [lat, lng, date]);

  const formatTime = (isoStr: string) => {
    if (!isoStr) return "--:--";
    const d = new Date(isoStr);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const times = [
    { label: "Dawn", icon: Moon, value: sunData?.civil_twilight_begin, color: "text-indigo-400" },
    { label: "Sunrise", icon: Sunrise, value: sunData?.sunrise, color: "text-amber-500" },
    { label: "Sunset", icon: Sunset, value: sunData?.sunset, color: "text-orange-500" },
    { label: "Dusk", icon: Moon, value: sunData?.civil_twilight_end, color: "text-indigo-500" },
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-4 space-y-3">
      <div className="flex items-center gap-2 text-primary font-heading text-sm font-semibold uppercase tracking-wider">
        <Sun className="w-4 h-4" />
        Sun Times
      </div>
      {loading ? (
        <div className="flex justify-center py-4">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !lat ? (
        <p className="text-sm text-muted-foreground">Search a location to see sun times</p>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {times.map(({ label, icon: Icon, value, color }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${color}`} />
              <div>
                <div className="text-xs text-muted-foreground">{label}</div>
                <div className="text-sm font-semibold font-body text-foreground">{formatTime(value)}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
