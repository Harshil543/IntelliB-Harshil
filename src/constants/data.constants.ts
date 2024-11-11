// import calenderIcon from '@iconify/icons-mdi/calendar';
// import usersIcon from '@iconify/icons-mdi/attach-money';

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

// Sample data for Line Chart

export const lineChartDataYearly = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ],
  datasets: [
    {
      label: 'Income',
      data: [
        50000, 60000, 80000, 75000, 90000, 85000, 95000, 100000, 105000, 110000,
        115000, 120000
      ],
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

export const lineChartDataMonthly = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Income',
      data: [12000, 15000, 17000, 20000],
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

export const lineChartDataQuarterly = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [
    {
      label: 'Income',
      data: [45000, 60000, 75000, 90000],
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
