import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const RevenueAreaChart = ({ data }) => {
  return (
    <div className="w-full h-full min-h-62.5">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} tickFormatter={(value) => `$${value/1000}k`} />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '13px', fontWeight: 600 }}
            labelStyle={{ color: '#6B7280', fontSize: '12px', marginBottom: '4px' }}
          />
          <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" animationDuration={500} />
          <Area type="monotone" dataKey="profit" stroke="#22C55E" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" animationDuration={500} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RevenueAreaChart
