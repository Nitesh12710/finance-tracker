import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getTransactions, addTransaction } from '../utils/api';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';

const Transactions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchTransactions = async () => {
    try {
      const response = await getTransactions();
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = async (transactionData) => {
    try {
      // Calculate current balance
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      const balance = income - expenses;

      // Check if user has enough balance before allowing expense
      if (transactionData.type === 'expense' && transactionData.amount > balance) {
        alert('Not enough balance to make this expense!');
        return;
      }

      await addTransaction(transactionData);
      fetchTransactions();
      setShowForm(false);
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  if (loading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-white">Loading...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-100 overflow-y-auto">
      <div className="min-h-full w-full flex justify-center items-start py-8">
        <div className="w-full max-w-4xl px-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Your Transactions</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md transition-colors"
              >
                Add Transaction
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md shadow-md transition-colors"
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>

          {showForm && (
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
              <TransactionForm 
                onSubmit={handleAddTransaction} 
                onCancel={() => setShowForm(false)}
              />
            </div>
          )}

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <TransactionList 
              transactions={transactions} 
              onUpdate={fetchTransactions} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
