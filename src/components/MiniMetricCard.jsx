import { motion as Motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const springValue = useSpring(value, {
    stiffness: 100,
    damping: 20
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

  return <>{Math.round(displayValue)}</>
}

const MiniMetricCard = ({ title, value, colorClass = "bg-accent/10 text-accent", icon }) => {
  return (
    <Motion.div 
      whileHover={{ y: -2 }}
      className="bg-card rounded-lg p-4 shadow-sm border border-gray-100 flex items-center gap-4"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass}`}>
        {icon || (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )}
      </div>
      <div>
        <h4 className="text-xs font-medium text-textsecondary">{title}</h4>
        <div className="text-lg font-bold text-textprimary mt-0.5">
          <AnimatedNumber value={value} />
        </div>
      </div>
    </Motion.div>
  )
}




export default MiniMetricCard
