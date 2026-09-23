"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight, Search, Sparkles } from "lucide-react";
import { allSkills, type SkillCategory, type SkillItem } from "@/lib/skillsData";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import SkillsMarquee from "./SkillsMarquee";

const CATEGORIES: ("All" | SkillCategory)[] = [
  "All",
  "Languages",
  "Backend",
  "Frontend",
  "Databases",
  "Tools",
];

export default function SkillsDirectory() {
  const [activeCategory, setActiveCategory] = useState<"All" | SkillCategory>("All");
  const [search, setSearch] = useState("");

  const filteredSkills = useMemo(() => {
    return allSkills.filter((s) => {
      const matchesCategory = activeCategory === "All" || s.category === activeCategory;
      const matchesSearch =
        s.label.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.category.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-7">
        <Reveal>
          <SectionHeading title="Skills & Technologies" />
          <p className="text-center text-muted text-[0.95rem] max-w-2xl mx-auto -mt-10 mb-10 leading-relaxed">
            Arahkan kursor ke masing-masing logo untuk melihat warna khas resminya, dan klik logo atau kartu untuk mengunjungi dokumentasi resmi bahasa/teknologi tersebut.
          </p>
        </Reveal>

        {/* Filter and Search Bar */}
        <Reveal delay={0.08}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-bg-raised border border-hairline/80">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-[0.82rem] font-medium transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-accent text-white shadow-xs"
                      : "text-muted hover:text-ink hover:bg-bg/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-64">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              />
              <input
                type="text"
                placeholder="Cari pemrograman / tools..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-bg-raised border border-hairline text-sm text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>
        </Reveal>

        {/* Interactive Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4.5 mb-20">
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <Reveal key={skill.name} delay={(index % 4) * 0.05}>
                <a
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Buka website resmi ${skill.label}`}
                  title={`Kunjungi website resmi ${skill.label} (${skill.url})`}
                  className="skill-item group relative flex flex-col justify-between p-5 rounded-2xl border border-hairline bg-bg-raised/40 hover:bg-bg-raised transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl cursor-pointer h-full"
                  style={{
                    ["--brand-color" as string]: skill.color,
                    ["--brand-bg" as string]: `${skill.color}18`,
                    ["--brand-border" as string]: `${skill.color}50`,
                    ["--brand-glow" as string]: `${skill.color}40`,
                  }}
                >
                  {/* Top Bar with Icon, Category & External Link */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="skill-icon-box w-13 h-13 rounded-xl flex items-center justify-center border border-hairline bg-bg transition-all duration-300">
                        <Icon size={28} className="skill-icon text-muted" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.7rem] px-2.5 py-0.5 rounded-full bg-bg border border-hairline text-muted">
                          {skill.category}
                        </span>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-bg/80 text-muted opacity-40 group-hover:opacity-100 group-hover:text-[var(--brand-color)] transition-all">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Skill Info */}
                    <h3 className="skill-label font-display font-semibold text-[1.05rem] text-ink mb-1.5 transition-colors">
                      {skill.label}
                    </h3>
                    <p className="text-muted text-[0.84rem] leading-relaxed line-clamp-2">
                      {skill.description}
                    </p>
                  </div>

                  {/* Bottom Action Note */}
                  <div className="mt-4 pt-3 border-t border-hairline/60 flex items-center justify-between text-[0.75rem] font-mono text-muted group-hover:text-ink transition-colors">
                    <span className="flex items-center gap-1.5">
                      <Sparkles size={12} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <span>Buka Dokumentasi</span>
                    </span>
                    <span className="text-[0.7rem] opacity-60 group-hover:opacity-100 truncate max-w-[130px]">
                      {new URL(skill.url).hostname}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        {/* Live Marquee Showcase */}
        <Reveal delay={0.1}>
          <div className="pt-10 border-t border-hairline">
            <h3 className="text-center font-display font-medium text-lg text-ink mb-6">
              Continuous Flow
            </h3>
            <SkillsMarquee />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
