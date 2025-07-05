import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PrivacyPolicy() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/assets/privacy.webp"
        alt="Privacy Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Gradient Overlay matching brand */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-600 opacity-90" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center text-white">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          data-aos="fade-down"
        >
          Privacy Policy
        </h1>

        {/* Summary Paragraph */}
        <p
          className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed tracking-wide mb-12"
          data-aos="fade-up"
        >
          Your privacy matters to us. QuickDeliver Lite collects only essential
          information required for smooth logistics and account management. We
          never share your data without your consent. Security and transparency
          are at the heart of our service.
        </p>

        {/* Privacy Cards */}
        <div
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4 text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Card 1 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">🔐 Data Security</h2>
            <p className="text-sm text-gray-100">
              All user data is encrypted and securely stored. We implement
              modern practices to prevent unauthorized access.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">🙈 No Data Sharing</h2>
            <p className="text-sm text-gray-100">
              We never sell or share your personal data with third parties
              without your explicit consent.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300 text-white">
            <h2 className="text-lg font-semibold mb-2">🔄 Transparent Use</h2>
            <p className="text-sm text-gray-100">
              We collect only what we need — to run services, track deliveries,
              and improve user experience transparently.
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
