import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Licensing() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/assets/Licensing.jpg"
        alt="Licensing Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-600 opacity-90" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center text-white">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          data-aos="fade-down"
        >
          Licensing Information
        </h1>

        {/* Description */}
        <p
          className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed tracking-wide mb-12"
          data-aos="fade-up"
        >
          QuickDeliver Lite is a non-commercial educational project created during
          an internship program. All content and code are used for learning
          purposes only. Please do not use or distribute for commercial purposes
          without prior permission.
        </p>

        {/* Licensing Ideas Section */}
        <div
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4 text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Card 1 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">👩‍🎓 Educational Use Only</h2>
            <p className="text-sm text-gray-100">
              This project was built solely for academic learning and is not intended for public or business deployment.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">📄 Code Reuse Policy</h2>
            <p className="text-sm text-gray-100">
              You may reference the code for educational inspiration, but reusing or publishing it without attribution is discouraged.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">❌ No Commercial Rights</h2>
            <p className="text-sm text-gray-100">
              This project cannot be used for commercial purposes or redistributed as a product or service.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12" data-aos="zoom-in" data-aos-delay="300">
          <a
            href="/"
            className="inline-block bg-pink-600 hover:bg-pink-700 active:scale-95 transition duration-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            🔙 Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
