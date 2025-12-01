import axios from "axios";

// Base URL du backend (JAR Spring)
const API_BASE_URL = "http://localhost:8080"; // tu peux changer si besoin

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Interceptor Request ---
apiClient.interceptors.request.use(
  (config) => {
    console.log("[API REQUEST]", config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("[API REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// --- Interceptor Response ---
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;

    console.error("[API ERROR]", status, error.response?.data);

    switch (status) {
      case 400:
        error.message = "Requête invalide (400). Vérifie les champs envoyés.";
        break;
      case 401:
        error.message = "Tu n’es pas autorisé (401).";
        break;
      case 404:
        error.message = "Ressource introuvable (404).";
        break;
      case 500:
        error.message = "Erreur serveur (500). Réessaie plus tard.";
        break;
      default:
        error.message = "Erreur inconnue lors de l'appel API.";
    }

    return Promise.reject(error);
  }
);
