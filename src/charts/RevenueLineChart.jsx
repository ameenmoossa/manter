import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ComposedChart } from 'recharts'

export default function RevenueLineChart() {
  const data = [
    { day: 'Mon', revenue: 2300, profit: 2000 },
    { day: 'Tue', revenue: 2800, profit: 3000 },
    { day: 'Wed', revenue: 2800, profit: 2400 },
    { day: 'Thu', revenue: 3000, profit: 3000 },
    { day: 'Fri', revenue: 3300, profit: 4000 },
    { day: 'Sat', revenue: 3000, profit: 3400 },
    { day: 'Sun', revenue: 3500, profit: 3800 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
           <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
           </linearGradient>
           <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
           </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value}`} domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]} />
        <Area type="monotone" dataKey="profit" stroke="none" fill="url(#colorProfit)" />
        <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#colorRevenue)" />
        <Line type="monotone" dataKey="revenue" stroke="#EF4444" strokeWidth={2} dot={false} activeDot={{ r: 6 }} animationDuration={500} />
        <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 6 }} animationDuration={500} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
