import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";

// TEMP pages
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />

        {/* Pages à ajouter plus tard */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
