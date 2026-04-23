import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

export default function StockHealthDonut() {
  const data = [
    { name: 'Day On Hand', value: 30, color: '#EF4444' },     // Red
    { name: 'Stock-Out %', value: 20, color: '#F97316' },     // Orange
    { name: 'Dead-stock %', value: 50, color: '#3B82F6' }      // Blue
  ]

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul className="flex flex-col gap-3 justify-center pl-4">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} className="flex items-center text-[12px] text-gray-700 font-medium">
            <span 
              className="w-4 h-2.5 rounded-sm mr-2" 
              style={{ backgroundColor: entry.color }}
            />
            {entry.value}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center p-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="40%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
