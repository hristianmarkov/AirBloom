"use client";
import { useRef, useState } from "react";
export function RemovalForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const id = useRef("");
  return (
    <form
      className="removal-form"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);
        setMessage("");
        const email = new FormData(e.currentTarget).get("email");
        if (!id.current) id.current = crypto.randomUUID();
        try {
          const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              action: "removal-request",
              requestId: id.current,
            }),
          });
          const result = await response.json();
          if (!response.ok) throw new Error(result.error);
          setMessage(
            result.demo
              ? "This is a demo: collection is not connected and no request was saved."
              : "Your removal request was recorded. The waitlist administrator will process it within 30 days.",
          );
        } catch (err) {
          setMessage(
            err instanceof Error ? err.message : "Please try again later.",
          );
        } finally {
          setPending(false);
        }
      }}
    >
      <label htmlFor="removal-email">
        The email address you signed up with
      </label>
      <input
        id="removal-email"
        name="email"
        type="email"
        required
        maxLength={254}
        placeholder="you@example.com"
      />
      <button className="button primary" disabled={pending}>
        {pending ? "Sending…" : "Request removal from the waitlist"}
      </button>
      <p role="status">{message}</p>
    </form>
  );
}
