import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const Top5ProductsBar = () => {
  const data = [
    { name: 'Premium HD', sales: 4000 },
    { name: 'Wireless Earbuds', sales: 3000 },
    { name: 'Gaming Mouse', sales: 2000 },
    { name: 'Mechanical KB', sales: 2780 },
    { name: '4K Monitor', sales: 1890 },
  ].sort((a, b) => b.sales - a.sales) // ensure sorting

  return (
    <div className="w-full h-full min-h-62.5">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
          <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#111827', fontWeight: 500 }} width={100} />
          <Tooltip 
            cursor={{ fill: 'rgba(229, 231, 235, 0.4)' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            itemStyle={{ fontSize: '13px', fontWeight: 600, color: '#1E3A5F' }}
            labelStyle={{ display: 'none' }}
          />
          <Bar dataKey="sales" fill="#1E3A5F" radius={[0, 4, 4, 0]} barSize={20} animationDuration={500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Top5ProductsBar
