"use client";

import Logo from "@components/Logo";
import menu from "@config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import config from "../../config/config.json";

const Header = () => {
  const pathname = usePathname();
  const { main } = menu;
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { logo } = config.site;
  const { enable, label, link } = config.nav_button;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`header shadow-sm transition-shadow duration-300 ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <nav className="navbar container">
        {/* logo */}
        <div className="order-0 flex items-center">
          <Logo src={logo} />
        </div>

        {/* navbar toggler */}
        <button
          id="show-button"
          aria-label="Toggle Navigation"
          className="order-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border border-slate-200 bg-white/50 text-slate-700 transition hover:bg-slate-100 md:order-1 md:hidden"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? (
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <title>Menu Open</title>
              <polygon
                points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                transform="rotate(45 10 10)"
              />
            </svg>
          ) : (
            <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
              <title>Menu Close</title>
              <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
            </svg>
          )}
        </button>

        {/* Menu */}
        <div
          id="nav-menu"
          className={`order-3 w-full overflow-hidden transition-all duration-300 ease-out md:order-1 md:w-auto md:overflow-visible md:max-h-none md:opacity-100 ${
            navOpen ? "mt-4 max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
          } md:mt-0`}
        >
          <ul className="navbar-nav block w-full items-center md:flex md:w-auto md:space-x-1 lg:space-x-2">
            {main.map((menu, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menu.hasChildren ? (
                  <li className="nav-item nav-dropdown group relative">
                    <span className="nav-link inline-flex cursor-pointer items-center gap-1">
                      {menu.name}
                      <svg className="h-4 w-4 fill-current transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </span>
                    <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:top-full md:left-0 md:block md:opacity-0 md:transition-all md:duration-200 md:group-hover:visible md:group-hover:opacity-100">
                      {menu.children.map((child, i) => (
                        <li className="nav-dropdown-item" key={`children-${i}`}>
                          <Link
                            href={child.url}
                            className="nav-dropdown-link block"
                          >
                            {child.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      onClick={() => setNavOpen(false)}
                      className={`nav-link block ${
                        pathname === menu.url ? "nav-link-active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )}
              </React.Fragment>
            ))}
            {enable && (
              <li className="mt-4 pb-2 md:hidden">
                <Link
                  className="btn btn-primary w-full text-center"
                  href={link}
                  rel=""
                >
                  {label}
                </Link>
              </li>
            )}
          </ul>
        </div>
        {enable && (
          <div className="order-1 ml-auto hidden items-center justify-end md:order-2 md:ml-0 md:flex">
            <Link className="btn btn-primary py-2.5 px-6 text-sm" href={link} rel="">
              {label}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
