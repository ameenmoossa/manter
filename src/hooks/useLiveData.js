import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const isLocalHost =
  typeof window !== 'undefined' &&
  ['localhost', '127.0.0.1'].includes(window.location.hostname)

const socketUrl = import.meta.env.VITE_SOCKET_URL || (isLocalHost ? 'http://localhost:5000' : '')

const socket = socketUrl
  ? io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 2000,
      timeout: 3000,
      autoConnect: true,
    })
  : null

const alerts = [
  { id: 1, type: 'Critical', text: 'Inventory for Premium headphones Below Critical Threshold', time: '2 hr' },
  { id: 2, type: 'Warning', text: 'Inventory for Premium headphones Below Critical Threshold', time: '2 hr' },
  { id: 3, type: 'Success', text: 'Inventory for Premium headphones Below Critical Threshold', time: '2 hr' },
  { id: 4, type: 'Warning', text: 'Inventory for Premium headphones Below Critical Threshold', time: '2 hr' },
  { id: 5, type: 'Success', text: 'Inventory for Premium headphones Below Critical Threshold', time: '2 hr' },
]

const useLiveData = () => {
  const [isConnected, setIsConnected] = useState(Boolean(socket?.connected))
  const [isFallbackLive, setIsFallbackLive] = useState(!socketUrl)

  const [salesData, setSalesData] = useState({
    today: 28839.00,
    yesterday: 28839.00,
    thisMonth: 1203323.00,
    lastMonth: 999390.00,
  })

  const [revenueData, setRevenueData] = useState({
    totalRevenue: 838.00,
    netProfit: 323.00,
    totalOrder: 532,
    avgOrderValue: 400,
  })

  const [comparativeData, setComparativeData] = useState({
    todayCurrent: 323.00,
    todayPrevious: 234.00,
    todayDelta: '+23.33%',
    weekCurrent: 2323.00,
    weekPrevious: 753.00,
    weekDelta: '+39.0',
    monthCurrent: 8829.00,
    monthPrevious: 892.00,
    monthDelta: '+23.33%',
  })

  const [inventoryData, setInventoryData] = useState({
    stockLevel: 23,
    nearReorder: 45,
    outOfStock: 33,
  })

  const [financialData, setFinancialData] = useState({
    cashFlow: 334.4,
    pendingPayment: 55443.00,
    expenses: 9940.00,
  })

  const [chartData, setChartData] = useState([
    { day: 'Mon', revenue: 2800, profit: 3200 },
    { day: 'Tue', revenue: 2600, profit: 2900 },
    { day: 'Wed', revenue: 3100, profit: 2700 },
    { day: 'Thu', revenue: 2900, profit: 3100 },
    { day: 'Fri', revenue: 3300, profit: 2800 },
    { day: 'Sat', revenue: 3600, profit: 3000 },
    { day: 'Sun', revenue: 3800, profit: 3400 },
  ])

  useEffect(() => {
    const applyFallbackTick = () => {
      const growth = () => Math.floor(Math.random() * 80) + 10
      const smallShift = () => (Math.random() * 5) - 2

      setSalesData(prev => ({
        ...prev,
        today: prev.today + growth() * 0.5,
        yesterday: prev.yesterday + growth() * 0.2,
        thisMonth: prev.thisMonth + growth() * 2,
        lastMonth: prev.lastMonth + growth() * 0.75,
      }))

      setRevenueData(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + growth() * 0.1,
        netProfit: prev.netProfit + growth() * 0.05,
        totalOrder: prev.totalOrder + (Math.random() > 0.7 ? 1 : 0),
        avgOrderValue: Math.max(1, prev.avgOrderValue + smallShift()),
      }))

      setInventoryData(prev => ({
        ...prev,
        stockLevel: Math.max(0, Math.min(100, prev.stockLevel + smallShift())),
        nearReorder: Math.max(0, Math.min(100, prev.nearReorder + smallShift())),
        outOfStock: Math.max(0, Math.min(100, prev.outOfStock + smallShift())),
      }))

      setFinancialData(prev => ({
        ...prev,
        cashFlow: prev.cashFlow + growth() * 0.05,
        pendingPayment: prev.pendingPayment + growth() * 0.4,
        expenses: prev.expenses + growth() * 0.15,
      }))

      setComparativeData(prev => ({
        ...prev,
        todayCurrent: prev.todayCurrent + growth() * 0.02,
        weekCurrent: prev.weekCurrent + growth() * 0.06,
        monthCurrent: prev.monthCurrent + growth() * 0.12,
      }))

      setChartData(prev => prev.map(item => ({
        ...item,
        revenue: item.revenue + smallShift() * 10,
        profit: item.profit + smallShift() * 5,
      })))
    }

    const onConnect = () => {
      setIsConnected(true)
      setIsFallbackLive(false)
    }

    const onDisconnect = () => {
      setIsConnected(false)
      setIsFallbackLive(true)
    }

    const onValueUpdated = (data) => {
      const setters = {
        sales: setSalesData,
        revenue: setRevenueData,
        inventory: setInventoryData,
        financial: setFinancialData,
        comparative: setComparativeData,
      }

      if (setters[data.type]) {
        setters[data.type](prev => ({ ...prev, ...data.value }))
      }
    }

    if (socket) {
      socket.on('connect', onConnect)
      socket.on('disconnect', onDisconnect)
      socket.on('valueUpdated', onValueUpdated)
    }

    const fallbackSimulation = setInterval(() => {
      if (!socket?.connected) {
        setIsFallbackLive(true)
        applyFallbackTick()
      }
    }, 1500)

    return () => {
      if (socket) {
        socket.off('connect', onConnect)
        socket.off('disconnect', onDisconnect)
        socket.off('valueUpdated', onValueUpdated)
      }
      clearInterval(fallbackSimulation)
    }
  }, [])

  const updateValue = (type, value) => {
    if (socket?.connected) {
      socket.emit('updateValue', { type, value })
      return
    }

    if (type === 'sales') setSalesData(prev => ({ ...prev, ...value }))
    if (type === 'revenue') setRevenueData(prev => ({ ...prev, ...value }))
    if (type === 'inventory') setInventoryData(prev => ({ ...prev, ...value }))
    if (type === 'financial') setFinancialData(prev => ({ ...prev, ...value }))
    if (type === 'comparative') setComparativeData(prev => ({ ...prev, ...value }))
  }

  return {
    salesData,
    revenueData,
    comparativeData,
    inventoryData,
    financialData,
    alerts,
    chartData,
    isConnected: isConnected || isFallbackLive,
    updateValue,
  }
}

export default useLiveData
