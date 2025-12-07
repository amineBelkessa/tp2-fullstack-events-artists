import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";

// Pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

// Features
import { EventsListPage, EventDetailPage } from "../features/events";
import { ArtistsListPage } from "../features/artist";

export default function AppRouter() {
  return (
    <Routes>
      {/* HOME */}
      <Route path={ROUTES.HOME} element={<HomePage />} />

      {/* EVENTS */}
      <Route path={ROUTES.EVENTS} element={<EventsListPage />} />
      <Route path={ROUTES.EVENT_DETAIL} element={<EventDetailPage />} />

      {/* ARTISTS */}
      <Route path={ROUTES.ARTISTS} element={<ArtistsListPage />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
