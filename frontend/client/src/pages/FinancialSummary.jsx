const FinancialSummary = ({ transactions }) => {
  const calculateTotals = () => {
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = income - expenses;
    
    return { income, expenses, balance };
  };

  const { income, expenses, balance } = calculateTotals();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3 w-full">
      {/* Income Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg w-full h-full min-h-[120px]">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Income
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  ${income.toFixed(2)}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg w-full h-full min-h-[120px]">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Expenses
              </dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">
                  ${expenses.toFixed(2)}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white overflow-hidden shadow rounded-lg w-full h-full min-h-[120px]">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div
              className={`flex-shrink-0 rounded-md p-3 ${
                balance >= 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
            >
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Current Balance
              </dt>
              <dd className="flex items-baseline">
                <div
                  className={`text-2xl font-semibold ${
                    balance >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  ${balance.toFixed(2)}
                </div>
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
