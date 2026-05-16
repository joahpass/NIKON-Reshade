import type { AircraftRecord, FirstModuleFit } from "../types";
import { AircraftImage, FitBadge, SectionHeader, StatsBlock, Tag } from "./primitives";

export interface FilterState {
  query: string;
  role: string;
  era: string;
  fit: "all" | FirstModuleFit;
}

export function HangarGrid(props: {
  aircraft: AircraftRecord[];
  filtered: AircraftRecord[];
  filters: FilterState;
  roleOptions: string[];
  eraOptions: string[];
  onFilterChange: (next: Partial<FilterState>) => void;
  onReset: () => void;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const {
    aircraft,
    filtered,
    filters,
    roleOptions,
    eraOptions,
    onFilterChange,
    onReset,
    selectedId,
    onSelect
  } = props;

  return (
    <section className="section-block" id="hangar">
      <SectionHeader
        kicker="Hangar Index"
        title="主机库"
        summary="这里保留了工具化筛选，但把结果卡片做成了更像飞行档案而不是普通图库。点击任意机型，整页 briefing 会同步切换。"
        aside={`${filtered.length} / ${aircraft.length} AIRFRAMES`}
      />

      <div className="filter-bar">
        <label className="field">
          <span>搜索</span>
          <input
            type="search"
            value={filters.query}
            placeholder="搜索 F-16、舰载、冷战、对地、截击..."
            onChange={(event) => onFilterChange({ query: event.target.value })}
          />
        </label>
        <label className="field">
          <span>角色</span>
          <select value={filters.role} onChange={(event) => onFilterChange({ role: event.target.value })}>
            <option value="all">全部角色</option>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>时代</span>
          <select value={filters.era} onChange={(event) => onFilterChange({ era: event.target.value })}>
            <option value="all">全部时代</option>
            {eraOptions.map((era) => (
              <option key={era} value={era}>
                {era}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>首发适配</span>
          <select
            value={filters.fit}
            onChange={(event) => onFilterChange({ fit: event.target.value as FilterState["fit"] })}
          >
            <option value="all">全部</option>
            <option value="首发推荐">首发推荐</option>
            <option value="谨慎首发">谨慎首发</option>
            <option value="不建议首发">不建议首发</option>
          </select>
        </label>
        <button className="button-secondary button-reset" onClick={onReset} type="button">
          重置筛选
        </button>
      </div>

      <div className="hangar-grid">
        {filtered.map((item) => (
          <article
            key={item.id}
            className={`hangar-card ${item.id === selectedId ? "is-selected" : ""}`}
            style={{ ["--aircraft-accent" as string]: item.accent }}
          >
            <button className="hangar-card-action" onClick={() => onSelect(item.id)} type="button">
              <div className="hangar-image-wrap">
                <AircraftImage aircraft={item} className="hangar-image" />
                <div className="hangar-image-meta">
                  <span>{item.mission}</span>
                  <FitBadge fit={item.firstModuleFit} />
                </div>
              </div>
              <div className="hangar-copy">
                <div className="hangar-title-row">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.temperament}</p>
                  </div>
                </div>
                <div className="tag-row">
                  <Tag tone="accent">{item.nation}</Tag>
                  <Tag>{item.role}</Tag>
                  <Tag tone="amber">{item.era}</Tag>
                </div>
                <p className="hangar-summary">{item.summary}</p>
                <div className="brief-snippets">
                  <div>
                    <span>飞行感觉</span>
                    <strong>{item.missionStyle}</strong>
                  </div>
                  <div>
                    <span>推荐对象</span>
                    <strong>{item.recommendedFor[0]}</strong>
                  </div>
                </div>
                <StatsBlock stats={item.stats} />
              </div>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
