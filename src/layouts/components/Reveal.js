"use client";

import { useEffect, useRef, useState } from "react";

const DIRECTION_CLASS = {
  up: "reveal",
  left: "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
};

// Fait apparaître son contenu (fondu + léger déplacement) quand il entre
// dans le viewport. Composant client minimal, sans dépendance externe.
const Reveal = ({
  children,
  as: Tag = "div",
  direction = "up",
  delay = 0,
  once = true,
  className = "",
  ...rest
}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const directionClass = DIRECTION_CLASS[direction] || DIRECTION_CLASS.up;

  return (
    <Tag
      ref={ref}
      className={`${directionClass} ${visible ? "is-visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
