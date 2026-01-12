import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="
      sticky top-0 z-50 w-full
      border-b border-white/10
      bg-black/60
      backdrop-blur-2xl
    ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        {/* ===== BRAND ===== */}
        <NavLink
          to="/"
          className="group relative flex items-center gap-3"
        >
          {/* glow */}
          <span className="
            absolute -inset-3
            rounded-full
            bg-white/5
            opacity-0 blur-xl
            transition-opacity duration-700
            group-hover:opacity-100
          " />

          <span className="relative text-xs font-semibold uppercase tracking-[0.35em] text-white">
            Events & Artists
          </span>
        </NavLink>

        {/* ===== NAVIGATION ===== */}
        <nav className="relative flex items-center gap-10 text-sm text-white/70">
          {[
            { to: "/", label: "Home" },
            { to: "/events", label: "Events" },
            { to: "/artists", label: "Artists" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `
                group relative transition-colors duration-500
                ${isActive ? "text-white" : "hover:text-white"}
                `
              }
            >
              {({ isActive }) => (
                <>
                  {label}

                  {/* underline animé */}
                  <span
                    className={`
                      absolute -bottom-2 left-1/2 h-[1px] w-0
                      -translate-x-1/2
                      bg-white
                      transition-all duration-500
                      ${isActive ? "w-full" : "group-hover:w-full"}
                    `}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* ===== ACTION ===== */}
        <div className="hidden sm:flex items-center">
          <button
            className="
              relative overflow-hidden
              rounded-full
              border border-white/15
              px-5 py-2
              text-xs
              text-white/70
              backdrop-blur
              transition-all duration-500
              hover:border-white/40
              hover:text-white
            "
          >
            <span className="relative z-10">Admin</span>

            {/* hover glow */}
            <span className="
              absolute inset-0
              bg-white/10
              opacity-0
              transition-opacity duration-500
              hover:opacity-100
            " />
          </button>
        </div>

      </div>
    </header>
  );
}
