import { LineChart, Line, ResponsiveContainer } from 'recharts'

const OperationalSparkline = ({ data, color = "#2563EB", dataKey = "revenue" }) => {
  return (
    <div className="w-full h-15">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={color} 
            strokeWidth={2} 
            dot={false}
            animationDuration={500}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default OperationalSparkline
