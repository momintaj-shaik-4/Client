import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Contact() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <main className="relative w-full min-h-screen overflow-hidden font-sans">
      {/* Background Image */}
      <img
        src="/assets/Contact.webp"
        alt="Contact Support Background"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
      />

      {/* Brand Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-800 to-pink-600 opacity-90" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center text-white">
        {/* Title */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]"
          data-aos="fade-down"
        >
          Contact Us
        </h1>

        {/* Description */}
        <p
          className="max-w-2xl text-sm sm:text-base md:text-lg text-gray-100 mb-12 leading-relaxed tracking-wide"
          data-aos="fade-up"
        >
          Got questions or feedback? We’re here to support your QuickDeliver Lite
          experience — reach out anytime.
        </p>

        {/* Contact Cards */}
        <div
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full px-4 text-left"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {/* Email Card */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md text-white hover:scale-[1.02] transition duration-300">
            <h2 className="text-lg font-semibold mb-2">📧 Email Us</h2>
            <p className="text-sm text-gray-100 break-all">
              support@quickdeliverlite.com
            </p>
          </div>

          {/* Phone Card */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md text-white hover:scale-[1.02] transition duration-300">
            <h2 className="text-lg font-semibold mb-2">📞 Call Us</h2>
            <p className="text-sm text-gray-100">+91 98765 43210</p>
          </div>

          {/* Location Card */}
          <div className="bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl backdrop-blur-md text-white hover:scale-[1.02] transition duration-300">
            <h2 className="text-lg font-semibold mb-2">📍 Visit Us</h2>
            <p className="text-sm text-gray-100">Hyderabad, India</p>
          </div>
        </div>

        {/* CTA Button */}
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
