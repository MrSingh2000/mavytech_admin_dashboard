'use client'

import React, { useState } from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { motion } from 'framer-motion'
import { Bell, Search, User, ChevronDown, ArrowUpRight, ArrowDownRight, Users } from 'lucide-react'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale)

const GaugeChart = ({ value, max, label }) => {
  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: ['#4CAF50', '#E0E0E0'],
        borderWidth: 0,
      },
    ],
  }

  const options = {
    cutout: '70%',
    rotation: -90,
    circumference: 180,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  }

  return (
    <div className="relative h-40 w-full">
      <Doughnut data={data} options={options} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{Math.round((value / max) * 100)}%</span>
        <span className="text-sm text-gray-500">{label}</span>
      </div>
    </div>
  )
}

const durations = [
    { label: 'Realtime', value: 'realtime' },
    { label: 'Last 60 minutes', value: '60min' },
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 15 days', value: '15d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Past 6 months', value: '6m' },
    { label: 'Last year', value: '1y' },
    { label: 'All time', value: 'all' },
  ]
  
  const generateDummyData = (duration) => {
    const now = new Date()
    const data = []
    let interval
    let count
  
    switch (duration) {
      case 'realtime':
        interval = 1000 // 1 second
        count = 60
        break
      case '60min':
        interval = 60 * 1000 // 1 minute
        count = 60
        break
      case '24h':
        interval = 60 * 60 * 1000 // 1 hour
        count = 24
        break
      case '15d':
        interval = 24 * 60 * 60 * 1000 // 1 day
        count = 15
        break
      case '30d':
        interval = 24 * 60 * 60 * 1000 // 1 day
        count = 30
        break
      case '6m':
        interval = 7 * 24 * 60 * 60 * 1000 // 1 week
        count = 26
        break
      case '1y':
        interval = 15 * 24 * 60 * 60 * 1000 // 15 days
        count = 24
        break
      case 'all':
        interval = 30 * 24 * 60 * 60 * 1000 // 1 month
        count = 60
        break
      default:
        interval = 60 * 60 * 1000 // 1 hour
        count = 24
    }
  
    for (let i = count - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * interval)
      data.push({
        x: date,
        y: Math.floor(Math.random() * 1000) + 500,
      })
    }
  
    return data
  }
  
  const StatCard = ({ title, value, change, icon }) => (
    <motion.div
      className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        {icon}
      </div>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className={`mt-2 flex items-center ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {change >= 0 ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
        {Math.abs(change)}%
      </p>
    </motion.div>
  )
  

export default function CompleteDashboard() {
    const [selectedDuration, setSelectedDuration] = useState('realtime')
  const data = generateDummyData(selectedDuration)
  
  const chartData = {
    datasets: [
      {
        label: 'Active Users',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: selectedDuration === 'realtime' ? 'second' : 'minute',
        },
        title: {
          display: false,
          text: 'Time',
        },
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Users',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    },
  }


  // 1. User Engagement and Growth
  const userGrowthData = {
    labels: ['2023-01-01', '2023-02-01', '2023-03-01', '2023-04-01', '2023-05-01', '2023-06-01'],
    datasets: [
      {
        label: 'Daily Active Users',
        data: [1000, 1500, 2000, 2500, 3000, 3500],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }

  const newVsReturningData = {
    labels: ['New Users', 'Returning Users'],
    datasets: [
      {
        data: [300, 700],
        backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
        hoverOffset: 5,
      },
    ],
  }

  const userRetentionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Cohort 1',
        data: [100, 90, 80, 70],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Cohort 2',
        data: [100, 85, 75, 65],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Cohort 3',
        data: [100, 95, 85, 75],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
    ],
  }

  const engagementByTimeData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Morning',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Afternoon',
        data: [28, 48, 40, 19, 86, 27, 90],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Evening',
        data: [45, 25, 16, 36, 67, 18, 76],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
    ],
  }

  // 2. Manuals and Resources
  const manualAccessData = {
    labels: ['Manual A', 'Manual B', 'Manual C', 'Manual D', 'Manual E'],
    datasets: [
      {
        label: 'Access Frequency',
        data: [120, 190, 300, 150, 200],
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
      },
    ],
  }

  const topEquipmentManualsData = {
    labels: ['Equipment X', 'Equipment Y', 'Equipment Z', 'Equipment W', 'Equipment V'],
    datasets: [
      {
        label: 'Views',
        data: [500, 400, 300, 200, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  }

  const timeSpentPerManualData = {
    labels: ['Manual A', 'Manual B', 'Manual C', 'Manual D', 'Manual E'],
    datasets: [
      {
        label: 'Time Spent (minutes)',
        data: [
          [5, 10, 15, 20, 25],
          [8, 12, 18, 22, 28],
          [6, 11, 16, 21, 26],
          [7, 13, 19, 23, 29],
          [9, 14, 17, 24, 30],
        ],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
      },
    ],
  }

  const manualsByCategoryData = {
    labels: ['Technical', 'User Guide', 'Maintenance', 'Safety', 'Troubleshooting'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  }

  // 3. Learning Center Videos
  const videoViewCountData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E'],
    datasets: [
      {
        label: 'View Count',
        data: [1200, 1900, 3000, 1500, 2500],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  }

  const videoCompletionRateData = {
    labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
    datasets: [
      {
        label: 'Completion Rate',
        data: [75, 60, 85, 70, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }

  const avgWatchDurationData = {
    labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
    datasets: [
      {
        label: 'Average Watch Duration (minutes)',
        data: [5.5, 4.2, 6.8, 3.9, 7.2],
        backgroundColor: 'rgba(255, 159, 64, 0.8)',
      },
    ],
  }

  const topVideosByEngagementData = {
    labels: ['Video A', 'Video B', 'Video C', 'Video D', 'Others'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  }

  // 4. Tools Store Insights
  const storePurchasesData = {
    labels: ['Category A', 'Category B', 'Category C', 'Category D'],
    datasets: [
      {
        label: 'Q1',
        data: [300, 250, 200, 150],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Q2',
        data: [350, 300, 250, 200],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Q3',
        data: [400, 350, 300, 250],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Q4',
        data: [450, 400, 350, 300],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
    ],
  }

  const topSellingToolsData = {
    labels: ['Tool A', 'Tool B', 'Tool C', 'Tool D', 'Tool E'],
    datasets: [
      {
        label: 'Sales',
        data: [500, 400, 300, 200, 100],
        backgroundColor: 'rgba(153, 102, 255, 0.8)',
      },
    ],
  }

  const conversionRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Conversion Rate',
        data: [2.5, 3.0, 3.5, 3.2, 3.8, 4.0],
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  }

  const avgCartValueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Cart Value',
        data: [75, 80, 85, 82, 88, 90],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }

  // 5. Job Opportunities
  const jobViewsByCategoryData = {
    labels: ['Medical', 'Nursing', 'Technical', 'Administrative', 'Research'],
    datasets: [
      {
        label: 'Views',
        data: [1200, 1000, 800, 600, 400],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
    ],
  }

  const applicationRateData = {
    labels: ['Medical', 'Nursing', 'Technical', 'Administrative', 'Research'],
    datasets: [
      {
        label: 'Application Rate',
        data: [15, 12, 10, 8, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  }

  const topCompaniesByJobListingsData = {
    labels: ['Company A', 'Company B', 'Company C', 'Company D', 'Others'],
    datasets: [
      {
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  }

  const jobApplicationTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Applications',
        data: [100, 120, 150, 140, 180, 200],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  }

  // 6. Fundraising Initiatives
  const totalFundsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Total Funds Raised',
        data: [10000, 25000, 45000, 70000, 100000, 150000],
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  }

  const eventParticipationData = {
    labels: ['Event A', 'Event B', 'Event C', 'Event D', 'Event E'],
    datasets: [
      {
        label: 'Number of Participants',
        data: [120, 200, 150, 80, 250],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const topDonorsData = {
    labels: ['Donor A', 'Donor B', 'Donor C', 'Donor D', 'Others'],
    datasets: [
      {
        data: [50000, 30000, 20000, 15000, 35000],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)',
        ],
      },
    ],
  }

  // 7. Technology Updates
  const userInteractionData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label:  'User Interactions',
        data: [500, 800, 1200, 1000, 1500, 2000],
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.1,
      },
    ],
  }

  const topTopicsData = {
    labels: ['AI in Healthcare', 'Telemedicine', 'Wearable Tech', 'Robotics', 'Genomics'],
    datasets: [
      {
        label: 'Interaction Count',
        data: [300, 250, 200, 150, 100],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  }

  const shareRateData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Share Rate',
        data: [10, 15, 20, 25, 30, 20, 15],
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      },
    ],
  }

  const userSentimentData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'User Sentiment',
        data: [65, 25, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  }

  // 8. Medical Exhibitions
  const eventViewsByRegionData = {
    labels: ['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Australia'],
    datasets: [
      {
        label: 'Event Views',
        data: [5000, 4500, 4000, 2000, 1500, 1000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const registrationRateData = {
    labels: ['Exhibition A', 'Exhibition B', 'Exhibition C', 'Exhibition D', 'Exhibition E'],
    datasets: [
      {
        label: 'Registration Rate',
        data: [75, 60, 85, 70, 80],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  }

  const eventAttendanceData = {
    labels: ['2018', '2019', '2020', '2021', '2022', '2023'],
    datasets: [
      {
        label: 'Attendance',
        data: [1000, 1200, 800, 1500, 1800, 2000],
        borderColor: 'rgba(54, 162, 235, 1)',
        tension: 0.1,
      },
    ],
  }

  const exhibitionFeedbackData = {
    labels: ['Exhibition A', 'Exhibition B', 'Exhibition C', 'Exhibition D', 'Exhibition E'],
    datasets: [
      {
        label: 'Average Rating',
        data: [4.5, 4.2, 4.8, 4.0, 4.6],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
    ],
  }

  // 9. User Feedback and Sentiment
  const featureRequestData = {
    labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'],
    datasets: [
      {
        label: 'Request Frequency',
        data: [50, 40, 30, 20, 10],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  const sentimentAnalysisData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Review Sentiment',
        data: [70, 20, 10],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  }

  const userIssuesData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
    datasets: [
      {
        label: 'Number of Issues',
        data: [20, 15, 25, 30, 20, 10],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">Real-time User Analytics</h1>

<div className="mb-8 flex flex-wrap gap-4">
  {durations.map((duration) => (
    <motion.button
      key={duration.value}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        selectedDuration === duration.value
          ? 'bg-blue-500 text-white'
          : 'bg-white bg-opacity-40 text-gray-700 hover:bg-opacity-50'
      }`}
      onClick={() => setSelectedDuration(duration.value)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {duration.label}
    </motion.button>
  ))}
</div>

<motion.div
  className="mb-8 rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  <h2 className="mb-4 text-xl font-semibold text-gray-800">Active Users</h2>
  <div className="h-80">
    <Line data={chartData} options={chartOptions} />
  </div>
</motion.div>

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
  <StatCard
    title="Average Daily Users"
    value="1,234"
    change={5.7}
    icon={<Users className="h-6 w-6 text-blue-500" />}
  />
  <StatCard
    title="Average Weekly Users"
    value="8,765"
    change={-2.3}
    icon={<Users className="h-6 w-6 text-green-500" />}
  />
  <StatCard
    title="Average Monthly Users"
    value="35,790"
    change={12.1}
    icon={<Users className="h-6 w-6 text-purple-500" />}
  />
</div>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">User Engagement and Growth</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Growth Over Time</h3>
            <div className="h-64">
              <Line data={userGrowthData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">New vs Returning Users</h3>
            <div className="h-64">
              <Pie data={newVsReturningData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Retention Cohort Analysis</h3>
            <div className="h-64">
              <Bar data={userRetentionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Engagement by Time of Day/Week</h3>
            <div className="h-64">
              <Bar data={engagementByTimeData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Manuals and Resources</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Manual Access Frequency</h3>
            <div className="h-64">
              <Bar data={manualAccessData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Equipment Manuals</h3>
            <div className="h-64">
              <Bar data={topEquipmentManualsData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Time Spent Per Manual</h3>
            <div className="h-64">
              <Bar data={timeSpentPerManualData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Manuals Accessed by Category</h3>
            <div className="h-64">
              <Doughnut data={manualsByCategoryData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Learning Center Videos</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Video View Count by Category</h3>
            <div className="h-64">
              <Bar data={videoViewCountData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Video Completion Rate</h3>
            <div className="h-64">
              <Line data={videoCompletionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Average Watch Duration per Video</h3>
            <div className="h-64">
              <Bar data={avgWatchDurationData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Videos by Engagement</h3>
            <div className="h-64">
              <Pie data={topVideosByEngagementData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Tools Store Insights</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Store Purchases by Tool Category</h3>
            <div className="h-64">
              <Bar data={storePurchasesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top-Selling Tools</h3>
            <div className="h-64">
              <Bar data={topSellingToolsData} options={{ responsive: true, maintainAspectRatio: false, indexAxis: 'y' as const }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Conversion Rate</h3>
            <div className="h-64">
              <Line data={conversionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Average Cart Value Over Time</h3>
            <div className="h-64">
              <Line data={avgCartValueData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Job Opportunities</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Job Views by Category</h3>
            <div className="h-64">
              <Bar data={jobViewsByCategoryData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Application Rate by Job Type</h3>
            <div className="h-64">
              <Bar data={applicationRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Companies by Job Listings</h3>
            <div className="h-64">
              <Doughnut data={topCompaniesByJobListingsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Job Application Trends</h3>
            <div className="h-64">
              <Line data={jobApplicationTrendsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Fundraising Initiatives</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Total Funds Raised Over Time</h3>
            <div className="h-64">
              <Line data={totalFundsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Fundraising Events Participation</h3>
            <div className="h-64">
              <Bar data={eventParticipationData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Donors by Contribution</h3>
            <div className="h-64">
              <Pie data={topDonorsData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Fundraising Goal vs. Achieved</h3>
            <GaugeChart value={75} max={100} label="Goal Progress" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Technology Updates</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Interaction with Updates</h3>
            <div className="h-64">
              <Line data={userInteractionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Top Topics by Interaction</h3>
            <div className="h-64">
              <Bar
                data={topTopicsData}
                options={{
                  indexAxis: 'y' as const,
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Share Rate of Technology Updates</h3>
            <div className="h-64">
              <Line data={shareRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Sentiment on Technology Updates</h3>
            <div className="h-64">
              <Bar data={userSentimentData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Medical Exhibitions</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Event Views by Region</h3>
            <div className="h-64">
              <Bar data={eventViewsByRegionData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Registration Rate by Event</h3>
            <div className="h-64">
              <Bar data={registrationRateData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Event Attendance Over Time</h3>
            <div className="h-64">
              <Line data={eventAttendanceData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Exhibition Feedback</h3>
            <div className="h-64">
              <Bar data={exhibitionFeedbackData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">User Feedback and Sentiment</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Overall User Satisfaction</h3>
            <GaugeChart value={85} max={100} label="Satisfaction Score" />
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Feature Request Frequency</h3>
            <div className="h-64">
              <Bar data={featureRequestData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Sentiment Analysis on Reviews</h3>
            <div className="h-64">
              <Bar data={sentimentAnalysisData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Issues Over Time</h3>
            <div className="h-64">
              <Line data={userIssuesData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}