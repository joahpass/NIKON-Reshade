import type { AircraftRecord } from "../types";
import { AircraftImage, FitBadge, StatsBlock, Tag } from "./primitives";

export function HeroSection(props: {
  selected: AircraftRecord;
  totalAircraft: number;
  totalRoles: number;
  totalEras: number;
}) {
  const { selected, totalAircraft, totalRoles, totalEras } = props;

  return (
    <section className="hero-panel" id="top">
      <div className="hero-copy">
        <p className="section-kicker">DCS COMBAT AIRFRAME DOSSIER</p>
        <h1>别只问哪架更强，先看哪架适合你把任务飞完整。</h1>
        <p className="hero-summary">
          这不是一张简单的飞机清单。这里把 DCS 热门喷气机拆成任务人格、工作负荷、学习收益和任务回报，帮助你更快判断自己该从哪条路线切入。
        </p>
        <div className="hero-actions">
          <a className="button-primary" href="#hangar">
            进入主机库
          </a>
          <a className="button-secondary" href="#guide">
            查看首发导览
          </a>
        </div>
        <div className="hero-metrics">
          <div>
            <strong>{totalAircraft}</strong>
            <span>核心机型</span>
          </div>
          <div>
            <strong>{totalRoles}</strong>
            <span>任务角色</span>
          </div>
          <div>
            <strong>{totalEras}</strong>
            <span>时代阶段</span>
          </div>
          <div>
            <strong>BVR / CAS / NAVAL</strong>
            <span>作战侧重</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-frame">
          <AircraftImage aircraft={selected} className="hero-image" priority />
          <div className="hero-overlay">
            <div className="hero-overlay-top">
              <span>SELECTED DOSSIER</span>
              <FitBadge fit={selected.firstModuleFit} />
            </div>
            <div className="hero-overlay-bottom">
              <h2>{selected.name}</h2>
              <p>{selected.summary}</p>
              <div className="hero-tags">
                <Tag tone="accent">{selected.nation}</Tag>
                <Tag>{selected.role}</Tag>
                <Tag tone="amber">{selected.era}</Tag>
              </div>
            </div>
          </div>
        </div>

        <aside className="hero-readout">
          <p className="section-kicker">Frontline Readout</p>
          <div className="readout-grid">
            <div>
              <span>任务人格</span>
              <strong>{selected.temperament}</strong>
            </div>
            <div>
              <span>典型任务</span>
              <strong>{selected.mission}</strong>
            </div>
            <div>
              <span>工作负荷</span>
              <strong>{selected.workload}</strong>
            </div>
            <div>
              <span>学习曲线</span>
              <strong>{selected.curve}</strong>
            </div>
          </div>
          <StatsBlock stats={selected.stats} keys={["speed", "agility", "avionics", "difficulty"]} />
        </aside>
      </div>
    </section>
  );
}
