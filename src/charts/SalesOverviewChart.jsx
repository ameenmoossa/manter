import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const defaultData = [
  { day: 'Mon', current: 2600, previous: 3100 },
  { day: 'Tue', current: 2900, previous: 2800 },
  { day: 'Wed', current: 2400, previous: 3000 },
  { day: 'Thu', current: 3200, previous: 2700 },
  { day: 'Fri', current: 2800, previous: 3300 },
  { day: 'Sat', current: 3500, previous: 2900 },
  { day: 'Sun', current: 3000, previous: 3600 },
]

const SalesOverviewChart = ({ data = defaultData }) => {
  return (
    <div className="h-full min-h-65 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 12, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            domain={[0, 4000]}
            ticks={[0, 1000, 2000, 3000, 4000]}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)' }}
            formatter={(value) => [`$${Number(value).toLocaleString('en-US')}`, '']}
          />
          <Line type="monotone" dataKey="current" stroke="#2563EB" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
          <Line type="monotone" dataKey="previous" stroke="#EF4444" strokeWidth={3} dot={false} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default SalesOverviewChart
