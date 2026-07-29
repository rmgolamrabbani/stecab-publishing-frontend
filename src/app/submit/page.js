'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Send, User, ChevronRight, Lock, CheckCircle2, History, Loader2 } from 'lucide-react';

export default function SubmitPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [journals, setJournals] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [form, setForm] = useState({ title: '', authors: '', abstract: '', journalId: '', keywords: '' });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Check Auth
    const storedUser = localStorage.getItem('stecab_user');
    if (!storedUser) {
      setLoading(false);
      return;
    }
    setUser(JSON.parse(storedUser));

    // 2. Fetch Journals for select dropdown & Fetch my previous submissions
    const token = localStorage.getItem('stecab_token');
    
    async function fetchData() {
      try {
        const [resJ, resS] = await Promise.all([
          fetch('http://localhost:5000/api/journals'),
          fetch('http://localhost:5000/api/submissions/my', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (resJ.ok) {
          const jData = await resJ.json();
          setJournals(jData);
        }

        if (resS.ok) {
          const sData = await resS.json();
          setMySubmissions(sData);
        }
      } catch (err) {
        console.warn('Backend server not connected. Using default fallbacks.', err);
        // Fallback fallback journals
        setJournals([
          { id: 'jahss', acronym: 'JAHSS', title: 'Journal of Arts, Humanities and Social Science' },
          { id: 'jemr', acronym: 'JEMR', title: 'Journal of Exceptional Multidisciplinary Research' },
          { id: 'sjet', acronym: 'SJET', title: 'Scientific Journal of Engineering, and Technology' },
          { id: 'jmsbc', acronym: 'JMSBC', title: 'Journal of Medical Science, Biology, and Chemistry' },
          { id: 'jebc', acronym: 'JEBC', title: 'Journal of Economics, Business, and Commerce' }
        ]);
        // Mock fallback submissions
        setMySubmissions([
          {
            id: 'sub_demo_01',
            title: 'Sample study on blockchain models and applications',
            authors: 'Jane Thompson',
            journalAcronym: 'SJET',
            submittedAt: new Date().toISOString(),
            status: 'Under Review'
          }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.authors || !form.abstract || !form.journalId) {
      setError('Title, authors, abstract, and target journal are required.');
      return;
    }
    setSubmitLoading(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem('stecab_token');

    try {
      const res = await fetch('http://localhost:5000/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.message || 'Manuscript submitted successfully!');
        setForm({ title: '', authors: '', abstract: '', journalId: '', keywords: '' });
        
        // Append the new submission locally
        setMySubmissions([data.submission, ...mySubmissions]);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (err) {
      console.warn('API error, simulating mock submission...', err);
      const targetJ = journals.find(j => j.id === form.journalId);
      const mockSub = {
        id: 'sub_' + Date.now(),
        title: form.title,
        authors: form.authors,
        abstract: form.abstract,
        keywords: form.keywords,
        journalId: form.journalId,
        journalAcronym: targetJ ? targetJ.acronym : 'JAHSS',
        journalTitle: targetJ ? targetJ.title : 'Journal of Arts',
        submittedAt: new Date().toISOString(),
        status: 'Under Review'
      };
      setSuccess('Paper submitted successfully (Demo Offline Mode)!');
      setForm({ title: '', authors: '', abstract: '', journalId: '', keywords: '' });
      setMySubmissions([mockSub, ...mySubmissions]);
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 className="w-12 h-12 text-primary-650 animate-spin" />
        <p className="text-sm font-semibold text-gray-500">Loading author dashboard...</p>
      </div>
    );
  }

  // Not logged in view
  if (!user) {
    return (
      <div className="flex-1 w-full bg-gray-50/50 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-white border border-gray-150 rounded-2xl shadow-sm p-8 text-center flex flex-col items-center gap-5">
          <div className="p-4 bg-primary-50 rounded-full text-primary-600">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-primary-950 font-sans">Author Portal</h2>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            You must be logged in to submit manuscripts or check review statuses. Please log in or create a new author account.
          </p>
          <div className="flex gap-4 w-full pt-2">
            <Link href="/login" className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-lg text-sm transition-colors text-center shadow-sm">
              Sign In
            </Link>
            <Link href="/register" className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg text-sm transition-colors text-center">
              Register
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-gray-50/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-8 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-primary-950 font-sans">Author Submission Portal</h1>
            <p className="text-xs text-gray-400 mt-1 font-light">Account: <span className="font-semibold text-gray-700">{user.name} ({user.email})</span></p>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('stecab_token');
              localStorage.removeItem('stecab_user');
              window.dispatchEvent(new Event('auth-change'));
              router.push('/');
            }}
            className="text-xs text-red-650 font-bold border border-red-200 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors max-w-max"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submission Form */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-2xl shadow-sm p-6 sm:p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText size={20} className="text-primary-600" /> Submit New Manuscript
            </h3>

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

            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex flex-col gap-1.5">
                <label htmlFor="journalId" className="text-xs font-semibold text-gray-600">Target Journal *</label>
                <select 
                  id="journalId"
                  name="journalId" 
                  value={form.journalId} 
                  onChange={handleChange}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm bg-white"
                  required
                >
                  <option value="">-- Select Target Journal --</option>
                  {journals.map(j => (
                    <option key={j.id} value={j.id}>
                      [{j.acronym}] - {j.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="title" className="text-xs font-semibold text-gray-600">Manuscript Title *</label>
                <input 
                  type="text" 
                  id="title"
                  name="title" 
                  value={form.title} 
                  onChange={handleChange}
                  placeholder="e.g. A Deep Analysis of Sustainable Agritech Systems"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="authors" className="text-xs font-semibold text-gray-600">Authors list * (Comma separated)</label>
                <input 
                  type="text" 
                  id="authors"
                  name="authors" 
                  value={form.authors} 
                  onChange={handleChange}
                  placeholder="e.g. Dr. Jane Smith (Editor), Prof. Robert Johnson"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="abstract" className="text-xs font-semibold text-gray-600">Abstract *</label>
                <textarea 
                  id="abstract"
                  name="abstract" 
                  rows={6}
                  value={form.abstract} 
                  onChange={handleChange}
                  placeholder="Paste your paper abstract here (max 250-300 words)..."
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="keywords" className="text-xs font-semibold text-gray-600">Keywords (Comma separated)</label>
                <input 
                  type="text" 
                  id="keywords"
                  name="keywords" 
                  value={form.keywords} 
                  onChange={handleChange}
                  placeholder="e.g. Blockchain, Cybersecurity, Cryptography"
                  className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5 border border-dashed border-gray-200 rounded-lg p-5 bg-gray-50/50">
                <label className="text-xs font-bold text-gray-700">Attach Manuscript File *</label>
                <input 
                  type="file" 
                  accept=".doc,.docx,.pdf"
                  className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                  required
                />
                <span className="text-[10px] text-gray-400 font-light mt-1">Accepted formats: DOC, DOCX, or PDF. Max file size: 10MB.</span>
              </div>

              <button 
                type="submit" 
                disabled={submitLoading}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3.5 px-6 rounded-lg text-sm shadow-sm transition-colors flex items-center justify-center gap-2 disabled:bg-primary-300"
              >
                {submitLoading ? 'Submitting...' : (
                  <>
                    <Send size={16} /> Submit Paper to Review
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Submissions History Dashboard */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-2xl shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-100 pb-3">
              <History size={18} className="text-gray-500" /> Your Submissions History
            </h3>

            {mySubmissions.length > 0 ? (
              <div className="space-y-4">
                {mySubmissions.map((sub, idx) => (
                  <div key={sub.id || idx} className="border border-gray-100 rounded-xl p-4 bg-gray-50/40 hover:bg-gray-50 transition-colors flex flex-col gap-2.5">
                    <div className="flex justify-between items-start gap-2">
                      <span className="bg-primary-50 border border-primary-100 text-primary-700 text-[10px] font-bold px-2 py-0.5 rounded">
                        {sub.journalAcronym}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sub.status === 'Accepted' ? 'bg-green-50 text-green-700' : sub.status === 'Rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'}`}>
                        {sub.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm leading-tight line-clamp-2">{sub.title}</h4>
                      <p className="text-[10px] text-gray-400 mt-1">Submitted on: {new Date(sub.submittedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm italic">
                You haven't submitted any manuscripts yet.
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
