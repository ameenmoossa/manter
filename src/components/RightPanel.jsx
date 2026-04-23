import AlertCard from './AlertCard'
import { motion as Motion } from 'framer-motion'
import AlertFeedDonut from '../charts/AlertFeedDonut'

const RightPanel = ({ inventoryData, alerts }) => {
  return (
    <aside className="w-80 bg-card border-l border-gray-100 overflow-y-auto shrink-0 flex flex-col">
      <div className="p-5 border-b border-gray-100 bg-pagebg/30">
        <h2 className="text-lg font-bold text-textprimary mb-1">Live Feed & Alerts</h2>
        <p className="text-xs text-textsecondary">Real-time system monitoring</p>
      </div>

      <div className="p-5 flex-1 flex flex-col gap-6">
        
        {/* Mini Chart Area */}
        <div className="h-[280px]">
           <AlertFeedDonut alerts={alerts} />
        </div>

        <div className="w-full h-px bg-gray-100"></div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-textprimary flex items-center justify-between">
            Recent Alerts
            <span className="bg-danger/10 text-danger text-xs px-2 py-0.5 rounded-full">{alerts.length}</span>
          </h3>
          
          <div className="flex flex-col">
            {alerts.slice(0, 5).map((alert, idx) => (
              <Motion.div
                key={alert.id + '-' + idx}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <AlertCard type={alert.type} text={alert.text} time={alert.time} />
              </Motion.div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-gray-100"></div>
        
        {/* Quick Stats Summary in Right Panel */}
        <div>
           <h3 className="text-sm font-semibold text-textprimary mb-3">Inventory Quick Look</h3>
           <div className="bg-pagebg rounded-lg p-3 grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                 <span className="text-xs text-textsecondary">Out of Stock</span>
                 <Motion.span 
                   key={inventoryData.outOfStock}
                   initial={{ scale: 1.1, color: '#EF4444' }}
                   animate={{ scale: 1, color: '#111827' }}
                   className="text-lg font-bold text-textprimary"
                 >
                   {inventoryData.outOfStock}
                 </Motion.span>
              </div>
              <div className="flex flex-col border-l border-gray-200 pl-3">
                 <span className="text-xs text-textsecondary">Near Reorder</span>
                 <Motion.span 
                   key={inventoryData.nearReorder}
                   initial={{ scale: 1.1, color: '#F97316' }}
                   animate={{ scale: 1, color: '#111827' }}
                   className="text-lg font-bold text-textprimary"
                 >
                   {inventoryData.nearReorder}
                 </Motion.span>
              </div>
           </div>
        </div>
        
      </div>
    </aside>
  )
}

export default RightPanel
