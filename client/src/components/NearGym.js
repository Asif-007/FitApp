import { useState } from "react";

export default function NearGym() {
  const [city, setCity] = useState("Hyderabad");
  const [search, setSearch] = useState("Hyderabad");

  function handleSearch(e) {
    e.preventDefault();
    setSearch(city);
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold bg-gray-200 p-2 mt-4 mb-6">
        Find Nearest Gym
      </h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6 max-w-lg">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter your city or area..."
          className="p-3 rounded-lg border border-gray-300 outline-none w-full text-black"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition"
        >
          Search
        </button>
      </form>

      {/* Google Maps Embed */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        <iframe
          title="Nearest Gyms"
          width="100%"
          height="500"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={`https://maps.google.com/maps?q=gyms+near+${encodeURIComponent(search)}&output=embed`}
        />
      </div>

      {/* Tip */}
      <p className="text-gray-500 mt-4 text-sm">
        Showing gyms near <strong>{search}</strong>. Enter your area for more accurate results.
      </p>
    </div>
  );
}