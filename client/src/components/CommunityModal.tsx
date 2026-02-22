// CommunityModal — fires once on first visit to homepage
// Design: NHVR Navy/Amber palette, DM Sans, warm community tone
import { useEffect, useState } from "react";
import { X, Youtube, Twitter, Facebook, ExternalLink, Zap, Users, Bell } from "lucide-react";

const STORAGE_KEY = "nhvr-community-modal-shown";

export default function CommunityModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Small delay so the page loads first, then modal appears
    const timer = setTimeout(() => {
      const alreadyShown = localStorage.getItem(STORAGE_KEY);
      if (!alreadyShown) {
        setOpen(true);
      }
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-modal-title"
        className="fixed inset-0 z-[101] flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-[oklch(0.50_0.02_250)] hover:text-[oklch(0.22_0.06_250)] transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header band */}
          <div className="bg-[oklch(0.22_0.06_250)] px-6 pt-7 pb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.72_0.17_65)] flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-[oklch(0.15_0.04_250)]" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[oklch(0.72_0.17_65)]">
                The Real Transport Toolbox
              </span>
            </div>
            <h2
              id="community-modal-title"
              className="text-xl font-bold text-white leading-snug mb-2"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Thank you for being part of making Australian transport safer, more efficient, profitable — and enjoyable.
            </h2>
            <p className="text-white/70 text-sm leading-relaxed" style={{ fontFamily: "'Lora', serif" }}>
              You've got the knowledge now… but the real power happens when you join the crew.
            </p>
          </div>

          {/* Benefits list */}
          <div className="px-6 py-5 space-y-3 border-b border-border">
            {[
              {
                icon: Bell,
                color: "oklch(0.72_0.17_65)",
                bg: "oklch(0.97_0.04_65)",
                text: "Get exclusive Intel drops straight to your inbox — tools, cheat sheets & early warnings no one else sees.",
              },
              {
                icon: Youtube,
                color: "oklch(0.50_0.22_25)",
                bg: "oklch(0.97_0.03_25)",
                text: "Never miss a video masterclass on YouTube.",
              },
              {
                icon: Users,
                color: "oklch(0.38_0.12_250)",
                bg: "oklch(0.95_0.02_250)",
                text: "Be part of the no-BS transport community that actually has your back.",
              },
            ].map(({ icon: Icon, color, bg, text }) => (
              <div key={text} className="flex items-start gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: bg }}
                >
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <p className="text-sm text-[oklch(0.28_0.04_250)] leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          {/* Primary CTA */}
          <div className="px-6 py-5 space-y-3">
            <a
              href="https://trtt.manus.space/intel"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex items-center justify-between w-full bg-[oklch(0.72_0.17_65)] hover:bg-[oklch(0.65_0.17_65)] text-[oklch(0.12_0.04_250)] font-bold px-5 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <span className="text-sm">
                👉 Grab your free Intel access here
                <span className="font-normal text-[oklch(0.25_0.05_65)] ml-2 text-xs">
                  — 12 seconds, zero spam, 100% value
                </span>
              </span>
              <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Social links row */}
            <div className="flex gap-2">
              <a
                href="https://www.youtube.com/@therealtransporttoolboxaus"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-xs font-semibold text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.97_0.03_25)] hover:border-[oklch(0.75_0.12_25)] hover:text-[oklch(0.45_0.18_25)] transition-all"
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </a>
              <a
                href="https://x.com/truckietoolbox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-xs font-semibold text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.02_250)] hover:border-[oklch(0.55_0.14_250)] hover:text-[oklch(0.28_0.10_250)] transition-all"
              >
                <Twitter className="w-4 h-4" />
                @truckietoolbox
              </a>
              <a
                href="https://www.facebook.com/therealtransporttoolbox"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                className="flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-2.5 text-xs font-semibold text-[oklch(0.40_0.03_250)] hover:bg-[oklch(0.95_0.02_250)] hover:border-[oklch(0.38_0.12_250)] hover:text-[oklch(0.28_0.10_250)] transition-all"
              >
                <Facebook className="w-4 h-4" />
                Facebook
              </a>
            </div>

            {/* Dismiss */}
            <button
              onClick={handleClose}
              className="w-full text-xs text-[oklch(0.60_0.02_250)] hover:text-[oklch(0.40_0.03_250)] transition-colors py-1"
            >
              No thanks, I'll continue the course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
