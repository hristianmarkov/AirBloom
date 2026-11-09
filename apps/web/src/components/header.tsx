"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { BrandMark } from "./icons";
import { JoinButton } from "./waitlist";
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/" aria-label="Sinus Companion home">
          <BrandMark />
          <span>
            sinus<span className="brand-light">companion</span>
          </span>
        </Link>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          aria-label="Main navigation"
        >
          <Link onClick={() => setOpen(false)} href="/#how-it-works">
            How it works
          </Link>
          <Link onClick={() => setOpen(false)} href="/#features">
            The app
          </Link>
          <Link onClick={() => setOpen(false)} href="/journal">
            The journal
          </Link>
          <Link onClick={() => setOpen(false)} href="/#questions">
            FAQs
          </Link>
        </nav>
        <JoinButton className="button nav-cta">
          Join the waitlist <ArrowUpRight size={17} />
        </JoinButton>
        <button
          className="icon-button mobile-menu"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
