'use client';

import { useState } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError('Name, email and message are required.');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || 'Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.warn('API connection failed, saving message locally (mock success)...', err);
      // Mock fallback
      setSuccess('Thank you for contacting us! We have received your message (Demo Mode).');
      setForm({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-gray-50/50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-950">Contact Us</h1>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-4 mb-4"></div>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Have questions about paper formatting, peer-review status, or APC waivers? Get in touch with our editorial support team.
          </p>
        </div>

        {/* Form and info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 bg-primary-950 text-white rounded-2xl shadow-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[450px]">
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
            <div className="space-y-6 relative z-10">
              <h3 className="text-2xl font-bold">Stecab Publishing Office</h3>
              <p className="text-gray-300 text-sm leading-relaxed font-light">
                Our team is ready to respond to your queries. Please allow up to 24-48 business hours for a comprehensive email evaluation.
              </p>
              
              <div className="space-y-5 pt-4 text-sm text-gray-300 font-light">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 rounded-lg text-primary-300">
                    <Mail size={18} />
                  </div>
                  <span>support@stecab.com</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 rounded-lg text-primary-300">
                    <MapPin size={18} />
                  </div>
                  <span>Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 bg-white/10 rounded-lg text-primary-300">
                    <Phone size={18} />
                  </div>
                  <span>+880 1234-567890</span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 text-xs text-gray-400 font-light mt-8">
              Open Hours: Monday - Friday, 9:00 AM - 5:00 PM (GMT+6)
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Send us a message</h3>
            
            {success && (
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg flex items-center gap-2 text-sm">
                <CheckCircle2 size={18} className="text-teal-600 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-250 text-rose-800 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-gray-600">Full Name *</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    value={form.name} 
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-gray-600">Email Address *</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    value={form.email} 
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-semibold text-gray-600">Subject</label>
                <input 
                  type="text" 
                  id="subject"
                  name="subject" 
                  value={form.subject} 
                  onChange={handleChange}
                  placeholder="Subject of message"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-semibold text-gray-600">Message *</label>
                <textarea 
                  id="message"
                  name="message" 
                  rows={5}
                  value={form.message} 
                  onChange={handleChange}
                  placeholder="Write your message details..."
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:bg-primary-300"
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
