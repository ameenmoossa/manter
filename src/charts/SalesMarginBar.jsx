import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'

export default function SalesMarginBar() {
  const data = [
    { month: 'Jan', sales: 3600, margin: 2000, target: 3300 },
    { month: 'Feb', sales: 3600, margin: 2000, target: 3600 },
    { month: 'Mar', sales: 3600, margin: 2000, target: 3800 },
    { month: 'Apr', sales: 3600, margin: 3800, target: 3800 },
    { month: 'May', sales: 2900, margin: 3300, target: 3800 },
    { month: 'Jun', sales: 3600, margin: 3200, target: 3800 },
    { month: 'Jul', sales: 3600, margin: 3800, target: 3800 },
    { month: 'Aug', sales: 3800, margin: 3100, target: 3900 },
    { month: 'Sep', sales: 1700, margin: 1300, target: 3800 },
    { month: 'Oct', sales: 800, margin: 2000, target: 4000 },
    { month: 'Nov', sales: 2200, margin: 2600, target: 4200 },
    { month: 'Dec', sales: 2200, margin: 3100, target: 4500 },
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={0}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value}`} domain={[0, 4000]} ticks={[0, 1000, 2000, 3000, 4000]} />
        <Bar dataKey="sales" fill="#1E3A8A" radius={[4, 4, 0, 0]} barSize={14} />
        <Bar dataKey="margin" fill="#EF4444" radius={[4, 4, 0, 0]} barSize={14} />
        <Line type="monotone" dataKey="target" stroke="#F97316" strokeWidth={2} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
