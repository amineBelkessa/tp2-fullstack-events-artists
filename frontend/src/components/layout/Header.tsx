import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-gray-900 text-white py-4 px-6 shadow mb-6">
      <div className="flex items-center justify-between">

        <h1 className="text-xl font-semibold">
          🎵 Events & Artists Manager
        </h1>

        <nav className="flex gap-4">
          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/events" className="hover:text-blue-300">Events</Link>
          <Link to="/artists" className="hover:text-blue-300">Artists</Link>
        </nav>
      </div>
    </header>
  );
}
