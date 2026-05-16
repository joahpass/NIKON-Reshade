import type { AircraftRecord } from "../types";
import { AircraftImage, SectionHeader, StatsBlock, Tag } from "./primitives";

export function FeaturedDossiers(props: {
  featured: AircraftRecord[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { featured, selectedId, onSelect } = props;

  return (
    <section className="section-block" id="featured">
      <SectionHeader
        kicker="Mission Dossiers"
        title="三条最能代表 DCS 气质的入场路线"
        summary="如果你还不知道自己到底偏爱哪种喷气机，这三份任务档案通常足以把你的口味勾出来。"
        aside="编辑选择不是“最强榜”，而是三种最鲜明的飞行人格。"
      />

      <div className="dossier-strip">
        {featured.map((item) => (
          <button
            key={item.id}
            className={`dossier-card ${item.id === selectedId ? "is-selected" : ""}`}
            onClick={() => onSelect(item.id)}
            type="button"
          >
            <div className="dossier-image-wrap">
              <AircraftImage aircraft={item} className="dossier-image" />
            </div>
            <div className="dossier-body">
              <div className="dossier-head">
                <p>{item.temperament}</p>
                <h3>{item.name}</h3>
              </div>
              <p className="dossier-summary">{item.summary}</p>
              <div className="tag-row">
                <Tag tone="accent">{item.mission}</Tag>
                <Tag>{item.role}</Tag>
                <Tag tone="amber">{item.firstModuleFit}</Tag>
              </div>
              <StatsBlock stats={item.stats} keys={["speed", "agility", "strike"]} />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
