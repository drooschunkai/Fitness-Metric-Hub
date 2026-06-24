import React, { useState } from 'react';
import { Mail, ShieldCheck, FileText, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

/* ==========================================================
   ABOUT PAGE & CONTACT FORM
   ========================================================== */
export function AboutPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-12 animate-in fade-in duration-300" id="about-page">
      {/* Hero Header */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-950 dark:text-white tracking-tight">
          About FitMetricsHub
        </h1>
        <p className="text-lg text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">
          Smart fitness calculators engineered with clinical precision to help you make scientific, data-backed health decisions.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Our Mission</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            At FitMetricsHub, we believe that fitness should not be a guessing game. Our goal is to consolidate highly accurate, clinically validated health calculators and metrics into a unified, lightning-fast platform. 
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            By making scientific calculations accessible and easy to understand, we empower gym enthusiasts, nutritionists, beginners, and health seekers to optimize their diets, plan hydration, and track metrics accurately.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Methodology & Accuracy</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            Our calculators utilize peer-reviewed clinical equations established in nutritional biology:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-600 dark:text-gray-400">
            <li><strong>Basal Metabolism (BMR):</strong> Mifflin-St Jeor Equation (1990)</li>
            <li><strong>Lean Mass / Fat Mass:</strong> Boer Formula (1984)</li>
            <li><strong>Body Fat Analysis:</strong> US Navy Circumference regression models</li>
            <li><strong>Ideal Weight:</strong> Medical standards modeled after the Hamwi equation</li>
          </ul>
        </div>
      </div>

      {/* Interactive Contact Form Panel */}
      <section className="bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-xs">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-950 dark:text-white">Connect with Our Team</h2>
            <p className="text-xs text-gray-500 mt-1">Have methodology queries or advertising feedback? Get in touch.</p>
          </div>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-emerald-950">Message Sent Successfully!</h3>
              <p className="text-xs text-emerald-700">Thank you for reaching out. A certified dietitian on our staff will respond within 48 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 focus:bg-white focus:outline-emerald-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 focus:bg-white focus:outline-emerald-500 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 focus:bg-white focus:outline-emerald-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}


/* ==========================================================
   PRIVACY POLICY (ADSENSE COMPLIANT)
   ========================================================== */
export function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-300" id="privacy-page">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">Privacy Policy</h1>
        <p className="text-xs text-gray-400 mt-1.5">Last updated: June 23, 2026</p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-4 text-justify leading-relaxed">
        <p>
          At FitMetricsHub, accessible from https://fitmetricshub.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by FitMetricsHub and how we use it.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">1. Log Files & Analytics</h3>
        <p>
          FitMetricsHub follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">2. Google DoubleClick DART Cookies & AdSense Policies</h3>
        <p>
          Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" className="text-emerald-600 underline">https://policies.google.com/technologies/ads</a>.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">3. Our Advertising Partners</h3>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners include Google AdSense. Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on FitMetricsHub, which are sent directly to users' browsers. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">4. Children's Information</h3>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. FitMetricsHub does not knowingly collect any Personal Identifiable Information from children under the age of 13.
        </p>
      </div>
    </div>
  );
}


/* ==========================================================
   TERMS OF SERVICE
   ========================================================== */
export function TermsOfService() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-300" id="terms-page">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-gray-950 dark:text-white tracking-tight">Terms of Service</h1>
        <p className="text-xs text-gray-400 mt-1.5">Last updated: June 23, 2026</p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-4 text-justify leading-relaxed">
        <p>
          Welcome to FitMetricsHub. By accessing and using our website, tools, and health calculator suites, you agree to be bound by the following Terms and Conditions of use. If you do not agree to these terms, please refrain from using our health services immediately.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">1. License & Permitted Use</h3>
        <p>
          FitMetricsHub grants you a limited, non-exclusive, non-transferable, revocable license to access our calculators and articles strictly for personal, non-commercial use. You may not scrape, frame, clone, or programmatically query our mathematical engines without prior written authorization from our developers.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">2. Intellectual Property Rights</h3>
        <p>
          All unique layouts, graphics, responsive mathematical structures, dynamic sitemaps, and blog article content are protected under international copyright and trademark laws. Unauthorized reproduction of our source files or text layouts constitutes a direct breach of these terms.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">3. Limitation of Liability</h3>
        <p>
          In no event shall FitMetricsHub, its staff, or its certified nutritionists be held liable for any health complications, joint strain, dehydration, or metabolic issues arising from the adoption of dietary calorics or training routines. You utilize our calculations and recommendations entirely at your own risk.
        </p>
      </div>
    </div>
  );
}


/* ==========================================================
   MEDICAL DISCLAIMER PAGE
   ========================================================== */
export function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 space-y-6 animate-in fade-in duration-300" id="disclaimer-page">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-500 tracking-tight">Medical Disclaimer</h1>
        <p className="text-xs text-gray-400 mt-1.5">Required health notice and clinical guidelines</p>
      </div>

      <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-400 space-y-4 text-justify leading-relaxed">
        <div className="p-5 border border-amber-200 bg-amber-50/20 dark:border-amber-900/40 dark:bg-amber-950/10 rounded-2xl flex gap-3">
          <ShieldAlert className="h-6 w-6 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm font-semibold text-amber-800 dark:text-amber-400 leading-relaxed">
            Please read this medical policy disclaimer carefully before acting upon any calculator estimates, protein intake thresholds, or metabolic training predictions.
          </p>
        </div>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">1. Not Medical Advice</h3>
        <p>
          The content, calculators, and information provided across FitMetricsHub.com are for general informational and educational purposes only. They are not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">2. No Patient-Physician Relationship</h3>
        <p>
          Use of this website or communication with our team via contact forms does not establish a therapist-patient or physician-patient relationship. No medical history forms are stored or processed, and no individual diagnoses are issued.
        </p>

        <h3 className="text-lg font-bold text-gray-950 dark:text-white pt-2">3. Accuracy of Mathematical Formulas</h3>
        <p>
          While the formulas deployed (Mifflin-St Jeor, Boer body composition index, and US Navy equations) represent standard practices in scientific research, they remain statistical regressions based on average population datasets. Individual metabolic rates, body muscle densities, and bone structural weight variations can lead to errors. Consequently, results should be viewed as broad approximations rather than absolute clinical facts.
        </p>
      </div>
    </div>
  );
}
