import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

/* ===== EVENTS ===== */
import EventsListPage from "../features/events/EventsListPage";
import EventDetailPage from "../features/events/EventDetailPage";
import EventCreatePage from "../features/events/EventCreatePage";
import EventEditPage from "../features/events/EventEditPage";

/* ===== ARTISTS ===== */
import ArtistListPage from "../features/artist/ArtistsListPage";
import ArtistDetailPage from "../features/artist/ArtistDetailPage";
import ArtistCreatePage from "../features/artist/ArtistCreatePage";
import ArtistEditPage from "../features/artist/ArtistEditPage";

export default function AppRouter() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
        }}
        exit={{
          opacity: 0,
          y: -18,
          scale: 1.02,
          transition: { duration: 0.4, ease: [0.4, 0, 1, 1] },
        }}
        className="pt-4 pb-16"
      >
        <Routes location={location}>

          {/* ===== HOME ===== */}
          <Route path="/" element={<HomePage />} />

          {/* ===== EVENTS ===== */}
          <Route path="/events" element={<EventsListPage />} />
          <Route path="/events/create" element={<EventCreatePage />} />
          <Route path="/events/:id/edit" element={<EventEditPage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          {/* ===== ARTISTS ✅ ===== */}
          <Route path="/artists" element={<ArtistListPage />} />
          <Route path="/artists/create" element={<ArtistCreatePage />} />
          <Route path="/artists/:id/edit" element={<ArtistEditPage />} />
          <Route path="/artists/:id" element={<ArtistDetailPage />} />

          {/* ===== FALLBACK ===== */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}
