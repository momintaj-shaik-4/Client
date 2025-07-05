import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Background Image with reduced opacity */}
      <img
        src="/assets/About.jpg"
        alt="Delivery Service Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Gradient Overlay matching navbar */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-600 opacity-90" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-white text-center">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          data-aos="fade-down"
        >
          About QuickDeliver Lite
        </h1>

        {/* Description */}
        <p
          className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-100 mb-10 leading-relaxed tracking-wide"
          data-aos="fade-up"
        >
          QuickDeliver Lite is a real-time logistics and delivery tracking system
          designed with React and Tailwind CSS. It enables customers and drivers
          to interact securely through a seamless, role-based interface.
        </p>

        {/* Feature Cards */}
        <div
          className="grid md:grid-cols-2 gap-8 text-left max-w-5xl w-full text-sm text-gray-100"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Card 1 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300">
            <h2 className="text-white font-semibold mb-2">🚚 What We Do</h2>
            <p>
              We simplify logistics by allowing customers to create requests and
              drivers to fulfill them in real-time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300">
            <h2 className="text-white font-semibold mb-2">🎯 Our Mission</h2>
            <p>
              To offer secure, fast, and intuitive logistics service through a
              scalable, tech-first approach.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300">
            <h2 className="text-white font-semibold mb-2">🔐 Why Choose Us</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Live tracking with role-based access</li>
              <li>Secure login & session management</li>
              <li>Responsive, user-friendly UI</li>
            </ul>
          </div>

          {/* Card 4 */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md hover:scale-[1.02] transition duration-300">
            <h2 className="text-white font-semibold mb-2">⚙️ How It Works</h2>
            <p>
              Register → Post or Accept Delivery → Track → Mark Complete →
              Feedback
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 text-center" data-aos="zoom-in" data-aos-delay="300">
          <a
            href="/contact"
            className="inline-block bg-pink-600 hover:bg-pink-700 active:scale-95 transition duration-300 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            📬 Get in Touch
          </a>
        </div>
      </div>
    </main>
  );
}
