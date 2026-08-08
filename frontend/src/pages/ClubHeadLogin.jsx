import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHero from "../components/PageHero";

const API_BASE = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
  ? "http://localhost:5000"
  : "https://fullstack-web-mvpk.onrender.com";

function ClubHeadLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message || "Invalid club head credentials.");
        return;
      }
      localStorage.setItem("isClubHead", "true");
      localStorage.setItem("token", data.token);
      navigate("/club-head/create-event");
    } catch (error) {
      setMessage("Login failed. Check that the backend server is running.");
    }
  };

  return (
    <div>
      <PageHero
        title="Club Head Login"
        subtitle="Login to access the event creation dashboard."
      />

      <section className="mx-auto w-full max-w-xl px-4 py-16 lg:px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--card)] border border-[var(--line)] p-8 rounded-[4px]"
        >
          <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.05em] text-[var(--ink-soft)]">Username</label>
          <input
            type="text"
            value={credentials.username}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, username: e.target.value }))
            }
            className="input mb-4"
            placeholder="Enter username"
            required
          />

          <label className="mb-2 block text-[11px] font-mono uppercase tracking-[0.05em] text-[var(--ink-soft)]">Password</label>
          <input
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials((prev) => ({ ...prev, password: e.target.value }))
            }
            className="input mb-4"
            placeholder="Enter password"
            required
          />

          {message && <p className="mt-3 text-sm text-[var(--clay)]">{message}</p>}

          <button className="btn btn-solid mt-6 w-full justify-center">
            Login and Continue
          </button>

          <Link
            to="/"
            className="btn btn-outline mt-3 w-full justify-center"
          >
            Back to Home
          </Link>
        </form>
      </section>
    </div>
  );
}

export default ClubHeadLogin;
