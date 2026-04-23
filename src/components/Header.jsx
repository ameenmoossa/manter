import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const MotionDiv = motion.div;
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const [activeModal, setActiveModal] = useState('');
  const headerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsBranchOpen(false);
        setIsNotifOpen(false);
        setIsProfileOpen(false);
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleAction = (menu, actionName) => {
    setActiveModal(actionName);
    if (menu === 'branch') setIsBranchOpen(false);
    if (menu === 'notif') setIsNotifOpen(false);
    if (menu === 'settings') setIsSettingsOpen(false);
    if (menu === 'profile') setIsProfileOpen(false);
  };

  return (
    <>
      <header ref={headerRef} className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0 z-40 w-full relative">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight w-70">Report</h1>
          
          {/* Search Bar */}
          <div className="hidden md:flex items-center w-80 bg-[#F8F9FA] border border-gray-100/80 rounded-md focus-within:bg-white focus-within:ring-1 focus-within:ring-blue-100 transition-all shadow-sm overflow-hidden">
            <div className="pl-3.5 pr-2.5 flex items-center justify-center text-gray-400">
              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-[12.5px] font-medium text-gray-700 placeholder-gray-400 py-1.5 pr-4 m-0 h-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">

          {/* Branch Dropdown */}
          <div className="relative">
            <button onClick={() => { setIsBranchOpen(!isBranchOpen); setIsNotifOpen(false); setIsProfileOpen(false); setIsSettingsOpen(false); }} className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[13px] font-semibold flex items-center gap-1.5 border border-blue-100/50 focus:outline-none">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Main Branch
              <svg className={`w-3.5 h-3.5 transition-transform ${isBranchOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isBranchOpen && (
                <MotionDiv 
                  initial={{ opacity: 0, y: 14, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 14, scale: 0.95 }} 
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ willChange: "transform, opacity", transformZ: 0 }}
                  className="absolute top-full right-0 mt-3 w-48 bg-white border border-gray-100 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 z-50 py-2"
                >
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-800 focus:outline-none" onClick={() => handleAction('branch', 'Main Branch Details')}>Main Branch (Active)</button>
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-500 focus:outline-none" onClick={() => handleAction('branch', 'Development Environment')}>Development</button>
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-500 focus:outline-none" onClick={() => handleAction('branch', 'Staging Environment')}>Staging Env</button>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Dark Mode Toggle */}
          <button onClick={toggleDarkMode} className="text-gray-400 hover:text-blue-500 transition-colors focus:outline-none relative">
            {isDarkMode ? (
              <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsBranchOpen(false); setIsProfileOpen(false); setIsSettingsOpen(false); }} className={`text-gray-400 transition-colors relative focus:outline-none ${isNotifOpen ? 'text-blue-500' : 'hover:text-gray-600'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-white"></span>
            </button>
            
            <AnimatePresence>
              {isNotifOpen && (
                <MotionDiv 
                  initial={{ opacity: 0, y: 14, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 14, scale: 0.95 }} 
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ willChange: "transform, opacity", transformZ: 0 }}
                  className="absolute top-full -right-15 mt-4 w-72 bg-white border border-gray-100 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 z-50 overflow-hidden"
                >
                   <div className="bg-gray-50 border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                     <span className="text-[13px] font-bold text-gray-800">Notifications</span>
                     <span className="text-[11px] text-blue-600 font-medium cursor-pointer" onClick={() => handleAction('notif', 'Mark All Read')}>Mark all read</span>
                   </div>
                   <div className="max-h-64 overflow-y-auto w-full p-2 flex flex-col gap-1">
                     <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => handleAction('notif', 'Latency spike')}>
                        <p className="text-[12px] font-semibold text-gray-800">Server Alert: Latency spike</p>
                        <p className="text-[11px] text-gray-500 mt-1">Average response time exceeded 500ms.</p>
                     </div>
                     <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onClick={() => handleAction('notif', 'New User Sync Logs')}>
                        <p className="text-[12px] font-semibold text-gray-800">New User Sync</p>
                        <p className="text-[11px] text-gray-500 mt-1">Successfully imported 3,450 records.</p>
                     </div>
                   </div>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>
          
          {/* Settings */}
          <div className="relative">
            <button onClick={() => { setIsSettingsOpen(!isSettingsOpen); setIsBranchOpen(false); setIsNotifOpen(false); setIsProfileOpen(false); }} className={`text-gray-400 transition-colors focus:outline-none ${isSettingsOpen ? 'text-blue-500' : 'hover:text-gray-600'}`}>
              <svg className={`w-5 h-5 transition-transform duration-500 ${isSettingsOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </button>
            
            <AnimatePresence>
              {isSettingsOpen && (
                <MotionDiv 
                  initial={{ opacity: 0, y: 14, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 14, scale: 0.95 }} 
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ willChange: "transform, opacity", transformZ: 0 }}
                  className="absolute top-full -right-5 mt-4 w-48 bg-white border border-gray-100 rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 z-50 py-2"
                >
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-600 focus:outline-none" onClick={() => handleAction('settings', 'Account Control Settings')}>Account Control</button>
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-600 focus:outline-none" onClick={() => handleAction('settings', 'System Preferences')}>Preferences</button>
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm font-medium text-gray-600 focus:outline-none" onClick={() => handleAction('settings', 'Security Center')}>Security</button>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

          {/* Profile */}
          <div className="relative border-l border-gray-100 pl-3">
            <div onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); setIsBranchOpen(false); setIsSettingsOpen(false); }} className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-100 transition-colors">
                 <img src="https://i.pravatar.cc/150?u=a04258" alt="user profile" className="w-full h-full object-cover" />
              </div>
              <div className="text-left hidden md:flex flex-col">
                <p className="text-[13px] font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">Natashia Bunny</p>
                <p className="text-[11px] text-gray-500">natasiabunny@mail.com</p>
              </div>
              <svg className={`w-3.5 h-3.5 text-gray-400 ml-1 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <AnimatePresence>
              {isProfileOpen && (
                <MotionDiv 
                  initial={{ opacity: 0, y: 14, scale: 0.95 }} 
                  animate={{ opacity: 1, y: 0, scale: 1 }} 
                  exit={{ opacity: 0, y: 14, scale: 0.95 }} 
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  style={{ willChange: "transform, opacity", transformZ: 0 }}
                  className="absolute top-full right-0 mt-3 w-56 bg-white border border-gray-100 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 z-50 py-2 overflow-hidden"
                >
                   <div className="px-4 py-3 border-b border-gray-50">
                      <p className="text-[13px] font-bold text-gray-800">Signed in as</p>
                      <p className="text-[12px] truncate text-gray-500 font-medium">natasiabunny@mail.com</p>
                   </div>
                   <button className="w-full text-left px-4 py-2 mt-1 hover:bg-gray-50 text-[13px] font-medium text-gray-700 focus:outline-none" onClick={() => handleAction('profile', 'Your Profile')}>Your Profile</button>
                   <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[13px] font-medium text-gray-700 focus:outline-none" onClick={() => handleAction('profile', 'Upgrade Plan Details')}>Upgrade Plan</button>
                   <div className="border-t border-gray-50 my-1"></div>
                   <button className="w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 text-[13px] font-medium text-gray-500 focus:outline-none transition-colors" onClick={() => { window.location.href='/'; }}>Sign out</button>
                </MotionDiv>
              )}
            </AnimatePresence>
          </div>

        </div>
      </header>

      {/* Modern Global Modal to catch full interaction */}
      <AnimatePresence>
        {activeModal && (
          <MotionDiv 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={() => setActiveModal('')}
          >
            <MotionDiv 
              initial={{ opacity: 0, y: 14, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 14, scale: 0.95 }} 
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ willChange: "transform, opacity", transformZ: 0 }}
              className="bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] p-6 w-100 border border-white/20 ring-1 ring-black/5" 
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                 <h2 className="text-lg font-bold text-gray-900">{activeModal}</h2>
                 <button onClick={() => setActiveModal('')} className="text-gray-400 hover:text-red-500 p-1">
                   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
              </div>
              <p className="text-[13px] leading-relaxed text-gray-500 mb-6">
                This module has not yet been connected to the backend navigation routes. You clicked the <strong className="text-gray-700">"{activeModal}"</strong> active link.
              </p>
              <div className="flex justify-end">
                <button 
                  className="px-5 py-2.5 bg-blue-600 text-white text-[13px] font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors" 
                  onClick={() => setActiveModal('')}
                >
                  Confirm & Close
                </button>
              </div>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header;
