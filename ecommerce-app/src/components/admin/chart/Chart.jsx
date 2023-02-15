import React from 'react'

import styles from './Chart.module.scss'

import Card from '../../card/Card'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { selectOrderHistory } from '../../../stores/slice/orderSlice'
import { useSelector } from 'react-redux'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
}

const Chart = () => {
  const orders = useSelector(selectOrderHistory)

  // Create a new array of order status

  const array = []
  orders.map((item) => {
    const { orderStatus } = item
    array.push(orderStatus)
  })

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length
  }

  const x = getOrderCount(array, 'Order Placed...')
  console.log(x)

  const [q1, q2, q3, q4] = [
    'Order Placed...',
    'Processing...',
    'Shipped...',
    'Delivered',
  ]
  
  const placed = getOrderCount(array, q1)
  const processing = getOrderCount(array, q2)
  const shipped = getOrderCount(array, q3)
  const delivered = getOrderCount(array, q4)
  const data = {
    labels: ['Placed Orders', 'Processing', 'Shipped', 'Delivered'],
    datasets: [
      {
        label: 'Orders count',
        data: [placed, processing, shipped, delivered],
        backgroundColor: 'rgba(52, 145, 186, 0.88)',
      },
    ],
  }
  return (
    <div className={styles.chart}>
      <Card cardClass={styles.card}>
        <h3>Order status chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  )
}

export default Chart
