import type { ReactNode } from "react";

export function AppShell(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="DCS 喷气式战斗机大赏">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64">
              <path d="M56 32 11 51l10-17L7 28l14-4L11 7l45 25Zm-30 0 8 8 9-4-10-4 10-4-9-4-8 8Z" />
            </svg>
          </div>
          <div>
            <strong>DCS 喷气式战斗机大赏</strong>
            <span>TACTICAL AIRFRAME DOSSIER</span>
          </div>
        </a>

        <nav className="site-nav" aria-label="页面导航">
          <a href="#featured">任务档案</a>
          <a href="#hangar">主机库</a>
          <a href="#guide">选机导览</a>
          <a href="#briefing">Briefing Board</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
