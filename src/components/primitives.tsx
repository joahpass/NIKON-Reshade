import { useState } from "react";
import type { AircraftRecord, FirstModuleFit, StatKey } from "../types";

const statLabels: Record<StatKey, string> = {
  speed: "速度",
  agility: "机动",
  avionics: "航电",
  strike: "打击",
  difficulty: "门槛"
};

export function SectionHeader(props: {
  id?: string;
  kicker: string;
  title: string;
  summary: string;
  aside?: string;
}) {
  const { id, kicker, title, summary, aside } = props;

  return (
    <div className="section-heading" id={id}>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className="section-summary">{summary}</p>
      </div>
      {aside ? <div className="section-aside">{aside}</div> : null}
    </div>
  );
}

export function Tag(props: { children: string; tone?: "default" | "accent" | "amber" }) {
  const { children, tone = "default" } = props;
  return <span className={`tag tag-${tone}`}>{children}</span>;
}

export function StatBar(props: { label: string; value: number }) {
  const { label, value } = props;
  return (
    <div className="stat-bar">
      <span>{label}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%` }} />
      </div>
      <strong>{value}</strong>
    </div>
  );
}

export function StatsBlock(props: { stats: AircraftRecord["stats"]; keys?: StatKey[] }) {
  const { stats, keys = ["speed", "agility", "avionics", "strike", "difficulty"] } = props;
  return (
    <div className="stats-block">
      {keys.map((key) => (
        <StatBar key={key} label={statLabels[key]} value={stats[key]} />
      ))}
    </div>
  );
}

export function FitBadge(props: { fit: FirstModuleFit }) {
  const { fit } = props;
  const className =
    fit === "首发推荐"
      ? "fit-strong"
      : fit === "谨慎首发"
        ? "fit-cautious"
        : "fit-demanding";

  return <span className={`fit-badge ${className}`}>{fit}</span>;
}

export function AircraftImage(props: {
  aircraft: AircraftRecord;
  className?: string;
  priority?: boolean;
}) {
  const { aircraft, className, priority = false } = props;
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`image-fallback ${className ?? ""}`}
        style={{ ["--aircraft-accent" as string]: aircraft.accent }}
      >
        <svg viewBox="0 0 260 82" aria-hidden="true">
          <path
            fill="currentColor"
            d="M246 38 147 27 109 5 91 9l27 23-63 2L18 17 6 20l31 21L6 62l12 3 37-17 63 2-27 23 18 4 38-22 99-11c6-1 9-2 9-4s-3-3-9-4Z"
          />
        </svg>
        <span>OFFICIAL IMAGE UNAVAILABLE</span>
        <strong>{aircraft.name}</strong>
        <small>{aircraft.temperament}</small>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={aircraft.poster}
      alt={`${aircraft.name} DCS poster`}
      loading={priority ? "eager" : "lazy"}
      onError={() => setFailed(true)}
    />
  );
}
