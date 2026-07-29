'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Users, Info, FileText, Download, Award, Calendar, DollarSign, Globe, Check } from 'lucide-react';

export default function JournalPage({ params }) {
  const { id } = params;
  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('about'); // about, articles, board

  useEffect(() => {
    async function fetchJournalDetails() {
      try {
        const res = await fetch(`http://localhost:5000/api/journals/${id}`);
        if (res.ok) {
          const data = await res.json();
          setJournal(data);
        } else {
          throw new Error('Journal not found');
        }
      } catch (err) {
        console.warn('Backend not responding, using static fallback for journal details...', err);
        
        // Custom fallbacks matching specific journals
        const fallbackJournals = {
          jahss: {
            id: "jahss",
            title: "Journal of Arts, Humanities and Social Science",
            acronym: "JAHSS",
            issn: "3006-9491",
            indexing: "DOAJ, EBSCO, CrossRef",
            currentIssue: "Vol. 3 No. 2 (2026)",
            frequency: "3 Times a year",
            language: "English",
            apc: "75 USD",
            bgGrad: "from-purple-900 to-indigo-800",
            description: "Double-blinded, peer-reviewed and open-access journal covering wide areas of arts, humanities, social sciences, linguistics, literature, philosophy, and cultural studies.",
            editorialBoard: [
              { name: "Prof. Dr. Sarah Jenkins", role: "Editor-in-Chief", institution: "University of Oxford, UK" },
              { name: "Dr. Ahmed Mansoor", "role": "Associate Editor", "institution": "Cairo University, Egypt" },
              { name: "Prof. Lisa Wong", "role": "Editorial Member", "institution": "National University of Singapore" }
            ],
            articles: [
              {
                id: "jahss-art-01",
                title: "The Evolution of Digital Media and Its Impact on Social Interaction in Urban Environments",
                authors: "Dr. Jane Doe, Dr. Mark Smith",
                abstract: "This study investigates how digital media has transformed social interactions within modern urban landscapes, highlighting both the enhancements in connectivity and the rise in digital alienation.",
                keywords: "Digital Media, Social Interaction, Urbanization, Connectivity",
                date: "2026-04-12"
              },
              {
                id: "jahss-art-02",
                title: "Reinterpreting Renaissance Art: A Feminist Perspective on Italian Masterpieces",
                authors: "Prof. Elena Rostova",
                abstract: "A critical examination of popular Italian Renaissance paintings, looking at the depiction of female subjects through a feminist art history lens.",
                keywords: "Renaissance, Feminist Theory, Art History, Masterpieces",
                date: "2026-05-01"
              }
            ]
          },
          jemr: {
            id: "jemr",
            title: "Journal of Exceptional Multidisciplinary Research",
            acronym: "JEMR",
            issn: "3007-8407",
            indexing: "CrossRef, Google Scholar",
            currentIssue: "Vol. 3 No. 1 (2026)",
            frequency: "2 Times a year",
            language: "English",
            apc: "50 USD",
            bgGrad: "from-teal-900 to-emerald-800",
            description: "An international journal fostering innovative and cross-disciplinary research across physical sciences, engineering, social sciences, and management sciences.",
            editorialBoard: [
              { name: "Prof. Robert Johnson", role: "Editor-in-Chief", institution: "MIT, USA" },
              { name: "Dr. Kenji Tanaka", role: "Editorial Board Member", institution: "University of Tokyo, Japan" }
            ],
            articles: [
              {
                id: "jemr-art-01",
                title: "Multidisciplinary Approaches to Climate Change Adaptation in Coastal Communities",
                authors: "Dr. Samuel Green, Dr. Clara Oswald",
                abstract: "This article discusses the intersection of hydrology, social policy, and civil engineering in building resilient coastal infrastructures.",
                keywords: "Climate Adaptation, Multidisciplinary, Infrastructure, Coastal Planning",
                date: "2026-03-20"
              }
            ]
          }
        };

        const found = fallbackJournals[id.toLowerCase()];
        if (found) {
          setJournal(found);
        } else {
          // Generic fallback
          setJournal({
            id: id,
            title: `${id.toUpperCase()} Scholarly Journal`,
            acronym: id.toUpperCase(),
            issn: "In Progress",
            indexing: "CrossRef, Google Scholar",
            currentIssue: "Vol. 1 No. 1 (2026)",
            frequency: "2 Times a year",
            language: "English",
            apc: "30 USD",
            bgGrad: "from-blue-900 to-indigo-950",
            description: `This is the landing portal for ${id.toUpperCase()} Scholarly Journal. It is a peer-reviewed open-access journal welcoming submissions in relevant disciplines.`,
            editorialBoard: [
              { name: "Prof. John Smith", role: "Editor-in-Chief", institution: "Academic Center, USA" }
            ],
            articles: [
              {
                id: `${id}-art-01`,
                title: `Sample manuscript research paper for ${id.toUpperCase()} publication`,
                authors: "Dr. David Banner, Dr. Bruce Wayne",
                abstract: "This is a placeholder abstract demonstrating paper formatting and indexation details for this journal issue.",
                keywords: "Research, Scholarly, Academic, Investigation",
                date: "2026-05-15"
              }
            ]
          });
        }
      } finally {
        setLoading(false);
      }
    }

    fetchJournalDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-gray-500">Loading journal landing portal...</p>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
        <h2 className="text-2xl font-bold text-gray-800">Journal Not Found</h2>
        <p className="text-gray-500 mt-2">The academic journal you requested does not exist or has been moved.</p>
        <Link href="/" className="mt-6 bg-primary-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-700">
          Back to Portal Home
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 w-full bg-gray-50/50">
      {/* Header Banner */}
      <section className={`bg-gradient-to-r ${journal.bgGrad || 'from-primary-950 to-indigo-900'} text-white py-12 border-b border-black/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            <span className="inline-flex max-w-max bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs px-3 py-1 rounded-md font-bold uppercase tracking-wider">
              {journal.acronym}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-snug">
              {journal.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 mt-2 text-xs text-primary-200/90 font-medium">
              <span className="flex items-center gap-1"><Award size={14} /> ISSN (Online): {journal.issn}</span>
              <span className="flex items-center gap-1"><Calendar size={14} /> Frequency: {journal.frequency}</span>
              <span className="flex items-center gap-1"><DollarSign size={14} /> APC: {journal.apc}</span>
              <span className="flex items-center gap-1"><Globe size={14} /> Language: {journal.language}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main content pane */}
          <div className="lg:col-span-8 bg-white border border-gray-150 rounded-xl shadow-sm overflow-hidden">
            {/* Tabs header */}
            <div className="flex border-b border-gray-100 bg-gray-50/70">
              <button 
                onClick={() => setActiveTab('about')}
                className={`flex items-center gap-1.5 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === 'about' ? 'border-primary-600 text-primary-700 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-150/40'}`}
              >
                <Info size={16} /> About Journal
              </button>
              <button 
                onClick={() => setActiveTab('articles')}
                className={`flex items-center gap-1.5 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === 'articles' ? 'border-primary-600 text-primary-700 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-150/40'}`}
              >
                <BookOpen size={16} /> Current Issue
              </button>
              <button 
                onClick={() => setActiveTab('board')}
                className={`flex items-center gap-1.5 px-6 py-4 text-sm font-semibold border-b-2 transition-all ${activeTab === 'board' ? 'border-primary-600 text-primary-700 bg-white' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-150/40'}`}
              >
                <Users size={16} /> Editorial Board
              </button>
            </div>

            {/* Tab content body */}
            <div className="p-6 sm:p-8">
              
              {/* TAB 1: About */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Focus and Scope</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      {journal.description || `Double-blind, peer-reviewed open access journal focusing on novel insights in the domain of ${journal.title}.`}
                      {" "}The journal publishes original papers, review articles, technical notes, and case reports. We ensure double-blind review pipelines to filter and publish authentic academic works of scholars around the world.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Peer Review Process</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      All submitted manuscripts undergo a double-blind peer-review evaluation by at least two expert referees in the corresponding disciplines. The editorial review board validates the authenticity, formatting, and relevance before selecting the article. The initial screening is completed within 2 weeks of submission.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Indexing & Abstracting</h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light">
                      Articles published in this journal are systematically registered with CrossRef and indexed in Google Scholar, {journal.indexing || 'DOAJ, EBSCO'}. Every article is assigned a unique digital object identifier (DOI) to ensure authentic citations.
                    </p>
                  </div>
                  <div className="pt-4">
                    <Link href="/submit" className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg text-sm shadow-sm transition-colors">
                      <FileText size={16} /> Submit Your Manuscript
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 2: Current Issue Articles */}
              {activeTab === 'articles' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 className="text-base font-bold text-gray-800">{journal.currentIssue}</h3>
                    <span className="text-xs text-gray-500 font-medium">Published Articles</span>
                  </div>

                  {journal.articles && journal.articles.length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {journal.articles.map((article, idx) => (
                        <div key={article.id || idx} className="py-6 first:pt-0 last:pb-0 flex flex-col gap-3">
                          <h4 className="font-bold text-primary-950 text-base leading-snug hover:text-primary-700 transition-colors">
                            {article.title}
                          </h4>
                          <p className="text-xs font-semibold text-gray-600">
                            {article.authors}
                          </p>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 bg-gray-50/50 p-3 rounded-lg border border-gray-100 font-light">
                            {article.abstract}
                          </p>
                          <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1.5">
                            <span className="text-gray-400">Keywords: <span className="text-gray-600 font-medium">{article.keywords}</span></span>
                            <a 
                              href="http://localhost:5000/files/mock-pdf.pdf"
                              download 
                              className="text-primary-600 hover:text-primary-800 font-bold flex items-center gap-1 transition-colors bg-primary-50 hover:bg-primary-100 px-3 py-1.5 rounded"
                            >
                              <Download size={12} /> PDF Download
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm italic">No articles published in the current issue yet.</p>
                  )}
                </div>
              )}

              {/* TAB 3: Editorial Board */}
              {activeTab === 'board' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3">Editorial Board Members</h3>
                  
                  {journal.editorialBoard && journal.editorialBoard.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {journal.editorialBoard.map((member, idx) => (
                        <div key={idx} className="border border-gray-100 rounded-lg p-5 bg-gray-50/40 hover:bg-gray-50 transition-colors flex flex-col gap-1.5">
                          <h4 className="font-bold text-gray-800 text-sm">{member.name}</h4>
                          <span className="text-xs bg-primary-50 text-primary-700 font-semibold px-2 py-0.5 rounded-full max-w-max">{member.role}</span>
                          <p className="text-xs text-gray-500 mt-1">{member.institution}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-gray-100 rounded-lg p-5 bg-gray-50 flex flex-col gap-1.5">
                        <h4 className="font-bold text-gray-800 text-sm">Prof. Dr. Sarah Jenkins</h4>
                        <span className="text-xs bg-primary-50 text-primary-700 font-semibold px-2 py-0.5 rounded-full max-w-max">Editor-in-Chief</span>
                        <p className="text-xs text-gray-500 mt-1">University of Oxford, UK</p>
                      </div>
                      <div className="border border-gray-100 rounded-lg p-5 bg-gray-50 flex flex-col gap-1.5">
                        <h4 className="font-bold text-gray-800 text-sm">Dr. Ahmed Mansoor</h4>
                        <span className="text-xs bg-primary-50 text-primary-700 font-semibold px-2 py-0.5 rounded-full max-w-max">Associate Editor</span>
                        <p className="text-xs text-gray-500 mt-1">Cairo University, Egypt</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>

          {/* Sidebar widget panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Actions Panel */}
            <div className="bg-white border border-gray-150 rounded-xl shadow-sm p-6 flex flex-col gap-3">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2 mb-1">Journal Actions</h3>
              <Link 
                href="/submit" 
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition-colors text-center shadow-sm flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Submit Manuscript
              </Link>
              <button 
                onClick={() => setActiveTab('articles')}
                className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold py-3 px-4 rounded-lg text-sm border border-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={16} /> View Current Issue
              </button>
            </div>

            {/* Quick Metrics Detail widget */}
            <div className="bg-white border border-gray-150 rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wider border-b border-gray-100 pb-2 mb-4">Journal Metadata</h3>
              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">ISSN (Online)</span>
                  <span className="text-gray-800 font-semibold">{journal.issn}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">Current Issue</span>
                  <span className="text-gray-800 font-semibold">{journal.currentIssue}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">Frequency</span>
                  <span className="text-gray-800 font-semibold">{journal.frequency}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">Language</span>
                  <span className="text-gray-800 font-semibold">{journal.language}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <span className="text-gray-400 font-medium">APC Processing fee</span>
                  <span className="text-primary-750 font-bold bg-primary-50 px-2 py-0.5 rounded font-mono">{journal.apc}</span>
                </div>
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-gray-400 font-medium">Indexing</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(journal.indexing || 'Google Scholar').split(',').map((ind, idx) => (
                      <span key={idx} className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-md border border-teal-100/50">
                        {ind.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Author checklist widget */}
            <div className="bg-gradient-to-br from-primary-950 to-indigo-950 text-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-sm uppercase tracking-wider border-b border-white/10 pb-2 mb-4 flex items-center gap-1.5">
                <Check size={16} className="text-teal-400" /> Author Checklist
              </h3>
              <ul className="space-y-3 text-xs text-gray-300 font-light">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                  <span>Manuscript must be written in English.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                  <span>Abstract must have a maximum of 250 words.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                  <span>File must be in editable DOC/DOCX format.</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                  <span>All authors list, emails, and institutions must be filled.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
