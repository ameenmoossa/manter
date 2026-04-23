import { motion as Motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedNumber = ({ value, format = (v) => v }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 20,
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

const ComparativeCard = ({ title, current, previous, delta, isCurrency = false }) => {
  const isPositive = parseFloat(delta) >= 0

  const formatter = (val) => {
    if (isCurrency) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)
    }
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val)
  }

  return (
    <Motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-card rounded-xl p-5 shadow-sm border border-gray-100 h-full flex flex-col justify-between"
    >
      <h3 className="text-sm font-medium text-textsecondary mb-4">{title}</h3>
      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-xs text-textsecondary mb-1">Current</span>
          <span className="text-xl font-bold text-textprimary">
            <AnimatedNumber value={current} format={formatter} />
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-textsecondary mb-1">Previous</span>
          <span className="text-xl font-bold text-gray-400">
            <AnimatedNumber value={previous} format={formatter} />
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-xs text-textsecondary">Growth</span>
        <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-success' : 'text-danger'}`}>
          <svg className={`w-3 h-3 ${isPositive ? '' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          <Motion.span
            key={delta}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {delta}
          </Motion.span>
        </div>
      </div>
    </Motion.div>
  )
}

export default ComparativeCard
