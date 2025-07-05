import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    src: "https://cdn.pixabay.com/photo/2023/02/18/16/02/bicycle-7798227_1280.jpg",
    headline: "Fast & Reliable Delivery for Everyone",
  },
  {
    src: "https://cdn.pixabay.com/photo/2018/05/15/09/01/foodora-3402507_1280.jpg",
    headline: "Track Your Packages in Real Time",
  },
  {
    src: "https://cdn.pixabay.com/photo/2022/01/08/19/46/delivery-6924735_1280.jpg",
    headline: "Join as a Customer or Driver Today",
  },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-full h-screen bg-black text-white overflow-hidden relative font-sans">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.src}
            alt={`Slide showing ${slide.headline}`}
            className="w-full h-full object-cover"
            draggable="false"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70 flex flex-col justify-between px-4 py-6">
            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Headline & Button */}
            <div className="text-center mb-6 drop-shadow-lg">
              <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
                {slide.headline}
              </h2>
              <Link to="/register">
                <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-full text-white text-base shadow-md hover:shadow-lg transition-transform active:scale-95">
                  Get Started
                </button>
              </Link>
            </div>

            {/* How it Works Section (Cards) */}
            <div className="mb-[5vh] flex flex-col items-center animate-fadeInUp">
              <h3 className="text-lg md:text-xl font-semibold mb-4 text-center">
                How QuickDeliver Lite Works
              </h3>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-4xl px-4">
                {/* Card 1 */}
                <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 w-48 md:w-60 text-center shadow-md hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">📝</div>
                  <h4 className="font-semibold mb-1">Register</h4>
                  <p className="text-sm text-gray-300">Create an account to get started.</p>
                </div>
                {/* Card 2 */}
                <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 w-48 md:w-60 text-center shadow-md hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">📦</div>
                  <h4 className="font-semibold mb-1">Request Delivery</h4>
                  <p className="text-sm text-gray-300">Easily place and manage orders.</p>
                </div>
                {/* Card 3 */}
                <div className="bg-gray-800 bg-opacity-90 rounded-lg p-4 w-48 md:w-60 text-center shadow-md hover:scale-105 transition-transform">
                  <div className="text-2xl mb-2">🚚</div>
                  <h4 className="font-semibold mb-1">Track in Real-Time</h4>
                  <p className="text-sm text-gray-300">Follow your package live.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
