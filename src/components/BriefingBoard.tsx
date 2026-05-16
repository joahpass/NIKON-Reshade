import type { AircraftRecord } from "../types";
import { AircraftImage, FitBadge, SectionHeader, StatsBlock, Tag } from "./primitives";

export function BriefingBoard(props: { selected: AircraftRecord }) {
  const { selected } = props;

  return (
    <section className="section-block" id="briefing">
      <SectionHeader
        kicker="Briefing Board"
        title="最终判断：这架机真正会把你带进什么样的 DCS 生活"
        summary="数值只能回答一半问题。另一半来自任务节奏、工作负荷、飞行满足感和你愿不愿意长期留在这架机的世界里。"
        aside="这一块把“手感判断”和“长期投入判断”放在同一张板上。"
      />

      <div className="briefing-board">
        <div className="briefing-poster">
          <AircraftImage aircraft={selected} className="briefing-image" priority />
          <div className="briefing-poster-copy">
            <span>SELECTED AIRFRAME</span>
            <h3>{selected.name}</h3>
            <p>{selected.temperament}</p>
          </div>
        </div>

        <div className="briefing-core">
          <div className="briefing-intro">
            <div>
              <p className="section-kicker">Pilot-facing Takeaway</p>
              <h3>{selected.mission}</h3>
              <p>{selected.summary}</p>
            </div>
            <FitBadge fit={selected.firstModuleFit} />
          </div>

          <div className="tag-row">
            {selected.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>

          <div className="briefing-panels">
            <article>
              <span>飞行风格</span>
              <strong>{selected.missionStyle}</strong>
            </article>
            <article>
              <span>工作负荷</span>
              <strong>{selected.workload}</strong>
            </article>
            <article>
              <span>推荐玩家</span>
              <strong>{selected.pilot}</strong>
            </article>
            <article>
              <span>上手提示</span>
              <strong>{selected.tip}</strong>
            </article>
          </div>

          <div className="briefing-columns">
            <div className="briefing-list">
              <p>你会喜欢它的地方</p>
              <ul>
                {selected.strengths.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
            <div className="briefing-list">
              <p>你需要接受的代价</p>
              <ul>
                {selected.tradeoffs.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="briefing-stats">
          <p className="section-kicker">Airframe Profile</p>
          <StatsBlock stats={selected.stats} />
          <div className="briefing-reco">
            <span>适合这样进入它</span>
            {selected.recommendedFor.map((entry) => (
              <strong key={entry}>{entry}</strong>
            ))}
          </div>
          <a className="button-secondary source-link" href={selected.source} target="_blank" rel="noreferrer">
            查看 DCS 官方页面
          </a>
        </aside>
      </div>
    </section>
  );
}
