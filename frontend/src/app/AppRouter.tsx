import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";

// Pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import { EventsListPage } from "../features/events";
import { ArtistsListPage } from "../features/artist";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME */}
        <Route path={ROUTES.HOME} element={<HomePage />} />

        {/* EVENTS */}
        <Route path={ROUTES.EVENTS} element={<EventsListPage />} />

        {/* ARTISTS */}
        <Route path={ROUTES.ARTISTS} element={<ArtistsListPage />} />

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
