"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ArrowRight, Check, LoaderCircle, Mail, X } from "lucide-react";
import { AppleIcon, BrandMark, PlayIcon } from "./icons";

type Platform = "ios" | "android" | "both";
const WaitlistContext = createContext<(platform?: Platform) => void>(() => {});

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<Platform>("both");
  const [state, setState] = useState<
    "idle" | "sending" | "success" | "demo" | "error"
  >("idle");
  const [error, setError] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const requestId = useRef("");
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else {
      dialog.current?.close();
      document.body.style.overflow = "";
      trigger.current?.focus();
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  const close = () => {
    if (state !== "sending") setOpen(false);
  };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fields = new FormData(e.currentTarget);
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: fields.get("email"),
          platform,
          consent: fields.get("consent") === "on",
          website: fields.get("website"),
          requestId: requestId.current,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "We couldn’t save your email. Please try again.",
        );
      setState(data.demo ? "demo" : "success");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setState("error");
    }
  }
  return (
    <WaitlistContext.Provider
      value={(p = "both") => {
        trigger.current = document.activeElement as HTMLElement;
        requestId.current = crypto.randomUUID();
        setPlatform(p);
        setState("idle");
        setError("");
        setOpen(true);
      }}
    >
      {children}
      <dialog
        ref={dialog}
        className="waitlist-dialog"
        aria-labelledby="waitlist-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialog.current) close();
        }}
      >
        <div className="dialog-content">
          <button
            className="icon-button dialog-close"
            onClick={close}
            disabled={state === "sending"}
            aria-label="Close waitlist"
          >
            <X size={20} />
          </button>
          <div className="dialog-icon">
            {state === "success" || state === "demo" ? (
              <Check />
            ) : (
              <BrandMark />
            )}
          </div>
          {state === "success" || state === "demo" ? (
            <>
              <span className="eyebrow">
                {state === "demo" ? "DEMO COMPLETE" : "YOU’RE ON THE LIST"}
              </span>
              <h2 id="waitlist-title">
                {state === "demo"
                  ? "A preview of what’s next."
                  : "Here’s to clearer days."}
              </h2>
              <p>
                {state === "demo"
                  ? "You’ve tried the beta signup. Email collection isn’t connected yet, so your address was not saved. Come back once the waitlist opens."
                  : "Your email has been saved. We’ll be in touch when a place in the closed beta is available for your device."}
              </p>
              <button className="button primary full" onClick={close}>
                Lovely, thank you <Check size={17} />
              </button>
            </>
          ) : (
            <>
              <span className="eyebrow">HELP SHAPE SINUS COMPANION</span>
              <h2 id="waitlist-title">
                Less remembering.
                <br />
                <em>More understanding.</em>
              </h2>
              <p>
                Join the closed-beta waitlist for simpler symptom tracking, personal patterns, and better visit preparation. We’ll email you when testing opens for your device.
              </p>
              <form onSubmit={submit}>
                <label htmlFor="waitlist-email">Email address</label>
                <div className="input-wrap">
                  <Mail size={18} />
                  <input
                    id="waitlist-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    autoFocus
                  />
                </div>
                <label htmlFor="waitlist-platform">I’ll use it on</label>
                <select
                  id="waitlist-platform"
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as Platform)}
                >
                  <option value="ios">iPhone / iOS</option>
                  <option value="android">Android</option>
                  <option value="both">Both / not sure yet</option>
                </select>
                <div className="honeypot" aria-hidden="true">
                  <label>
                    Website
                    <input
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ caretColor: "transparent" }}
                    />
                  </label>
                </div>
                <label className="consent">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    style={{ caretColor: "transparent" }}
                  />
                  <span>
                    Email me about beta access. I’ve read the{" "}
                    <a href="/privacy" target="_blank" rel="noreferrer">
                      privacy notice
                    </a>
                    .
                  </span>
                </label>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="button primary full"
                  disabled={state === "sending"}
                  type="submit"
                >
                  {state === "sending" ? (
                    <>
                      Saving your place{" "}
                      <LoaderCircle className="spin" size={18} />
                    </>
                  ) : (
                    <>
                      Join the waitlist <ArrowRight size={18} />
                    </>
                  )}
                </button>
                <p className="form-note">
                  A quieter inbox. Only news about your beta access.
                </p>
              </form>
            </>
          )}
        </div>
      </dialog>
    </WaitlistContext.Provider>
  );
}

export function JoinButton({
  children = "Get early access",
  className = "button primary",
  platform = "both",
}: {
  children?: ReactNode;
  className?: string;
  platform?: Platform;
}) {
  const open = useContext(WaitlistContext);
  return (
    <button className={className} onClick={() => open(platform)}>
      {children}
    </button>
  );
}

export function StoreButtons({ light = false }: { light?: boolean }) {
  const open = useContext(WaitlistContext);
  return (
    <div className={`store-buttons ${light ? "light" : ""}`}>
      <button
        className="store-button"
        onClick={() => open("ios")}
        aria-label="App Store — join the iOS closed-beta waitlist"
      >
        <AppleIcon />
        <span>
          <small>Join the iOS beta</small>
          <strong>App Store</strong>
        </span>
      </button>
      <button
        className="store-button"
        onClick={() => open("android")}
        aria-label="Google Play — join the Android closed-beta waitlist"
      >
        <PlayIcon />
        <span>
          <small>Join the Android beta</small>
          <strong>Google Play</strong>
        </span>
      </button>
    </div>
  );
}
