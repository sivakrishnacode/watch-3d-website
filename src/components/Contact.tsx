"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.phone || !formState.interest) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="relative z-20 bg-[#020812] py-24 md:py-32 px-6 md:px-12 border-t border-cold overflow-hidden">
      {/* Background glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-electric-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-ui text-[10px] md:text-xs tracking-[0.4em] text-ice-400 uppercase font-light mb-3">
            ACQUISITION
          </span>
          <h2 className="font-display text-4xl md:text-6xl tracking-[0.1em] text-white font-light uppercase mb-6">
            ENQUIRE
          </h2>
          <div className="h-[1px] w-16 bg-electric-500/50 mb-6" />
          <p className="font-ui text-sm text-silver-400 max-w-md font-light leading-relaxed">
            Submit your details below. A dedicated brand representative will reach out within 24 hours to discuss options and availability.
          </p>
        </div>

        {/* Contact Form Content */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-8 md:space-y-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                {/* Name */}
                <div className="flex flex-col">
                  <label htmlFor="name" className="font-ui text-[9px] tracking-[0.2em] text-silver-400 uppercase font-light mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR FULL NAME"
                    className="bg-transparent border-b border-white/10 py-3 px-1 text-white font-ui font-light focus:outline-none focus:border-electric-500 transition-all duration-300 w-full placeholder:text-white/10 text-xs tracking-widest"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col">
                  <label htmlFor="phone" className="font-ui text-[9px] tracking-[0.2em] text-silver-400 uppercase font-light mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formState.phone}
                    onChange={handleInputChange}
                    placeholder="ENTER YOUR PHONE NUMBER"
                    className="bg-transparent border-b border-white/10 py-3 px-1 text-white font-ui font-light focus:outline-none focus:border-electric-500 transition-all duration-300 w-full placeholder:text-white/10 text-xs tracking-widest"
                  />
                </div>
              </div>

              {/* Watch Interest Select */}
              <div className="flex flex-col">
                <label htmlFor="interest" className="font-ui text-[9px] tracking-[0.2em] text-silver-400 uppercase font-light mb-1">
                  Watch of Interest *
                </label>
                <div className="relative">
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formState.interest}
                    onChange={handleInputChange}
                    className="bg-[#020812] border-b border-white/10 py-3 px-1 text-white font-ui font-light focus:outline-none focus:border-electric-500 transition-all duration-300 w-full appearance-none text-xs tracking-widest uppercase cursor-pointer"
                  >
                    <option value="" disabled className="text-white/10">
                      SELECT WATCH OF INTEREST
                    </option>
                    <option value="aether-blue" className="bg-[#020812] text-white">
                      Aether Blue // $6,400
                    </option>
                    <option value="nadir-chrono" className="bg-[#020812] text-white">
                      Nadir Chrono // $8,200
                    </option>
                    <option value="chronos-navy" className="bg-[#020812] text-white">
                      Chronos Navy // $4,800
                    </option>
                    <option value="other" className="bg-[#020812] text-white">
                      Bespoke Consulting Inquiry
                    </option>
                  </select>
                  {/* Select indicator arrow */}
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-white/40 text-[9px] tracking-widest font-light">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col">
                <label htmlFor="message" className="font-ui text-[9px] tracking-[0.2em] text-silver-400 uppercase font-light mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  placeholder="ADD ANY SPECIFIC INQUIRIES OR CUSTOM REQUESTS"
                  className="bg-transparent border-b border-white/10 py-3 px-1 text-white font-ui font-light focus:outline-none focus:border-electric-500 transition-all duration-300 w-full resize-none h-24 placeholder:text-white/10 text-xs tracking-widest leading-relaxed"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="relative group w-full md:w-auto px-12 py-4 border border-electric-500 bg-transparent text-white font-ui text-[10px] tracking-[0.3em] font-light uppercase hover:bg-electric-500 hover:shadow-blue-glow transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "TRANSMITTING..." : "SUBMIT ENQUIRY"}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center text-center py-10"
            >
              <div className="w-12 h-12 rounded-full border border-electric-500 flex items-center justify-center mb-6 shadow-blue-glow">
                <div className="w-1.5 h-1.5 rounded-full bg-ice-400" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl text-white font-light uppercase mb-4">
                TRANSMISSION RECEIVED
              </h3>
              <p className="font-ui text-sm text-silver-400 max-w-sm font-light leading-relaxed mb-8">
                Thank you, <span className="text-white font-medium">{formState.name}</span>. Your enquiry has been registered in our Swiss logs. An advisor will contact you shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormState({ name: "", phone: "", interest: "", message: "" });
                }}
                className="font-ui text-[9px] tracking-[0.2em] text-ice-400 uppercase font-light hover:text-white transition-colors duration-300 underline underline-offset-4"
              >
                SUBMIT ANOTHER INQUIRY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
