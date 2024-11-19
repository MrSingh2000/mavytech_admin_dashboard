import { useState } from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { motion } from 'framer-motion'
import { FiArrowUpRight, FiArrowDownRight, FiUsers } from 'react-icons/fi'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Title, Tooltip, Legend, TimeScale)

const GaugeChart = ({ value, max, label }) => {
  const data = {
    datasets: [
      {
        data: [value, max - value],
        backgroundColor: ['#4CAF50', '#FF6384'],
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
        <span className="text-3xl font-bold mt-16">{Math.round((value / max) * 100)}%</span>
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
]

const generateRealtimeData = (duration: any) => {
  const now = new Date()
  const data: { x: Date; y: number }[] = [];
  let interval: any
  let count: any

  switch (duration) {
    case 'realtime':
      interval = 60 * 1000
      count = 60
      break
    case '60min':
      interval = 60 * 1000
      count = 60
      break
    case '24h':
      interval = 60 * 60 * 1000
      count = 24
      break
    case '15d':
      interval = 24 * 60 * 60 * 1000
      count = 15
      break
    case '30d':
      interval = 1 * 24 * 60 * 60 * 1000
      count = 30
      break
    default:
      interval = 60 * 60 * 1000
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
      {change >= 0 ? <FiArrowUpRight className="mr-1 h-4 w-4" /> : <FiArrowDownRight className="mr-1 h-4 w-4" />}
      {Math.abs(change)}%
    </p>
  </motion.div>
)


export default function Home() {
  const [selectedDuration, setSelectedDuration] = useState('realtime')
  const data = generateRealtimeData(selectedDuration)

  const chartData = {
    datasets: [
      {
        label: 'Active Users',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 1,
        pointHoverRadius: 3,
        borderWidth: 2,
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
          display: true,
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


  // User Engagement and Growth
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

  // Manuals and Resources
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

  // Learning Center Videos
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

  // Tools Store Insights

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

  // Job Opportunities
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

  // Fundraising Initiatives
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

  // Technology Updates
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

  // Medical Exhibitions
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

  // User Feedback and Sentiment
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
      <section className="mb-12">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">Real-time User Analytics</h2>

      <div className="mb-8 flex flex-wrap gap-4">
        {durations.map((duration) => (
          <motion.button
            key={duration.value}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${selectedDuration === duration.value
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
        className="mb-4 rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Active Users</h2>
        <div className="h-80">
          <Line data={chartData} options={chartOptions} />
        </div>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <StatCard
          title="Average Daily Users"
          value="1,234"
          change={5.7}
          icon={<FiUsers className="h-6 w-6 text-blue-500" />}
        />
        <StatCard
          title="Average Weekly Users"
          value="8,765"
          change={-2.3}
          icon={<FiUsers className="h-6 w-6 text-green-500" />}
        />
        <StatCard
          title="Average Monthly Users"
          value="35,790"
          change={12.1}
          icon={<FiUsers className="h-6 w-6 text-purple-500" />}
        />
      </div>
      </section>
      {/* User Engagement and Growth */}
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
        </div>
      </section>
      {/* Manuals and Resources */}
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
        </div>
      </section>
      {/* Learning Center Videos */}
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
        </div>
      </section>
      {/* Tools Store Insights */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Tools Store Insights</h2>
        <div className="grid gap-8 lg:grid-cols-2">
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
        </div>
      </section>
      {/* Job Opportunities */}
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
      {/* Fundraising Initiatives */}
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
        </div>
      </section>
      {/* Technology Updates */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Technology Updates</h2>
        <div className="grid gap-8 lg:grid-cols-2">
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
            <h3 className="mb-4 text-lg font-medium text-gray-700">User Sentiment on Technology Updates</h3>
            <div className="h-64">
              <Bar data={userSentimentData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </section>
      {/* Medical Exhibitions */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Medical Exhibitions</h2>
        <div className="grid gap-8 lg:grid-cols-2">
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
        </div>
      </section>
      {/* User Feedback and Sentiment */}
      <section>
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">User Feedback and Sentiment</h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white bg-opacity-40 p-6 backdrop-blur-lg transition-all hover:bg-opacity-50 hover:shadow-lg">
            <h3 className="mb-4 text-lg font-medium text-gray-700">Overall User Satisfaction</h3>
            <GaugeChart value={85} max={100} label="Satisfaction Score" />
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