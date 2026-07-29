'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Download, BookOpen, AlertCircle } from 'lucide-react';

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get('query') || '';
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setQuery(queryParam);
    
    async function searchArticles() {
      if (!queryParam.trim()) {
        setResults([]);
        return;
      }
      
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/search?query=${encodeURIComponent(queryParam)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        } else {
          throw new Error('Search failed');
        }
      } catch (err) {
        console.warn('Backend search connection failed, using static query fallback...', err);
        
        // Static filter for fallback demo
        const fallbackArticles = [
          {
            id: "jahss-art-01",
            title: "The Evolution of Digital Media and Its Impact on Social Interaction in Urban Environments",
            authors: "Dr. Jane Doe, Dr. Mark Smith",
            abstract: "This study investigates how digital media has transformed social interactions within modern urban landscapes, highlighting both the enhancements in connectivity and the rise in digital alienation.",
            keywords: "Digital Media, Social Interaction, Urbanization, Connectivity",
            journalId: "jahss",
            journalAcronym: "JAHSS",
            journalTitle: "Journal of Arts, Humanities and Social Science"
          },
          {
            id: "jemr-art-01",
            title: "Multidisciplinary Approaches to Climate Change Adaptation in Coastal Communities",
            authors: "Dr. Samuel Green, Dr. Clara Oswald",
            abstract: "This article discusses the intersection of hydrology, social policy, and civil engineering in building resilient coastal infrastructures.",
            keywords: "Climate Adaptation, Multidisciplinary, Infrastructure, Coastal Planning",
            journalId: "jemr",
            journalAcronym: "JEMR",
            journalTitle: "Journal of Exceptional Multidisciplinary Research"
          },
          {
            id: "sjet-art-01",
            title: "Automated Bug Localization Using Advanced Neural Network Architectures",
            authors: "Devin AI, Linus Torvalds",
            abstract: "This paper presents a novel approach to automated software bug localization using transformer models trained on massive open-source repositories.",
            keywords: "AI, Software Engineering, Deep Learning, Bug Triage",
            journalId: "sjet",
            journalAcronym: "SJET",
            journalTitle: "Scientific Journal of Engineering, and Technology"
          }
        ];
        
        const filtered = fallbackArticles.filter(art => 
          art.title.toLowerCase().includes(queryParam.toLowerCase()) ||
          art.authors.toLowerCase().includes(queryParam.toLowerCase()) ||
          art.abstract.toLowerCase().includes(queryParam.toLowerCase()) ||
          art.keywords.toLowerCase().includes(queryParam.toLowerCase())
        );
        setResults(filtered);
      } finally {
        setLoading(false);
      }
    }

    searchArticles();
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="bg-white border border-gray-150 rounded-xl shadow-sm p-6 sm:p-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, titles, authors, or abstracts..."
              className="w-full border border-gray-300 rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
            <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
          </div>
          <button 
            type="submit"
            className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-8 rounded-lg text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Find Articles
          </button>
        </form>
      </div>

      {/* Results Title */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {queryParam ? `Search Results for "${queryParam}"` : 'Global Literature Search'}
        </h2>
        <p className="text-xs text-gray-400 mt-1">{results.length} article(s) found</p>
      </div>

      {/* Results Container */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-gray-500">Searching literature databases...</p>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-6">
          {results.map((article, idx) => (
            <div key={article.id || idx} className="bg-white border border-gray-150 rounded-xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-50 pb-3">
                <Link 
                  href={`/journal/${article.journalId}`}
                  className="bg-primary-50 hover:bg-primary-100 text-primary-700 text-xs font-bold px-2.5 py-1 rounded-md border border-primary-100/50"
                >
                  {article.journalAcronym} - {article.journalTitle}
                </Link>
                {article.date && <span className="text-[11px] text-gray-400 font-medium">{article.date}</span>}
              </div>

              <div>
                <h3 className="font-extrabold text-gray-900 text-lg leading-snug hover:text-primary-700 transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs font-semibold text-gray-600 mt-1">{article.authors}</p>
              </div>

              <p className="text-gray-500 text-sm leading-relaxed font-light bg-gray-50/50 p-4 rounded-lg border border-gray-100/70">
                <span className="font-bold text-gray-600 block text-xs uppercase mb-1">Abstract</span>
                {article.abstract}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1.5 border-t border-gray-50">
                <span className="text-gray-400">Keywords: <span className="text-gray-600 font-medium">{article.keywords}</span></span>
                <a 
                  href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/mock-pdf.pdf`}
                  download 
                  className="text-primary-600 hover:text-primary-800 font-bold flex items-center gap-1 transition-colors bg-primary-50 hover:bg-primary-100 px-3.5 py-2 rounded-lg"
                >
                  <Download size={14} /> Full Text PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : queryParam ? (
        <div className="bg-white border border-gray-150 rounded-xl p-10 shadow-sm text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <AlertCircle size={40} className="text-primary-450" />
          <h3 className="font-bold text-gray-800 text-lg">No Articles Found</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            We couldn't find any papers matching your keywords. Please try adjusting your terms or browse the journals directly.
          </p>
          <Link href="/#journals" className="bg-primary-600 text-white font-bold py-2.5 px-6 rounded-lg text-sm shadow-sm hover:bg-primary-700 transition-colors">
            Browse Journals
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-150 rounded-xl p-10 shadow-sm text-center max-w-xl mx-auto flex flex-col items-center gap-4">
          <BookOpen size={40} className="text-primary-400" />
          <h3 className="font-bold text-gray-800 text-lg font-sans">Search Portal</h3>
          <p className="text-gray-500 text-sm leading-relaxed font-light">
            Enter search keywords above to find relevant articles, scientific manuscripts, and reviews across all of Stecab's twenty scholarly journals.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="flex-1 w-full bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-950">Literature Search</h1>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-4"></div>
        </div>

        <Suspense fallback={
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-gray-500">Loading search interface...</p>
          </div>
        }>
          <SearchResultsContent />
        </Suspense>

      </div>
    </div>
  );
}
