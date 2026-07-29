'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogIn, Key, Mail, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Logged in successfully!');
        localStorage.setItem('stecab_token', data.token);
        localStorage.setItem('stecab_user', JSON.stringify(data.user));
        
        // Dispatch event for layout navbar updates
        window.dispatchEvent(new Event('auth-change'));
        
        setTimeout(() => {
          router.push('/submit');
        }, 1000);
      } else {
        throw new Error(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'Connection to authentication server failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 w-full bg-gray-50/50 flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full bg-white border border-gray-150 rounded-2xl shadow-sm p-6 sm:p-8">
        
        {/* Title */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary-650 text-white flex items-center justify-center mx-auto mb-4 shadow-md font-bold text-xl">
            S
          </div>
          <h1 className="text-2xl font-extrabold text-primary-950">Author Portal Login</h1>
          <p className="text-xs text-gray-500 font-light mt-1">Submit, edit, and track your research papers.</p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 size={18} className="text-teal-600 flex-shrink-0" />
            <span>{success} Redirecting...</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-250 text-rose-800 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-gray-600 flex items-center gap-1">
              <Mail size={12} /> Email Address
            </label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. researcher@university.edu"
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-semibold text-gray-600 flex items-center gap-1">
              <Key size={12} /> Password
            </label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter account password"
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:bg-primary-300"
          >
            {loading ? 'Logging in...' : (
              <>
                <LogIn size={16} /> Sign In
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          New to Stecab Publishing?{' '}
          <Link href="/register" className="text-primary-650 hover:underline font-bold">
            Create an author account
          </Link>
        </div>

      </div>
    </div>
  );
}
