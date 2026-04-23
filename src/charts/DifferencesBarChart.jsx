import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

const mockGroupedData = [
  { name: 'Rent', purchase: 52, sale: 32 },
  { name: 'Payroll', purchase: 42, sale: 10 },
  { name: 'Misc.', purchase: 28, sale: 38 },
  { name: 'Logistics', purchase: 23, sale: 48 },
  { name: 'Market', purchase: 70, sale: 28 },
  { name: 'Utilities', purchase: 25, sale: 45 },
]

const DifferencesBarChart = () => {
  return (
    <div className="w-full h-full min-h-62.5 relative pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart 
          data={mockGroupedData} 
          margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          barGap={2}
        >
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 12, fill: '#6B7280' }} 
            dy={10} 
          />
          <Tooltip 
            cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '13px', fontWeight: 600 }}
            labelStyle={{ color: '#6B7280', fontSize: '12px', marginBottom: '4px' }}
          />
          {/* Purchase Bar (Blue/Navy) */}
          <Bar dataKey="purchase" fill="#2E438D" radius={[6, 6, 0, 0]} maxBarSize={32} />
          {/* Sale Bar (Red) */}
          <Bar dataKey="sale" fill="#FF5359" radius={[6, 6, 0, 0]} maxBarSize={32} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default DifferencesBarChart
