import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const defaultData = [
  { name: 'Opening', value: 5800 },
  { name: 'AP', value: -1200 },
  { name: 'Outflows', value: -900 },
  { name: 'Rent', value: -650 },
  { name: 'Closing', value: 3050 },
]

const CashFlowProjection = ({ data = defaultData }) => {
  return (
    <div className="h-full min-h-62.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 18, left: -10, bottom: 4 }}>
          <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
          <Tooltip
            cursor={{ fill: 'rgba(229, 231, 235, 0.3)' }}
            formatter={(value) => [`$${Math.abs(Number(value)).toLocaleString('en-US')}`, 'Amount']}
            contentStyle={{ border: 'none', borderRadius: '12px', boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)' }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.value >= 0 ? '#EF4444' : '#F97316'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CashFlowProjection
