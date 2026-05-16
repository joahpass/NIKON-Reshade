export type StatKey = "speed" | "agility" | "avionics" | "strike" | "difficulty";

export type FirstModuleFit = "首发推荐" | "谨慎首发" | "不建议首发";

export type AircraftStats = Record<StatKey, number>;

export interface AircraftRecord {
  id: string;
  name: string;
  nation: string;
  role: string;
  era: string;
  mission: string;
  curve: string;
  pilot: string;
  tip: string;
  accent: string;
  poster: string;
  source: string;
  tags: string[];
  summary: string;
  temperament: string;
  firstModuleFit: FirstModuleFit;
  strengths: string[];
  tradeoffs: string[];
  workload: string;
  missionStyle: string;
  recommendedFor: string[];
  stats: AircraftStats;
}

export interface GuideTrack {
  id: string;
  title: string;
  summary: string;
  cue: string;
  jetIds: string[];
}

export interface EraRecord {
  id: string;
  title: string;
  years: string;
  doctrine: string;
  shift: string;
  jetIds: string[];
}
