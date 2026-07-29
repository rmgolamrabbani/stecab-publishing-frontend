'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Target, CheckCircle2, ChevronRight, Award, HelpCircle } from 'lucide-react';

export default function Home() {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJournals() {
      try {
        const res = await fetch(`${process.env.BACKEND_URL}/api/journals`);
        if (res.ok) {
          const data = await res.ok ? await res.json() : [];
          setJournals(data);
        } else {
          throw new Error('Failed to fetch from backend');
        }
      } catch (err) {
        console.warn('Backend not responding, loading fallback journal data...', err);
        // Fallback static data if backend isn't started yet
        setJournals([
          { id: "jahss", title: "Journal of Arts, Humanities and Social Science", acronym: "JAHSS", issn: "3006-9491", indexing: "DOAJ, EBSCO", currentIssue: "3(2), 2026", frequency: "3 Times a year", language: "English", apc: "75 USD", bgGrad: "from-purple-900 to-indigo-800", description: "Double-blinded, peer-reviewed and open-access journal covering wide areas of arts, humanities, social sciences, linguistics, literature, philosophy, and cultural studies." },
          { id: "jemr", title: "Journal of Exceptional Multidisciplinary Research", acronym: "JEMR", issn: "3007-8407", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-teal-900 to-emerald-800", description: "An international journal fostering innovative and cross-disciplinary research across physical sciences, engineering, social sciences, and management sciences." },
          { id: "sjet", title: "Scientific Journal of Engineering, and Technology", acronym: "SJET", issn: "3007-9519", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-blue-900 to-cyan-800", description: "Scientific Journal of Engineering and Technology covers all sectors of engineering, from mechanical, civil, electrical, to software engineering, emphasizing practical implementations." },
          { id: "jmsbc", title: "Journal of Medical Science, Biology, and Chemistry", acronym: "JMSBC", issn: "3079-2576", indexing: "CrossRef, PubMed Mock", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-red-900 to-rose-800", description: "Publishes high-quality research papers on biological systems, biochemistry, medical innovations, pharmaceutical chemistry, and health sciences." },
          { id: "jebc", title: "Journal of Economics, Business, and Commerce", acronym: "JEBC", issn: "3007-9705", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-amber-900 to-yellow-800", description: "Peer-reviewed journal focusing on global macroeconomics, financial management, business models, consumer behavior, and e-commerce innovations." },
          { id: "jmdr", title: "Journal of Management, and Development Research", acronym: "JMDR", issn: "3079-2568", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-emerald-950 to-teal-900", description: "Covers management practices, organizational performance, developmental policy, public administration, and human resource management." },
          { id: "jece", title: "Journal of Environment, Climate, and Ecology", acronym: "JECE", issn: "3079-255X", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-green-950 to-green-800", description: "Dedicated to publishing research on environmental policy, ecosystem preservation, climate modeling, forestry, and sustainable resources." },
          { id: "jelm", title: "Journal of Education, Learning, and Management", acronym: "JELM", issn: "3079-2541", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-cyan-900 to-indigo-950", description: "Fosters discussions on pedagogical methods, e-learning platforms, educational administration, curriculum designs, and teaching methods." },
          { id: "jaaas", title: "Journal of Agriculture, Aquaculture, and Animal Science", acronym: "JAAAS", issn: "3079-2533", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-orange-950 to-orange-850", description: "Presents innovative research on crop production, veterinary medicine, aquaculture farming techniques, soil science, and animal genetics." },
          { id: "jcsp", title: "Journal of Computer, Software, and Program", acronym: "JCSP", issn: "3007-9756", indexing: "CrossRef, Google Scholar", currentIssue: "3(1), 2026", frequency: "2 Times a year", language: "English", apc: "50 USD", bgGrad: "from-zinc-900 to-slate-800", description: "Focuses on computer architecture, algorithm designs, computer networks, cyber security, and advancements in programming languages." }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchJournals();
  }, []);

  return (
    <div className="w-full flex-1">
      {/* Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-primary-950 via-primary-900 to-primary-950 text-white py-16 sm:py-24 border-b border-primary-800 overflow-hidden">
        {/* Subtle backdrop mesh */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Banner Content */}
            <div className="lg:col-span-8 flex flex-col items-start space-y-6">
              <span className="inline-flex items-center gap-1 bg-primary-850 text-primary-300 border border-primary-800 text-xs px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
                <Star size={12} className="fill-current" /> Exciting Offer on New Journals 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Discover Open Access <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-teal-300">Scholarly Journals</span>
              </h1>
              <p className="text-gray-300 max-w-2xl text-lg leading-relaxed font-light">
                Submit your research papers today and share your innovations globally with our double-blinded, peer-reviewed publishing portal. High visibility, rapid review, and DOI indexing guaranteed.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/submit" className="bg-primary-600 hover:bg-primary-700 hover:scale-105 active:scale-95 text-white font-bold px-7 py-3.5 rounded-lg shadow-lg hover:shadow-primary-900/35 transition-all flex items-center gap-2">
                  Submit Your Article <ArrowRight size={18} />
                </Link>
                <a href="#journals" className="bg-primary-900/50 border border-primary-750 hover:bg-primary-900 text-gray-200 font-semibold px-6 py-3.5 rounded-lg transition-colors">
                  Explore Journals
                </a>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="lg:col-span-4 bg-primary-900/40 border border-primary-800 p-8 rounded-2xl backdrop-blur-md shadow-2xl flex flex-col justify-center divide-y divide-primary-850 gap-6">
              <div className="pb-4">
                <h3 className="text-3xl font-extrabold text-white">2023</h3>
                <p className="text-xs uppercase tracking-widest text-primary-400 font-semibold mt-1">Established Year</p>
              </div>
              <div className="py-4">
                <h3 className="text-3xl font-extrabold text-white">20+</h3>
                <p className="text-xs uppercase tracking-widest text-primary-400 font-semibold mt-1">Scholarly Journals</p>
              </div>
              <div className="pt-4">
                <h3 className="text-3xl font-extrabold text-teal-400">100%</h3>
                <p className="text-xs uppercase tracking-widest text-primary-400 font-semibold mt-1">Open Access & Free Online Access</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Journals Grid Section */}
      <section id="journals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-950">Stecab Scholarly Journals</h2>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-4 mb-6"></div>
          <p className="text-gray-600 leading-relaxed">
            The <b>Stecab Publishing</b> is a rapidly growing international academic publisher that offers double-blinded, peer-reviewed and open-access journals to publish the thoughts of worldwide researchers. It covers the wide areas of science, engineering, technology, business, economics, arts, social science, environment, medical, education, language etc.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-gray-500">Loading journal data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {journals.map((journal) => (
              <div 
                key={journal.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-150 overflow-hidden hover-lift flex flex-col justify-between group"
              >
                {/* Journal Card Header Design */}
                <div className={`p-6 bg-gradient-to-br ${journal.bgGrad || 'from-primary-900 to-indigo-950'} text-white relative overflow-hidden journal-card-glow flex flex-col justify-between h-52`}>
                  <div className="absolute right-4 top-4 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest">
                    {journal.acronym}
                  </div>
                  <div className="mt-4">
                    <h3 className="font-bold text-lg leading-snug line-clamp-2 tracking-tight group-hover:text-primary-200 transition-colors">
                      {journal.title}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-primary-200/90 font-medium">
                    <span>E-ISSN: {journal.issn}</span>
                    <span className="capitalize">{journal.language}</span>
                  </div>
                </div>

                {/* Journal Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-light">
                    {journal.description || `Double-blind, peer-reviewed open access journal focusing on novel insights in the domain of ${journal.title}.`}
                  </p>
                  
                  {/* Journal Parameters Table representation */}
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 space-y-2.5 text-xs text-gray-600 mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Current Issue</span>
                      <span className="font-semibold text-gray-800">{journal.currentIssue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">Frequency</span>
                      <span className="font-semibold text-gray-800">{journal.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-400">APC Rate</span>
                      <span className="font-semibold text-primary-700 bg-primary-50 px-1.5 py-0.5 rounded font-mono">{journal.apc}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-400">Indexing</span>
                      <span className="font-semibold text-gray-800 truncate max-w-[150px]">{journal.indexing || 'Google Scholar'}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/journal/${journal.id}`}
                    className="w-full bg-primary-50 hover:bg-primary-600 text-primary-700 hover:text-white text-center font-bold py-3 px-4 rounded-lg text-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    View Journal Page <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Mission & Vision Segment */}
      <section className="bg-white border-y border-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary-50 rounded-xl text-primary-600">
                  <Target size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-primary-950">Mission & Vision</h2>
              </div>
              <div className="space-y-6 text-gray-600 leading-relaxed font-light">
                <div>
                  <h4 className="font-bold text-primary-900 text-lg mb-2">Our Mission</h4>
                  <p>
                    The core objective of the publisher is to make a strong, reliable, authentic, informative community for the global emerging research to both young and expert researchers. It connects researchers with scientific knowledge and social changes, contributing to wider conversations in the global village.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-primary-900 text-lg mb-2">Our Vision</h4>
                  <p>
                    Stecab Publishing promotes scientific exploration through research publications, accelerating the growth of emerging areas of knowledge and ensuring global accessibility to information. We strive to achieve global trust to enhance visibility and make a positive impact on civil society.
                  </p>
                </div>
              </div>
            </div>
            {/* Visual Callout */}
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary-900 to-indigo-950 text-white overflow-hidden shadow-xl flex flex-col justify-between min-h-[350px]">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full blur-2xl"></div>
              <div className="space-y-4">
                <Award size={48} className="text-teal-400" />
                <h3 className="text-2xl font-bold">100% Peer-Reviewed Rigorous Standards</h3>
                <p className="text-gray-300 text-sm leading-relaxed font-light">
                  Our double-blind review workflow guarantees fairness, scientific integrity, and constructive criticism. We assign reviewers specializing specifically in the study fields to filter and polish inputs.
                </p>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs text-primary-350">
                <span>DOAJ indexed Journals</span>
                <span>Active DOIs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Stecab Publishing Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-primary-950">Why Choose Stecab Publishing?</h2>
            <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-4 mb-6"></div>
            <p className="text-gray-600">
              Choosing the right publishing partner is critical. Stecab Publishing ensures a transparent, quick, and visible workflow for your research papers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Peer-Review Policy</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                We follow a structured double-blind peer-review policy to select only high-quality studies. The process is fully transparent, handled by domain experts.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Low Processing Charges</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                We charge minimal APC rates (as low as 30-50 USD) to handle hosting, archiving, and editing, and we do not request any submission or review fee.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Fully Open Access</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Every article is licensed under CC BY 4.0, allowing complete accessibility for researchers, students, and readers worldwide.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-bold text-gray-800 text-lg">High Visibility & DOIs</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                Every published article is assigned a persistent DOI via CrossRef, ensuring indexability, Citability, and unique identification.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                05
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Opportunities for Reviewers</h3>
              <p className="text-gray-500 text-sm leading-relaxed font-light">
                We invite worldwide academics and subject experts to collaborate with us on our editorial and reviewing panels, broadening knowledge boards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-150/60 shadow-sm flex flex-col gap-4 justify-between bg-gradient-to-br from-primary-50 to-indigo-50 border-primary-200">
              <div>
                <h3 className="font-bold text-primary-950 text-lg mb-2">Ready to Publish?</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  Submit your manuscript directly to your journal of choice and get published in our 2026 issue.
                </p>
              </div>
              <Link href="/submit" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-4 rounded-lg text-xs text-center transition-colors shadow-sm inline-flex items-center justify-center gap-1">
                Submit manuscript <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
