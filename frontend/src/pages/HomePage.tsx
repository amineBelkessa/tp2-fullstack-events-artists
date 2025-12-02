import { apiClient } from "../lib/api/apiClient";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    apiClient.get("/events?page=0&size=5")
      .then(res => console.log("EVENTS OK", res.data))
      .catch(err => console.error("EVENTS ERROR", err.message));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Welcome to Events & Artists Manager 🎵</h2>
    </div>
  );
}
