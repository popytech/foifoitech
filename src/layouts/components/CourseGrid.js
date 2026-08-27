"use client";

import { useState } from "react";

import Icon from "@layouts/components/Icon";
import Reveal from "@layouts/components/Reveal";
import Link from "next/link";

const ALL = "Toutes";

const CourseGrid = ({ courses }) => {
  const categories = [ALL, ...new Set(courses.map((c) => c.category))];
  const [active, setActive] = useState(ALL);

  const visible =
    active === ALL ? courses : courses.filter((c) => c.category === active);

  return (
    <div>
      {/* Filtres */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 sm:text-sm ${
              active === cat
                ? "border-primary bg-primary text-white shadow-md shadow-primary/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((course, i) => (
          <Reveal
            as="div"
            key={course.name}
            delay={i * 60}
            direction="scale"
            className="h-full"
          >
            <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex h-36 items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                <Icon name={course.icon} className="h-14 w-14 text-primary/40" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="ft-badge mb-3 w-fit text-[0.7rem]">
                  {course.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {course.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {course.detail}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs font-bold tracking-wide text-slate-500 uppercase">
                    Sur devis
                  </span>
                  <Link
                    href={`/contact?sujet=${encodeURIComponent("Formation Professionnelle")}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-all hover:gap-2.5"
                  >
                    Discuter
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
