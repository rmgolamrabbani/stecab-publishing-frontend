'use client';

import { CheckCircle2, Info, HelpCircle } from 'lucide-react';

export default function ApcPage() {
  return (
    <div className="flex-1 w-full bg-gray-50/50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-950">Article Processing Charges (APCs)</h1>
          <div className="h-1.5 w-24 bg-primary-600 mx-auto rounded-full mt-4 mb-4"></div>
          <p className="text-gray-500 font-light max-w-xl mx-auto">
            Stecab Publishing operates as an open-access publisher. To support high-quality scientific reviews and hosting, minimal processing fees are applicable.
          </p>
        </div>

        {/* Body content */}
        <div className="bg-white border border-gray-150 rounded-xl shadow-sm p-6 sm:p-10 space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Info size={20} className="text-primary-600" /> Why do we charge APCs?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Unlike traditional subscription-based journals, Stecab Publishing does not charge readers or institutions any access fee. All articles are published under the <b>Creative Commons Attribution (CC BY)</b> license, making them immediately and permanently free for everyone.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              To cover costs such as editing, peer-review coordination, copyediting, indexing services, DOI assignments via CrossRef, server hosting, and long-term digital preservation, we apply an Article Processing Charge (APC) once an article is accepted for publication.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Pricing table */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pricing Breakdown</h2>
            <div className="overflow-x-auto border border-gray-100 rounded-lg">
              <table className="min-w-full divide-y divide-gray-100 text-sm text-left">
                <thead className="bg-gray-50 text-gray-700 font-bold">
                  <tr>
                    <th className="px-6 py-4">Journal Classification</th>
                    <th className="px-6 py-4">Processing Fee (APC)</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600 font-light">
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-800">Established Scientific Journals (e.g. JAHSS)</td>
                    <td className="px-6 py-4 text-primary-700 font-bold font-mono">75 USD</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Active</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-800">Standard Multidisciplinary & Engineering (e.g. SJET, JEMR)</td>
                    <td className="px-6 py-4 text-primary-700 font-bold font-mono">50 USD</td>
                    <td className="px-6 py-4 text-green-600 font-semibold">Active</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-semibold text-gray-800">New Journals 2026 Promo Pricing</td>
                    <td className="px-6 py-4 text-primary-700 font-bold font-mono">30 USD</td>
                    <td className="px-6 py-4 text-amber-600 font-semibold">Promo Active</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Payment instructions */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Payment Process</h2>
            <p className="text-gray-600 text-sm leading-relaxed font-light">
              Authors will receive payment requests only after their manuscripts are peer-reviewed and officially accepted by the editorial board.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50 flex flex-col gap-2">
                <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-teal-600" /> Payment Methods
                </h4>
                <ul className="text-xs text-gray-500 space-y-1.5 pl-5 list-disc">
                  <li>International Credit/Debit Cards</li>
                  <li>Wire Transfer / SWIFT</li>
                  <li>PayPal Services</li>
                  <li>Mobile Financial Services (for local authors in Bangladesh)</li>
                </ul>
              </div>
              <div className="border border-gray-100 rounded-lg p-5 bg-gray-50 flex flex-col gap-2">
                <h4 className="font-bold text-sm text-gray-800 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-teal-600" /> APC Waivers
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  Waivers are available for primary authors who are undergraduate students, or belong to low-income economies defined by the World Bank. Apply for waivers during paper submission.
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Guidelines info */}
          <div className="bg-primary-50 rounded-xl p-5 border border-primary-100 flex gap-4 items-start">
            <HelpCircle className="text-primary-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-primary-950 mb-1">Publication Honesty & Ethics</h4>
              <p className="text-xs text-primary-850 leading-relaxed font-light">
                Please note thatpaying article processing charges does not guarantee publication. Manuscripts must pass peer-review and meet all scientific criteria. Submitting fees for rejected papers is not required.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
