import type { AircraftRecord, GuideTrack } from "../types";
import { FitBadge, SectionHeader, Tag } from "./primitives";

export function SelectionGuide(props: {
  tracks: GuideTrack[];
  aircraftMap: Map<string, AircraftRecord>;
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { tracks, aircraftMap, selectedId, onSelect } = props;

  return (
    <section className="section-block" id="guide">
      <SectionHeader
        kicker="Pilot Guidance"
        title="如何选择你的首架 DCS 喷气机"
        summary="别用“最强”来选第一架机。先确认你要的是哪一种飞行满足感，再看哪架机能把那种满足感稳定交付。"
        aside="这一段的目标，是帮你更快确认第一条飞行主线。"
      />

      <div className="guide-grid">
        {tracks.map((track) => (
          <article key={track.id} className="guide-card">
            <p className="guide-cue">{track.cue}</p>
            <h3>{track.title}</h3>
            <p className="guide-summary">{track.summary}</p>
            <div className="guide-recommendations">
              {track.jetIds.map((jetId) => {
                const item = aircraftMap.get(jetId);
                if (!item) return null;
                return (
                  <button
                    key={item.id}
                    className={`guide-jet ${selectedId === item.id ? "is-selected" : ""}`}
                    onClick={() => onSelect(item.id)}
                    type="button"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.temperament}</span>
                    </div>
                    <div className="guide-jet-meta">
                      <FitBadge fit={item.firstModuleFit} />
                      <Tag>{item.role}</Tag>
                    </div>
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
