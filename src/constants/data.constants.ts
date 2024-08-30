import usersIcon from '@iconify/icons-mdi/user';
import calenderIcon from '@iconify/icons-mdi/calendar';
import moneyIcon from '@iconify/icons-mdi/attach-money';

export const dashboardItems = [
  {
    id: 1,
    title: 'Tenants',
    count: 30,
    icon: usersIcon
  },
  {
    id: 2,
    title: 'Invoice Pending',
    count: 'Rs. 200,000',
    icon: moneyIcon
  },
  {
    id: 3,
    title: 'Total Bills',
    count: 'Rs. 200,000',
    icon: moneyIcon
  },
  {
    id: 4,
    title: 'Monthly Revenue',
    count: 30,
    icon: calenderIcon
  }
];

export const paymentHistory = [
  {
    id: 1,
    title: 'Tenant 1',
    billNo: 'xyz10132466',
    amount: 2000,
    dueDate: 7
  },
  {
    id: 2,
    title: 'Tenant 2',
    billNo: 'xyz10132466',
    amount: 2000,
    dueDate: 7
  },
  {
    id: 3,
    title: 'Tenant 3',
    billNo: 'xyz10132466',
    amount: 2000,
    dueDate: 7
  },
  {
    id: 4,
    title: 'Tenant 4',
    billNo: 'xyz10132466',
    amount: 2000,
    dueDate: 7
  },
  {
    id: 5,
    title: 'Tenant 5',
    billNo: 'xyz10132466',
    amount: 2000,
    dueDate: 7
  }
];

export const pieChartData = {
  labels: [],
  datasets: [
    {
      data: [63, 25],
      backgroundColor: ['#4318FF', '#6AD2FF']
    }
  ]
};

// Sample data for Line Chart
export const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Income',
      data: [4000, 4500, 3000, 5000, 6000, 5500, 7000],
      borderColor: '#4318FF',
      backgroundColor: '#4318FF'
    },
    {
      label: 'Expenses',
      data: [2000, 2500, 1500, 3000, 2500, 3000, 3500],
      borderColor: '#6AD2FF',
      backgroundColor: '#6AD2FF'
    }
  ]
};
