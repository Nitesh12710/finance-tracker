import { useState } from 'react';

const categories = [
  { value: 'salary', label: 'Salary', type: 'income' },
  { value: 'freelance', label: 'Freelance', type: 'income' },
  { value: 'investments', label: 'Investments', type: 'income' },
  { value: 'stocks', label: 'Stocks', type: 'income' },
  { value: 'bitcoin', label: 'Bitcoin', type: 'income' },
  { value: 'bank', label: 'Bank Transfer', type: 'income' },
  { value: 'youtube', label: 'YouTube', type: 'income' },
  { value: 'other', label: 'Other', type: 'income' },
  { value: 'food', label: 'Food & Dining', type: 'expense' },
  { value: 'shopping', label: 'Shopping', type: 'expense' },
  { value: 'bills', label: 'Bills', type: 'expense' },
  { value: 'clothing', label: 'Clothing', type: 'expense' },
  { value: 'travel', label: 'Travel', type: 'expense' },
  { value: 'entertainment', label: 'Entertainment', type: 'expense' },
  { value: 'health', label: 'Health', type: 'expense' },
  { value: 'education', label: 'Education', type: 'expense' }
];

const currencies = [
  { code: 'USD', symbol: '$', label: 'USD – US Dollar' },
  { code: 'EUR', symbol: '€', label: 'EUR – Euro' },
  { code: 'GBP', symbol: '£', label: 'GBP – British Pound' },
  { code: 'PKR', symbol: '₨', label: 'PKR – Pakistani Rupee' },
  { code: 'INR', symbol: '₹', label: 'INR – Indian Rupee' },
  { code: 'JPY', symbol: '¥', label: 'JPY – Japanese Yen' },
  { code: 'CAD', symbol: 'C$', label: 'CAD – Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'AUD – Australian Dollar' },
  { code: 'CNY', symbol: '¥', label: 'CNY – Chinese Yuan' },
  { code: 'SAR', symbol: '﷼', label: 'SAR – Saudi Riyal' }
];

const TransactionForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    amount: initialData.amount || '',
    type: initialData.type || 'expense',
    category: initialData.category || 'food',
    currency: initialData.currency || 'USD',
    date: initialData.date || new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.title.trim()) {
      validationErrors.title = 'Title is required';
    }

    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      validationErrors.amount = 'Please enter a valid amount';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {categories.filter(cat => cat.type === formData.type).map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-gray-700">Currency</label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="mt-1 block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            {currencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`mt-1 block w-full shadow-sm sm:text-sm rounded-md ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          } focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            {currencies.find(c => c.code === formData.currency)?.symbol || '$'}
          </span>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            step="0.01"
            min="0"
            placeholder="0.00"
            className={`block w-full rounded-none rounded-r-md sm:text-sm ${
              errors.amount ? 'border-red-500' : 'border-gray-300'
            } focus:ring-blue-500 focus:border-blue-500`}
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
        >
          {initialData._id ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </form>
  );
};

export default TransactionForm;
