import { useState } from 'react';
import { format } from 'date-fns';
import TransactionForm from './TransactionForm';
import { deleteTransaction, updateTransaction } from '../utils/api';

const TransactionList = ({ transactions = [], onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      onUpdate?.();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleUpdate = async (updatedTransaction) => {
    try {
      await updateTransaction(editingId, updatedTransaction);
      setEditingId(null);
      onUpdate?.();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const formatAmount = (amount, type) => {
    return (
      <span className={`font-medium ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {type === 'income' ? '+' : '-'}${amount.toFixed(2)}
      </span>
    );
  };

  const getCategoryLabel = (category) => {
    const categories = {
      salary: 'Salary',
      freelance: 'Freelance',
      investments: 'Investments',
      stocks: 'Stocks',
      bitcoin: 'Bitcoin',
      bank: 'Bank Transfer',
      youtube: 'YouTube',
      other: 'Other',
      food: 'Food & Dining',
      shopping: 'Shopping',
      bills: 'Bills',
      clothing: 'Clothing',
      travel: 'Travel',
      entertainment: 'Entertainment',
      health: 'Health',
      education: 'Education'
    };
    return categories[category] || category;
  };

  if (!safeTransactions.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center">
        <p className="text-gray-500">No transactions found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {safeTransactions.map((transaction) => (
        <div key={transaction._id} className="bg-white shadow-lg rounded-xl overflow-hidden">
          {editingId === transaction._id ? (
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit Transaction</h3>
              <TransactionForm
                initialData={transaction}
                onSubmit={handleUpdate}
                onCancel={() => setEditingId(null)}
              />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{transaction.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {getCategoryLabel(transaction.category)} • {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg">{formatAmount(transaction.amount, transaction.type)}</div>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => setEditingId(transaction._id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionList;