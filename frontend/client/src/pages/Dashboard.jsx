import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getTransactions } from '../utils/api';
import FinancialSummary from './FinancialSummary';
import FinancialCharts from './FinancialCharts';
import TransactionList from './TransactionList';

const Dashboard = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      if (response.success) {
        setTransactions(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } else {
        setError(response.error || 'Failed to fetch transactions');
        setTransactions([]);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Unexpected error fetching transactions');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  const recentTransactions = transactions?.slice?.(0, 5) || [];

  const username =
    user?.username || user?.name ||'User';

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, {username}
        </h1>

        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <FinancialSummary transactions={transactions} />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <FinancialCharts transactions={transactions} />
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Recent Transactions
            </h2>
            <TransactionList
              transactions={recentTransactions}
              onUpdate={fetchTransactions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
