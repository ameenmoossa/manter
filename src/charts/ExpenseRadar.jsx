import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts'

export default function ExpenseRadar() {
  const data = [
    { subject: 'Rent', current: 60, budget: 80, fullMark: 100 },
    { subject: 'Payroll', current: 90, budget: 60, fullMark: 100 },
    { subject: 'Misc', current: 70, budget: 80, fullMark: 100 },
    { subject: 'Logistics', current: 60, budget: 40, fullMark: 100 },
    { subject: 'Market', current: 40, budget: 70, fullMark: 100 },
    { subject: 'Utility', current: 50, budget: 60, fullMark: 100 },
  ]

  return (
    <div className="absolute inset-0 flex flex-col items-center p-2">
      <ResponsiveContainer width="100%" height="85%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#E5E7EB" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B7280', fontSize: 11 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar name="Budget" dataKey="budget" stroke="#EF4444" fill="transparent" strokeWidth={1} />
          <Radar name="Current" dataKey="current" stroke="#3B82F6" fill="transparent" strokeWidth={1} />
        </RadarChart>
      </ResponsiveContainer>
      <div className="flex gap-4 items-center justify-center h-[15%] pb-2">
         <div className="flex items-center text-[11px] text-gray-500 font-medium"><span className="w-2 h-2 rounded-full bg-[#3B82F6] mr-2"></span> Current</div>
         <div className="flex items-center text-[11px] text-gray-500 font-medium"><span className="w-2 h-2 rounded-full bg-[#EF4444] mr-2"></span> Budget</div>
      </div>
    </div>
  )
}
