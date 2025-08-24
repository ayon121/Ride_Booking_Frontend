
import { useEffect, useState } from "react";

const RiderLiveLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [shareUrl, setShareUrl] = useState<string>("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lng: longitude });
          setShareUrl(`https://www.google.com/maps?q=${latitude},${longitude}`);
        },
        (err) => {
          console.error("Error fetching location:", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 5000,
          timeout: 10000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  return (
    <div className="p-6 rounded-2xl shadow-lg bg-muted max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-orange-600 mb-4">
        Rider Live Location
      </h1>

      {!location ? (
        <p className="text-gray-500">Fetching location...</p>
      ) : (
        <div>
          <p className="text-foreground mb-2">
            <span className="font-semibold">Latitude:</span> {location.lat}
            <br />
            <span className="font-semibold">Longitude:</span> {location.lng}
          </p>

          <a
            href={shareUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-4 px-4 py-2 bg-orange-600 text-white text-center rounded-xl shadow hover:bg-orange-700 transition"
          >
            View on Google Maps
          </a>

          <button
            onClick={() => navigator.clipboard.writeText(shareUrl)}
            className="mt-3 w-full px-4 py-2 bg-muted text-orange-700 border border-orange-300 rounded-xl hover:bg-orange-100"
          >
            Copy Share Link
          </button>
        </div>
      )}
    </div>
  );
};

export default RiderLiveLocation;
