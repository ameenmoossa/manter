import { ResponsiveContainer, AreaChart, Area } from 'recharts'

const SparkCard = ({ title, value, icon, data }) => (
  <div className="bg-[#F8F9FA] rounded-lg p-3 flex flex-col h-26.5 relative overflow-hidden border border-gray-100/50">
    <div className="flex items-center gap-3 z-10 p-2">
      <div className="w-8 h-8 rounded bg-blue-500 text-white flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-[12px] text-gray-500 font-medium">{title}</div>
        <div className="text-[18px] font-bold text-gray-900 leading-tight">{value}</div>
      </div>
    </div>
    <div className="absolute inset-x-0 bottom-0 h-15 opacity-70">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
          <defs>
             <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
             </linearGradient>
          </defs>
          <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#colorBlue)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default function OperationalHealthWidget() {
  const data1 = [
    { value: 50 }, { value: 60 }, { value: 55 }, { value: 70 }, { value: 65 }, { value: 80 }
  ]
  const data2 = [
    { value: 20 }, { value: 30 }, { value: 25 }, { value: 40 }, { value: 35 }, { value: 45 }
  ]
  return (
    <div className="flex flex-col gap-4 h-full pt-1">
      <SparkCard 
        title="Inventory Turn Over" 
        value="7.80" 
        data={data1} 
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
        } 
      />
      <SparkCard 
        title="Return Rate" 
        value="8.1" 
        data={data2} 
        icon={
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
        } 
      />
    </div>
  )
}
