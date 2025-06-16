import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const FinancialCharts = ({ transactions }) => {
  // Prepare data for monthly expenses chart
  const getMonthlyData = () => {
    const months = Array(12).fill(0).map((_, i) => {
      const date = new Date();
      date.setMonth(i);
      return date.toLocaleString('default', { month: 'short' });
    });

    const monthlyExpenses = Array(12).fill(0);
    const monthlyIncome = Array(12).fill(0);

    transactions.forEach(transaction => {
      const month = new Date(transaction.date).getMonth();
      if (transaction.type === 'expense') {
        monthlyExpenses[month] += transaction.amount;
      } else {
        monthlyIncome[month] += transaction.amount;
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: monthlyIncome,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Expenses',
          data: monthlyExpenses,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };
  };

  // Prepare data for category breakdown chart
  const getCategoryData = () => {
    const categories = {};
    
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += transaction.amount;
      }
    });

    const labels = Object.keys(categories);
    const data = Object.values(categories);

    const backgroundColors = [
      'rgba(255, 99, 132, 0.6)',
      'rgba(54, 162, 235, 0.6)',
      'rgba(255, 206, 86, 0.6)',
      'rgba(75, 192, 192, 0.6)',
      'rgba(153, 102, 255, 0.6)',
      'rgba(255, 159, 64, 0.6)',
      'rgba(199, 199, 199, 0.6)',
      'rgba(83, 102, 255, 0.6)',
    ];

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderWidth: 1,
        },
      ],
    };
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 mt-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Overview</h3>
        <div className="h-64">
          <Bar
            data={monthlyData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Categories</h3>
        <div className="h-64">
          <Pie
            data={categoryData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FinancialCharts;