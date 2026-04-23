import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

export default function AlertFeedDonut() {
  const data = [
    { name: 'Electronics', value: 25, color: '#EE433F' }, // Red
    { name: 'Home Goods', value: 20, color: '#F7813A' }, // Orange
    { name: 'Clothing', value: 15, color: '#4A72FF' }, // Blue
    { name: 'Others', value: 20, color: '#263D86' }, // Dark Blue
    { name: 'Food & Beverages', value: 20, color: '#FFC46D' }, // Light Orange
  ]

  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 ml-8">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex items-center gap-3">
            <div 
              className="w-5 h-4 rounded-md shrink-0" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[13px] text-[#334155] font-semibold whitespace-nowrap">
              {entry.payload.name}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-100">
        <div className="text-[#4A72FF]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            <circle cx="12" cy="3" r="1" fill="currentColor" />
          </svg>
        </div>
        <h2 className="text-[15px] font-bold text-[#4A72FF]">Alert Feed</h2>
      </div>

      <div className="flex-1 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="25%"
              cy="50%"
              innerRadius="48%"
              outerRadius="85%"
              paddingAngle={5}
              cornerRadius={6}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              stroke="none"
              animationBegin={0}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              content={renderLegend} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{ right: 0, width: '60%' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

