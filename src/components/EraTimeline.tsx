import type { AircraftRecord, EraRecord } from "../types";
import { SectionHeader, Tag } from "./primitives";

export function EraTimeline(props: {
  eras: EraRecord[];
  aircraftMap: Map<string, AircraftRecord>;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { eras, aircraftMap, selectedId, onSelect } = props;

  return (
    <section className="section-block" id="timeline">
      <SectionHeader
        kicker="Era Progression"
        title="从炮战、截击到网络化多用途"
        summary="时代变化不只是武器升级，而是飞行员大脑里的任务模型在不断变化。每个阶段都有自己的节奏、恐惧和成就感。"
        aside="把飞机放回各自的时代语境，你会更容易理解它们为什么会长成这样。"
      />

      <div className="timeline-grid">
        {eras.map((era) => (
          <article key={era.id} className="era-card">
            <div className="era-head">
              <span>{era.years}</span>
              <h3>{era.title}</h3>
            </div>
            <p className="era-doctrine">{era.doctrine}</p>
            <p className="era-shift">{era.shift}</p>
            <div className="era-jets">
              {era.jetIds.map((jetId) => {
                const item = aircraftMap.get(jetId);
                if (!item) return null;
                return (
                  <button
                    key={jetId}
                    className={`era-jet ${selectedId === jetId ? "is-selected" : ""}`}
                    onClick={() => onSelect(jetId)}
                    type="button"
                  >
                    <strong>{item.name}</strong>
                    <Tag tone="amber">{item.era}</Tag>
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
