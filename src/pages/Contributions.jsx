import React, { useState, useEffect } from 'react';
import { Search, Download, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const CoinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

const formatKes = (minor) =>
  ((minor || 0) / 100).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const Contributions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const response = await api.getTransactions();
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.detail || 'Failed to load contributions.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTx();
  }, []);

  const filteredData = transactions.filter((item) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.period_id?.toLowerCase().includes(term) ||
      item.status?.toLowerCase().includes(term) ||
      item.id?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contribution History</h2>
          <p className="text-sm text-gray-500 mt-1">Every confirmed contribution, straight from the ledger.</p>
        </div>
        <button className="border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by period, status, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-[#dc2626] focus:border-[#dc2626]"
          />
        </div>
      </div>

      <div className="border-t border-gray-200">
        {isLoading && <div className="py-12 text-center text-gray-500 text-sm">Loading contributions...</div>}

        {!isLoading && error && (
          <div className="py-8 flex flex-col items-center text-center">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredData.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">No contributions yet.</div>
        )}

        {!isLoading && !error && filteredData.length > 0 && (
          <div className="divide-y divide-gray-100">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-50/50 px-2 -mx-2 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#fef2f2] text-[#dc2626]">
                    <CoinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Contribution</p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {new Date(item.confirmed_at || item.created_at).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                        {item.period_id}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pl-14 sm:pl-0">
                  <p className="text-sm font-bold text-gray-900">+ KSh {formatKes(item.amount_minor)}</p>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'CONFIRMED'
                        ? 'bg-green-50 text-green-700'
                        : item.status === 'PENDING'
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contributions;
