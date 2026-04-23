import { motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedNumber = ({ value, format = (v) => v }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const springValue = useSpring(value, {
    stiffness: 260,
    damping: 24,
    mass: 1
  })

  useEffect(() => {
    springValue.set(value)
  }, [value, springValue])

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [springValue])

  return <>{format(displayValue)}</>
}

const KPICard = ({ title, value, prefix = '', suffix = '', trend = 0, formatting = "number", delay = 0 }) => {
  const MotionDiv = motion.div
  const isPositive = trend >= 0
  
  const formatter = (val) => {
    if (formatting === "currency") {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)
    }
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)
  }

  return (
    <MotionDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col justify-between h-full"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-textsecondary">{title}</h3>
        {trend !== 0 && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${isPositive ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            <svg className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      
      <div className="mt-2">
        <span className="text-2xl font-bold text-textprimary tracking-tight">
          {prefix && <span className="mr-1">{prefix}</span>}
          <AnimatedNumber value={value} format={formatter} />
          {suffix && <span className="ml-1">{suffix}</span>}
        </span>
      </div>
    </MotionDiv>
  )
}

export default KPICard
