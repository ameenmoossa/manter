import React, { useState } from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('docs');
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    {
      id: 'apps',
      label: 'Product',
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      )
    },
    {
      id: 'docs',
      label: 'Branch Master',
      subItems: ['Branch Master', 'Warehouse Master', 'Storage Bin Master', 'Branch Group'],
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'wallet',
      label: 'Wallet',
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3-3v8a3 3 0 003 3z" />
        </svg>
      )
    },
    {
      id: 'bell',
      label: 'Notification',
      icon: (
        <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    }
  ];

  return (
    <Motion.div 
      layout
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      style={{ 
        width: isExpanded ? 240 : 80,
        willChange: "transform, opacity",
        transformZ: 0
      }}
      className="bg-[#F8F9FA] border-r border-gray-100 flex flex-col items-start py-5 shrink-0 h-full relative z-20 overflow-x-hidden overflow-y-auto"
      onClick={() => { if (!isExpanded) setIsExpanded(true); }}
    >
      {/* Top Header Dots & Title */}
      <div className="flex mb-8 w-full items-center shrink-0 pl-4.75 h-6 overflow-hidden pr-4 relative">
        <div className="flex gap-1.5 shrink-0 cursor-pointer" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] hover:scale-110 transition-transform"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] hover:scale-110 transition-transform"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F] hover:scale-110 transition-transform"></div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <Motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}
              className="ml-auto mr-auto pl-2 font-bold text-lg text-gray-800 tracking-tight shrink-0"
            >
              Report
            </Motion.span>
          )}
        </AnimatePresence>
      </div>
      
      {/* Avatar & Profile */}
      <div className="flex items-center w-full shrink-0 mb-8 pl-4 overflow-hidden pr-4">
        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0 border border-black/5">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="user profile" className="w-full h-full object-cover" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <Motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.1 }}
              className="ml-3 flex flex-col pt-0.5 whitespace-nowrap overflow-hidden"
            >
              <p className="text-[10px] font-bold text-gray-400 tracking-wide uppercase">Product Designer</p>
              <p className="text-sm font-semibold text-gray-800 mt-0.5">Andrew Smith</p>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-4 w-full shrink-0 mt-3 pl-7.5 overflow-hidden whitespace-nowrap">
        <AnimatePresence>
          {isExpanded && (
            <Motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}>
              Main
            </Motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col w-full px-3 gap-0.5 pb-10">
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          const showSubItems = isActive && isExpanded && item.subItems;

          return (
            <div key={item.id} className="w-full flex flex-col shrink-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab(item.id);
                  if (item.subItems) setIsExpanded(!isExpanded || !showSubItems);
                }}
                className={`w-full h-11 flex items-center rounded-xl transition-colors outline-none focus:outline-none mb-0.5 overflow-hidden pl-4.5 pr-3 shrink-0 ${isActive ? (isExpanded && item.subItems ? '' : 'bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.1)]') : 'hover:bg-gray-100/50'}`}
              >
                {!isExpanded && isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-lg"></div>
                )}
                
                <div className={`shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800 transition-colors'}`}>
                  {item.icon}
                </div>
                
                <AnimatePresence>
                  {isExpanded && (
                    <Motion.span 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                      className={`ml-3 text-[13px] font-semibold whitespace-nowrap mt-0.5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                    >
                      {item.label}
                    </Motion.span>
                  )}
                </AnimatePresence>

                {isExpanded && item.subItems && (
                  <svg className={`w-3.5 h-3.5 ml-auto text-gray-400 transition-transform ${showSubItems ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                )}
              </button>

              {/* Nested Sub-items Array via Tree Lines */}
              <AnimatePresence>
                {showSubItems && (
                  <Motion.div 
                    layout
                    initial={{ opacity: 0, y: -10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="flex flex-col ml-5.25 mt-1 overflow-hidden"
                  >
                    {item.subItems.map((subItem, index) => (
                      <div key={index} className="flex h-11 relative">
                        {/* Curved connecting line mapping visual structure */}
                        <div className="absolute left-0 -top-2.5 w-3 h-7.5 border-l-[1.5px] border-b-[1.5px] border-gray-300 rounded-bl-2.5"></div>
                        {/* Straight trunk dropping farther down if not last item */}
                        {index !== item.subItems.length - 1 && (
                          <div className="absolute left-0 top-5 w-0 h-full border-l-[1.5px] border-gray-300"></div>
                        )}
                        
                        <button className="ml-6 mt-1 text-left text-xs font-medium text-gray-500 hover:text-gray-900 w-full hover:bg-gray-100/50 rounded-lg px-2 h-8.5 flex items-center transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
                          {subItem}
                        </button>
                      </div>
                    ))}
                  </Motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </nav>
    </Motion.div>
  )
}

export default Sidebar
