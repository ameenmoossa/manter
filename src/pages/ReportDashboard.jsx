import React from 'react'
import { motion as Motion, AnimatePresence } from 'framer-motion'
import useLiveData from '../hooks/useLiveData'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import CardWrapper from '../components/CardWrapper'
import OperationalHealthWidget from '../components/OperationalHealthWidget'
import PerformanceSummaryList from '../components/PerformanceSummaryList'
import LiveIndicator from '../components/LiveIndicator'

import RevenueLineChart from '../charts/RevenueLineChart'
import StockHealthDonut from '../charts/StockHealthDonut'
import SalesMarginBar from '../charts/SalesMarginBar'
import AlertFeedDonut from '../charts/AlertFeedDonut'
import ExpenseRadar from '../charts/ExpenseRadar'
import CashFlowWaterfall from '../charts/CashFlowWaterfall'
import CashFlowProjection from '../charts/CashFlowProjection'
import DifferencesBarChart from '../charts/DifferencesBarChart'
import Top5ProductsBar from '../charts/Top5ProductsBar'

// Animations
const floatIn = {
  hidden: { opacity: 0, y: 14, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 260,
      damping: 22,
      mass: 1
    } 
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { 
      staggerChildren: 0.05, 
      delayChildren: 0.02 
    } 
  }
}

const AnimatedBlock = React.memo(({ children, className }) => (
  <Motion.div variants={floatIn} className={className}>
    {children}
  </Motion.div>
))

// Helpers
const lineIcon = (
  <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const SmallRedReset = React.memo(() => (
  <button onClick={() => window.location.reload()} className="flex items-center justify-center w-8 h-8 bg-red-50 border border-red-100 rounded-lg cursor-pointer text-red-500 hover:bg-red-200 transition-all focus:outline-none shadow-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="10" y1="14" x2="14" y2="18" strokeWidth="2.5" /><line x1="14" y1="14" x2="10" y2="18" strokeWidth="2.5" /></svg></button>
))

// ─── NEW DateSelector with Calendar Picker ───────────────────────────────────
const DateSelector = React.memo(({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('preset');
  const [localSelected, setLocalSelected] = React.useState('Today');
  const [singleDate, setSingleDate] = React.useState(null);
  const [rangeStart, setRangeStart] = React.useState(null);
  const [rangeEnd, setRangeEnd] = React.useState(null);
  const [rangePicking, setRangePicking] = React.useState(false);
  const [singleCur, setSingleCur] = React.useState({ y: 2025, m: 3 });
  const [rangeLCur, setRangeLCur] = React.useState({ y: 2025, m: 3 });
  const dropdownRef = React.useRef(null);

  const currentSelected = selected || localSelected;
  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
  const today = new Date(2025, 3, 5);
  const presets = ['Today','Yesterday','Last 7 Days','Last 30 Days','This Month','Last Month','This Year','All Time'];

  React.useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const addMonth = (c, d) => {
    let m = c.m + d, y = c.y;
    if (m > 11) { m = 0; y++; } else if (m < 0) { m = 11; y--; }
    return { y, m };
  };

  const same = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const fmt = (d) => d ? `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()}, ${d.getFullYear()}` : '';

  const handlePreset = (opt) => {
    if (onSelect) onSelect(opt); else setLocalSelected(opt);
    setIsOpen(false);
  };

  const handleSingleDayClick = (cur, d) => {
    setSingleDate(new Date(cur.y, cur.m, d));
  };

  const handleRangeDayClick = (cur, d) => {
    const pick = new Date(cur.y, cur.m, d);
    if (!rangePicking || rangeEnd) {
      setRangeStart(pick); setRangeEnd(null); setRangePicking(true);
    } else {
      if (pick < rangeStart) { setRangeEnd(rangeStart); setRangeStart(pick); }
      else setRangeEnd(pick);
      setRangePicking(false);
    }
  };

  const applySingle = () => {
    if (!singleDate) return;
    const label = fmt(singleDate);
    if (onSelect) onSelect(label); else setLocalSelected(label);
    setIsOpen(false);
  };

  const applyRange = () => {
    if (!rangeStart || !rangeEnd) return;
    const label = `${fmt(rangeStart)} – ${fmt(rangeEnd)}`;
    if (onSelect) onSelect(label); else setLocalSelected(label);
    setIsOpen(false);
  };

  const getDayClass = (cur, d, mode) => {
    const dt = new Date(cur.y, cur.m, d);
    const isToday = same(dt, today);
    let base = "text-center py-1.5 text-xs rounded-md cursor-pointer transition-colors ";
    
    if (mode === 'single') {
      if (same(dt, singleDate)) return base + "bg-blue-600 text-white font-bold shadow-md transform scale-110 z-10";
      if (isToday) return base + "text-blue-600 font-black hover:bg-blue-50 ring-1 ring-blue-100";
      return base + "text-gray-700 hover:bg-gray-100 hover:text-blue-600";
    } else {
      if (rangeStart && rangeEnd) {
        if (same(dt, rangeStart)) return base + "bg-blue-600 text-white font-bold shadow-md rounded-r-none z-10";
        if (same(dt, rangeEnd)) return base + "bg-blue-600 text-white font-bold shadow-md rounded-l-none z-10";
        if (dt > rangeStart && dt < rangeEnd) return base + "bg-blue-50 text-blue-700 rounded-none font-semibold border-y border-blue-100";
      } else if (same(dt, rangeStart)) {
        return base + "bg-blue-600 text-white font-bold shadow-md z-10";
      }
      if (isToday) return base + "text-blue-600 font-black hover:bg-blue-50 ring-1 ring-blue-100";
      return base + "text-gray-700 hover:bg-gray-100 hover:text-blue-600";
    }
  };

  const renderGrid = (cur, mode, onClick) => {
    const first = new Date(cur.y, cur.m, 1).getDay();
    const days = new Date(cur.y, cur.m + 1, 0).getDate();
    return (
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map(d => <div key={d} className="text-center text-[11px] font-bold text-gray-300 py-2 uppercase tracking-tighter">{d}</div>)}
        {Array(first).fill(null).map((_, i) => <div key={`e${i}`} />)}
        {Array(days).fill(null).map((_, i) => {
          const d = i + 1;
          return (
            <div key={d} className={getDayClass(cur, d, mode)} onClick={() => onClick(cur, d)}>
              {d}
            </div>
          );
        })}
      </div>
    );
  };

  const triggerLabel = currentSelected.length > 20 ? currentSelected.slice(0, 19) + '…' : currentSelected;

  return (
    <div ref={dropdownRef} className="flex items-center gap-2 text-[11px] font-semibold text-gray-500 relative">
      <span className="hidden sm:inline">Date Range:</span>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 rounded-lg cursor-pointer text-xs font-semibold text-blue-600 shadow-sm min-w-32.5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-left">{triggerLabel}</span>
        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 22, mass: 1 }}
            className={`absolute top-[calc(100%+8px)] right-0 z-999 bg-white border border-gray-100 rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden ${activeTab === 'range' ? 'w-145' : 'w-70'}`}
          >
            <div className="flex border-b border-gray-100 bg-gray-50/50">
              {['preset', 'single', 'range'].map(t => (
                <button key={t} onClick={() => setActiveTab(t)} className={`flex-1 py-3 text-[10px] font-bold tracking-wider uppercase bg-transparent transition-all focus:outline-none ${activeTab === t ? 'text-blue-600 border-b-2 border-b-blue-600 bg-blue-50/30' : 'text-gray-400 hover:text-gray-600'}`}>{t === 'preset' ? 'Quick' : t === 'single' ? 'Single' : 'Range'}</button>
              ))}
            </div>
            {activeTab === 'preset' && (
              <div className="p-2.5 flex flex-col gap-1">
                {presets.map(opt => (
                  <button key={opt} onClick={() => handlePreset(opt)} className={`w-full text-left px-3.5 py-2.5 text-xs rounded-lg transition-all focus:outline-none flex items-center justify-between ${currentSelected === opt ? 'bg-blue-50 text-blue-600 font-bold' : 'bg-transparent text-gray-700 hover:bg-gray-50'}`}>{opt}{currentSelected === opt && <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>}</button>
                ))}
              </div>
            )}

            {activeTab === 'single' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => setSingleCur(addMonth(singleCur, -1))} className="p-1 px-2 hover:bg-gray-100 rounded text-gray-400">&lt;</button>
                  <span className="text-[12px] font-bold text-gray-700">{MONTHS[singleCur.m]} {singleCur.y}</span>
                  <button onClick={() => setSingleCur(addMonth(singleCur, 1))} className="p-1 px-2 hover:bg-gray-100 rounded text-gray-400">&gt;</button>
                </div>
                {renderGrid(singleCur, 'single', handleSingleDayClick)}
                <button onClick={applySingle} className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 transition-all">Apply Selection</button>
              </div>
            )}

            {activeTab === 'range' && (
              <div className="p-4">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <button onClick={() => setRangeLCur(addMonth(rangeLCur, -1))} className="p-1 px-2 hover:bg-gray-100 rounded text-gray-400">&lt;</button>
                      <span className="text-[12px] font-bold text-gray-700">{MONTHS[rangeLCur.m]} {rangeLCur.y}</span>
                      <div className="w-8"></div>
                    </div>
                    {renderGrid(rangeLCur, 'range', handleRangeDayClick)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <div className="w-8"></div>
                      <span className="text-[12px] font-bold text-gray-800">{MONTHS[addMonth(rangeLCur, 1).m]} {addMonth(rangeLCur, 1).y}</span>
                      <button onClick={() => setRangeLCur(addMonth(rangeLCur, 1))} className="p-1 px-2 hover:bg-gray-100 rounded text-gray-400">&gt;</button>
                    </div>
                    {renderGrid(addMonth(rangeLCur, 1), 'range', handleRangeDayClick)}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <div className="text-[11px] font-medium text-gray-500">
                    Range: <span className="text-blue-600 font-bold">{rangeStart ? fmt(rangeStart) : '...'}</span> – <span className="text-blue-600 font-bold">{rangeEnd ? fmt(rangeEnd) : '...'}</span>
                  </div>
                  <button onClick={applyRange} className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold shadow-md hover:bg-blue-700 transition-all">Apply Range</button>
                </div>
              </div>
            )}
          </Motion.div>
        )}
      </AnimatePresence>

      <button onClick={() => handlePreset('Today')} className="flex items-center justify-center w-8 h-8 bg-red-50 border border-red-100 rounded-lg cursor-pointer text-red-500 hover:bg-red-200 transition-all focus:outline-none shadow-sm"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="10" y1="14" x2="14" y2="18" strokeWidth="2.5" /><line x1="14" y1="14" x2="10" y2="18" strokeWidth="2.5" /></svg></button>
    </div>
  );
});

// ─────────────────────────────────────────────────────────────────────────────

const PurchaseSaleToggle = React.memo(() => {
  const [active, setActive] = React.useState('Purchase');
  return (
    <div className="flex bg-gray-100 rounded text-[11px] font-bold overflow-hidden cursor-pointer shadow-inner relative p-0.5">
      <button
        onClick={() => setActive('Purchase')}
        className={`px-3 py-1 rounded-xs transition-all outline-none z-10 ${active === 'Purchase' ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 bg-transparent'}`}
      >
        Purchase
      </button>
      <button
        onClick={() => setActive('Sale')}
        className={`px-3 py-1 rounded-xs transition-all outline-none z-10 ${active === 'Sale' ? 'bg-red-500 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-200 bg-transparent'}`}
      >
        Sale
      </button>
    </div>
  )
})

const AlertDetailModal = ({ alert, onClose }) => {
  const [action, setAction] = React.useState('Assign to Warehouse Team for Restock');
  const [notes, setNotes] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!alert) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      alertType: alert.type,
      alertText: alert.text,
      resolutionAction: action,
      operationNotes: notes,
      timestamp: new Date().toISOString()
    };
    console.log("Sending Resolution Data to Backend API:", payload);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Motion.div
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
        className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/30 backdrop-blur-[6px]"
      onClick={!isSubmitting ? onClose : undefined}
    >
      <Motion.div
        initial={{ opacity: 0, y: 14, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 14, scale: 0.95 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 22,
          mass: 1,
          restDelta: 0.001
        }}
        style={{ 
          willChange: "transform, opacity",
          transformZ: 0 
        }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.25)] w-full max-w-lg overflow-hidden border border-white/20 ring-1 ring-black/5"
      >
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-base">Business Health Alert</h3>
          <button onClick={onClose} disabled={isSubmitting} className="p-1.5 rounded-md hover:bg-gray-300 text-gray-500 transition-colors outline-none focus:outline-none disabled:opacity-50">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className={`p-3.5 rounded-xl shrink-0 ${alert.type === 'Critical' || alert.type === 'Warning' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'}`}>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="pt-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide ${alert.type === 'Critical' || alert.type === 'Warning' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>{alert.type}</span>
                <span className="text-xs text-gray-400 font-medium">{alert.time}</span>
              </div>
              <h4 className="text-[15px] font-semibold text-gray-800 leading-relaxed pr-2">{alert.text}</h4>
            </div>
          </div>
          <div className="bg-gray-50/80 p-5 rounded-xl border border-gray-100">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-3 pl-1">Resolution Action</label>
            <div className="space-y-3">
              <select value={action} onChange={(e) => setAction(e.target.value)} disabled={isSubmitting} className="w-full text-sm px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white font-medium text-gray-700 shadow-sm disabled:opacity-70 disabled:bg-gray-100">
                <option value="Assign to Warehouse Team for Restock">Assign to Warehouse Team for Restock</option>
                <option value="Automate Procurement Ticket">Automate Procurement Ticket</option>
                <option value="Ignore for Next 24 Hours">Ignore for Next 24 Hours</option>
                <option value="Mark Alert as False Positive">Mark Alert as False Positive</option>
              </select>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} disabled={isSubmitting} placeholder="Add specific notes or instructions for the operations team..." className="w-full text-sm px-4 py-3 rounded-lg border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-22.5 bg-white resize-none font-medium text-gray-700 shadow-sm disabled:opacity-70 disabled:bg-gray-100"></textarea>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex justify-end gap-3">
          <button onClick={onClose} disabled={isSubmitting} className="px-5 py-2.5 rounded-lg text-[13px] font-bold text-gray-600 hover:bg-gray-200 transition-colors disabled:opacity-50">Cancel</button>
          <button onClick={handleSubmit} disabled={isSubmitting} className="flex items-center justify-center min-w-35 px-6 py-2.5 rounded-lg text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : 'Confirm Details'}
          </button>
        </div>
      </Motion.div>
    </Motion.div>
  )
}

const BusinessHealthList = React.memo(({ alerts = [] }) => {
  const [selectedAlert, setSelectedAlert] = React.useState(null);
  return (
    <>
      <div className="flex flex-col gap-3 h-full overflow-y-auto pr-1">
        {alerts.map((a, i) => {
          const isRed = a.type === 'Critical' || a.type === 'Warning';
          const color = isRed ? 'text-red-500' : 'text-green-500';
          const border = isRed ? 'border-l-red-500' : 'border-l-green-500';
          return (
            <div key={i} onClick={() => setSelectedAlert(a)} className={`p-4 bg-gray-50 border ${border} border-y-0 border-r-0 border-l-4 rounded-xl transition-all hover:bg-white hover:shadow-md cursor-pointer group mb-1`}>
              <p className="text-[13px] font-semibold text-gray-800 leading-snug group-hover:text-blue-700 transition-colors">{a.text}</p>
              <div className="flex items-center justify-between mt-3">
                <span className={`text-xs font-bold ${color}`}>{a.type}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-gray-400">{a.time}</span>
                  <button className="text-xs text-blue-600 group-hover:text-blue-800 font-medium whitespace-nowrap" onClick={(e) => { e.stopPropagation(); setSelectedAlert(a); }}>View Detail &gt;</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {selectedAlert && <AlertDetailModal alert={selectedAlert} onClose={() => setSelectedAlert(null)} />}
      </AnimatePresence>
    </>
  )
})

const AlertOpportunityList = React.memo(({ alerts = [] }) => {
  return (
    <div className="flex flex-col gap-3">
      {alerts.slice(0, 3).map((a, i) => {
        const isInfo = a.type === 'Success';
        const icon = isInfo ? 'i' : '!';
        return (
          <div key={i} className="p-4 bg-gray-50 rounded border border-gray-100 flex gap-3 shadow-sm border-l-4 border-l-red-500 items-start hover:bg-white hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-[11px] transition-transform group-hover:scale-110 ${icon === 'i' ? 'bg-amber-500' : 'bg-red-500'}`}>{icon}</div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{a.text}</p>
              <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600 font-bold px-2 transition-colors" onClick={() => alert('Options menu')}>&#8942;</button>
          </div>
        )
      })}
    </div>
  )
})

const SmallBarChartCard = React.memo(({ title, value, change }) => (
  <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex flex-col justify-between h-27.5 group">
    <div className="text-xs text-gray-500 font-medium group-hover:text-blue-600 transition-colors">{title}</div>
    <div>
      <div className="text-lg font-bold text-gray-900 leading-tight">{value}</div>
      <div className="flex items-end justify-between mt-1">
        <div className="text-[11px] text-gray-400 font-medium">{change}</div>
        <div className="w-16 h-8 bg-blue-500 align-bottom rounded-t group-hover:bg-blue-600 transition-colors" style={{ clipPath: 'polygon(0 80%, 20% 60%, 40% 90%, 60% 40%, 80% 60%, 100% 20%, 100% 100%, 0 100%)' }}></div>
      </div>
    </div>
  </div>
))

const MetricMini = React.memo(({ title, value, previous, icon, isUp = true }) => (
  <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer p-4 flex flex-col text-center items-center justify-center h-30 group">
    <div className="flex items-center gap-2 mb-2">
      <div className="text-blue-500 group-hover:scale-110 transition-transform">{icon}</div>
      <h4 className="text-xs font-semibold text-gray-800">{title}</h4>
    </div>
    <div className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</div>
    <div className="text-[11px] text-gray-400">
      <span className={isUp ? 'text-blue-500 font-medium' : 'text-red-500 font-medium'}>{isUp ? '+' : ''}{previous}</span> previous period
    </div>
  </div>
))

const CategoryList = React.memo(({ isTop, salesData }) => {
  const cats = ['Electronics', 'Furniture', 'Kitchen', 'Bedding', 'Storage']
  const visibleCats = isTop ? cats : [...cats].reverse()
  return (
    <div className="w-full text-[13px]">
      <div className="grid grid-cols-5 gap-4 items-center text-gray-500 text-xs font-medium mb-3 px-4">
        <span className="text-left">Category</span>
        <span className="text-left">Sales</span>
        <span className="text-left">Change</span>
        <span className="text-left">Margin</span>
        <span className="text-left">Margin Change</span>
      </div>
      {visibleCats.map((c, i) => {
        const dummySale = salesData ? salesData.today * (0.01 + i * 0.005) : 223.34;
        return (
          <div key={i} className="grid grid-cols-5 gap-4 items-center bg-[#f9fafb] hover:bg-gray-100 transition-colors rounded-md py-3 px-4 mb-2 last:mb-0">
            <span className="text-gray-700 whitespace-nowrap truncate">{c}</span>
            <span className="text-gray-900 font-semibold">${dummySale.toFixed(2)}</span>
            <span className="text-green-500 font-medium">+93.05 %</span>
            <span className="text-gray-700 whitespace-nowrap">32.3%</span>
            <span className="text-green-500 font-medium whitespace-nowrap">+3.5 %</span>
          </div>
        )
      })}
    </div>
  )
})

const SalesPersonList = React.memo(() => {
  const people = [
    { name: 'Natashia Bunny', email: 'natasiabunny@mail.com', img: 'https://i.pravatar.cc/150?u=a04258' },
    { name: 'Laya ferry', email: 'layafer@mail.com', img: 'https://i.pravatar.cc/150?u=a04259' },
    { name: 'George hill', email: 'GG', img: 'https://i.pravatar.cc/150?u=a04251' },
    { name: 'Broling', email: 'natasiabunny@mail.com', img: 'https://i.pravatar.cc/150?u=a04252' },
  ]
  return (
    <div className="flex flex-col gap-5.5 pt-2">
      {people.map((p, i) => (
        <div key={i} className="flex items-center gap-4 cursor-pointer hover:bg-blue-50/50 p-2 rounded transition-colors -m-2 group">
          <img src={p.img} alt={p.name} className="size-10.5 rounded-full object-cover group-hover:shadow transition-shadow" />
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-bold text-gray-800 truncate group-hover:text-blue-600 transition-colors">{p.name}</p>
            <p className="text-[11px] text-gray-400 truncate mt-0.5">{p.email}</p>
          </div>
        </div>
      ))}
    </div>
  )
})

const KPIScorecard = React.memo(({ inventoryData }) => {
  const items = [
    { title: 'EBITDA %', val: '11.4%', t: '13%', icon: '!' },
    { title: 'Inventory Turn', val: inventoryData ? inventoryData.stockLevel / 10 : 3.5, t: '4', icon: '箱' },
    { title: 'Return Rate %', val: '2.0%', t: '3%', icon: '↺' },
    { title: 'On time Delivery %', val: '96.2%', t: '94%', icon: '🚚' },
  ]
  return (
    <div className="grid grid-cols-2 gap-4 h-62.5">
      {items.map((it, i) => (
        <div key={i} className="flex items-center p-4 bg-gray-50 border border-gray-100 rounded-lg gap-4 hover:shadow-md hover:bg-white transition-all cursor-pointer group">
          <div className="w-10 h-10 bg-white rounded shadow-sm flex flex-col items-center justify-center text-base font-bold border border-gray-100 group-hover:text-blue-600 transition-colors group-hover:scale-105">{it.icon}</div>
          <div>
            <div className="text-[13px] font-semibold text-gray-700">{it.title}</div>
            <div className="text-xl font-bold text-gray-900 leading-tight">{typeof it.val === 'number' ? it.val.toFixed(1) : it.val}</div>
            <div className="text-[11px] text-gray-400 mt-1 font-medium">Target: {it.t}</div>
          </div>
        </div>
      ))}
    </div>
  )
})

const TopSaleOverviewCard = React.memo(({ title, value, compVal, compText, compColor, isToday, iconColor }) => (
  <div className="bg-white border border-gray-100 flex flex-col justify-center p-6 min-w-50 flex-1 rounded-2xl shadow-sm hover:shadow-md transition-all">
    <div className="flex items-start gap-4">
      <div className={`mt-0.5 ${iconColor}`}>
        <svg className="size-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
          <path d="M12 7v5l3 3" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="flex flex-col items-start">
        <div className="text-gray-700 text-[13px] font-medium leading-none mb-1.5">{title}</div>
        <div className={`font-semibold text-[19px] leading-none mb-2 ${isToday ? 'text-red-500' : 'text-blue-500'}`}>{value}</div>
        {isToday ? (
          <div className="bg-[#4F70FF] text-white text-[11px] px-3 py-1 mt-1 shadow-sm font-medium">Upto 11:00 AM</div>
        ) : (
          <div className="flex flex-col mt-0.5">
            <span className={`text-[11px] font-medium ${compColor}`}>{compVal}</span>
            <span className="text-[10px] text-gray-500 mt-0.5">{compText}</span>
          </div>
        )}
      </div>
    </div>
  </div>
))

const ColoredMetricCard = React.memo(({ title, value, prev, icon, bgColor, txtColor }) => (
  <div className={`${bgColor} p-5 flex items-start gap-4 h-full rounded-xl shadow-sm border border-black/5`}>
    <div className={`mt-0.5 ${txtColor}`}>{icon}</div>
    <div className="flex flex-col">
      <div className="text-gray-700 text-[13px] font-medium tracking-tight opacity-90">{title}</div>
      <div className="text-gray-900 text-xl font-bold mt-1.5 mb-2 leading-none">{value}</div>
      <div className="text-[11px] text-gray-600 font-medium">
        <span className="text-blue-500">{prev}</span><span className="ml-1">previous period</span>
      </div>
    </div>
  </div>
))

const RightHealthWidget = React.memo(({ title, icon, items }) => (
  <div className="bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all mb-5 last:mb-0 cursor-pointer group">
    <div className="flex items-center gap-2 mb-5">
      <div className="group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-[13px] font-semibold text-blue-500">{title}</h3>
    </div>
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between">
          <span className="text-[11.5px] text-gray-500 font-medium">{item.label}</span>
          <span className={`text-[11.5px] font-bold ${item.color || 'text-gray-800'}`}>{item.value}</span>
        </div>
      ))}
    </div>
  </div>
))

const MemoRevenueLineChart = React.memo(RevenueLineChart)
const MemoStockHealthDonut = React.memo(StockHealthDonut)
const MemoSalesMarginBar = React.memo(SalesMarginBar)
const MemoAlertFeedDonut = React.memo(AlertFeedDonut)
const MemoExpenseRadar = React.memo(ExpenseRadar)
const MemoCashFlowWaterfall = React.memo(CashFlowWaterfall)
const MemoCashFlowProjection = React.memo(CashFlowProjection)
const MemoDifferencesBarChart = React.memo(DifferencesBarChart)
const MemoTop5ProductsBar = React.memo(Top5ProductsBar)

const ReportDashboard = () => {
  const { 
    inventoryData, 
    chartData, 
    salesData, 
    revenueData, 
    comparativeData, 
    financialData, 
    alerts,
    isConnected
  } = useLiveData()
  const [globalDateFilter, setGlobalDateFilter] = React.useState('Today');

  const getFormattedDateString = (filter) => {
    switch (filter) {
      case 'Today': return "Saturday, April 5, 2025";
      case 'Yesterday': return "Friday, April 4, 2025";
      case 'Last 7 Days': return "March 29 - April 5, 2025";
      case 'Last 30 Days': return "March 6 - April 5, 2025";
      case 'This Month': return "April 1 - April 30, 2025";
      case 'Last Month': return "March 1 - March 31, 2025";
      default: return filter;
    }
  };

  return (
    <div className="flex h-screen bg-[#FDFDFD] text-gray-900 overflow-hidden font-sans selection:bg-blue-100">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8 relative bg-[#F8F9FA] scroll-smooth">
          <Motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full flex flex-col gap-6 max-w-500 mx-auto pb-10"
          >
            {/* TOP ROW: Sale Overview & Health Indicators */}
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex-1 min-w-0 flex flex-col gap-8">
                <AnimatedBlock>
                  <div className="flex items-center justify-between mb-4 ml-1">
                    <h2 className="text-[17px] font-bold text-gray-800 tracking-tight">Sale Overview</h2>
                    <div className="rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-gray-100">
                      <LiveIndicator isConnected={isConnected} />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <TopSaleOverviewCard title="Todays Sales" value={salesData?.today?.toFixed(2) || "9330.00"} isToday={true} iconColor="text-red-400" />
                    <TopSaleOverviewCard title="Yesterday's" value={salesData?.yesterday?.toFixed(2) || "28839.00"} compVal="+10000.00" compText="vs Same Day Last Week" compColor="text-green-500" iconColor="text-blue-500" />
                    <TopSaleOverviewCard title="This month" value={salesData?.thisMonth?.toFixed(2) || "1203323.00"} compVal="-10000.00" compText="vs Same Day Last Month" compColor="text-red-500" iconColor="text-blue-500" />
                    <TopSaleOverviewCard title="Last Month" value={salesData?.lastMonth?.toFixed(2) || "999390.00"} compVal="+10000.00" compText="vs Month Before" compColor="text-green-500" iconColor="text-blue-500" />
                  </div>
                </AnimatedBlock>

                <AnimatedBlock>
                  <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-4 mt-2 px-1">
                    <div>
                      <h2 className="text-[17px] font-bold text-gray-800 mb-1">Business Overview</h2>
                      <Motion.p key={globalDateFilter} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-[12.5px] text-gray-400 font-medium">
                        {getFormattedDateString(globalDateFilter)}
                      </Motion.p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 sm:mt-0">
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all focus:outline-none shadow-sm">
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"/></svg>
                        Branch: <span className="text-blue-600 font-bold">BRNCH 2</span>
                        <svg className="w-3.5 h-3.5 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                      </button>
                      <DateSelector selected={globalDateFilter} onSelect={setGlobalDateFilter} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ColoredMetricCard title="Total Revenue" value={revenueData?.totalRevenue?.toFixed(2) || "838.00"} prev="+12.3" bgColor="bg-[#FBE9EC]" txtColor="text-[#E74C3C]" icon={<svg className="size-5.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a1 1 0 011-1h1.026a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6zm5 0a1 1 0 011-1h1a1 1 0 011 1v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6zm5-4a1 1 0 011-1h1a1 1 0 011 1v10a1 1 0 01-1 1h-1a1 1 0 01-1-1V6z"/><path d="M12.914 2H17a1 1 0 011 1v4a1 1 0 01-2 0V4.414l-4.293 4.293a1 1 0 01-1.414 0L8 6.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 6.586l3.586-3.586H12.914a1 1 0 110-2z" /></svg>} />
                    <ColoredMetricCard title="Net Profit" value={revenueData?.netProfit?.toFixed(2) || "323.00"} prev="+12.3" bgColor="bg-[#E8FDEE]" txtColor="text-[#2ECC71]" icon={<svg className="size-5.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" /><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" /></svg>} />
                    <ColoredMetricCard title="Total Order" value={revenueData?.totalOrder || "532"} prev="+12.3" bgColor="bg-[#EBE9FE]" txtColor="text-[#5138EE]" icon={<svg className="size-5.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 5v10c0 1.105 1.79 2 4 2h8c2.21 0 4-.895 4-2V5H2zm9 4a1 1 0 11-2 0 1 1 0 012 0zm-5 1H4V8h2v2zm6 0h-2V8h2v2z" /></svg>} />
                    <ColoredMetricCard title="Average Order Value" value={revenueData?.avgOrderValue?.toFixed(0) || "400"} prev="+12.3" bgColor="bg-[#E6F3FB]" txtColor="text-[#2F80ED]" icon={<svg className="size-5.5" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>} />
                  </div>
                </AnimatedBlock>
              </div>

              <div className="w-full xl:w-80 shrink-0 flex flex-col xl:pt-11">
                <AnimatedBlock>
                  <RightHealthWidget title="Inventory Health" icon={<svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} items={[{label:'Stock Level',value:'23%',color:'text-red-500'},{label:'Items Near Reorder',value:'45%',color:'text-green-500'},{label:'Out of Stock Items',value:'33%',color:'text-orange-500'}]} />
                  <RightHealthWidget title="Customer Metrics" icon={<svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} items={[{label:'New Customers',value:'56'},{label:'Returning Rate',value:'45%'}]} />
                  <RightHealthWidget title="Financial Health" icon={<svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} items={[{label:'Cash Flow',value:`$${financialData?.cashFlow?.toFixed(1)||'334.4'}`},{label:'Pending Payment',value:`$${financialData?.pendingPayment?.toFixed(2)||'55443.00'}`},{label:'Expenses',value:`$${financialData?.expenses?.toFixed(2)||'9940.00'}`}]} />
                </AnimatedBlock>
              </div>
            </div>

            <AnimatedBlock className="w-full h-px bg-gray-200 mt-2 mb-6 shadow-[0_1px_0_white]"></AnimatedBlock>

            {/* ROW 1: Sales Overview + Business Health */}
            <AnimatedBlock className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0 flex flex-col">
                <CardWrapper title="Sales Overview" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6M13 7L9 11l-4-4-5 5"/></svg>}>
                  <div className="text-xs text-gray-400 -mt-2.5 mb-4">Lorem ipsum check down the writers like annm</div>
                  <div className="h-65"><MemoRevenueLineChart /></div>
                </CardWrapper>
              </div>
              <div className="w-full lg:w-87.5 shrink-0 flex flex-col">
                <CardWrapper title="Business Health" icon={lineIcon} rightElement={<button className="text-red-500 border border-red-200 rounded p-1 hover:bg-red-50 focus:outline-none shadow-sm hover:shadow transition-all" onClick={() => alert('View alarms')}><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></button>}>
                  <div className="text-[11px] text-gray-400 -mt-2.5 mb-3 font-medium">+12.3 previous period</div>
                  <div className="h-70"><BusinessHealthList alerts={alerts} /></div>
                </CardWrapper>
              </div>
            </AnimatedBlock>

            {/* ROW 2: Comparative Analysis */}
            <AnimatedBlock className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg></div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-[15px]">Comparative Analysis</h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">Lorem ipsum check down the writers like annm</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                <div className="bg-gray-50/80 p-5 rounded-lg flex flex-col justify-between hover:shadow-md cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                  <h4 className="text-[13px] font-bold text-gray-800 mb-5">Today vs Yesterday</h4>
                  <div className="flex items-end justify-between">
                    <div><div className="text-[11px] text-gray-500 font-medium mb-1">Current</div><div className="text-blue-600 font-black text-xl">${comparativeData?.todayCurrent?.toFixed(2)}</div><div className="text-blue-500 text-xs font-bold mt-1 bg-blue-50 inline-block px-1.5 py-0.5 rounded">{comparativeData?.todayDelta}</div></div>
                    <div className="text-right"><div className="text-[11px] text-gray-500 font-medium mb-1">Previous</div><div className="text-gray-800 font-bold text-base">${comparativeData?.todayPrevious?.toFixed(2)}</div></div>
                  </div>
                </div>
                <div className="bg-gray-50/80 p-5 rounded-lg flex flex-col justify-between hover:shadow-md cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                  <h4 className="text-[13px] font-bold text-gray-800 mb-5">This week vs Last Week</h4>
                  <div className="flex items-end justify-between">
                    <div><div className="text-[11px] text-gray-500 font-medium mb-1">Current</div><div className="text-blue-600 font-black text-xl">${comparativeData?.weekCurrent?.toFixed(2)}</div><div className="text-blue-500 text-xs font-bold mt-1 bg-blue-50 inline-block px-1.5 py-0.5 rounded">{comparativeData?.weekDelta}</div></div>
                    <div className="text-right"><div className="text-[11px] text-gray-500 font-medium mb-1">Previous</div><div className="text-gray-800 font-bold text-base">${comparativeData?.weekPrevious?.toFixed(2)}</div></div>
                  </div>
                </div>
                <div className="bg-gray-50/80 p-5 rounded-lg flex flex-col justify-between hover:shadow-md cursor-pointer hover:bg-white border border-transparent hover:border-gray-100 transition-all">
                  <h4 className="text-[13px] font-bold text-gray-800 mb-5">This Month vs Last Month</h4>
                  <div className="flex items-end justify-between">
                    <div><div className="text-[11px] text-gray-500 font-medium mb-1">Current</div><div className="text-blue-600 font-black text-xl">${comparativeData?.monthCurrent?.toFixed(2)}</div><div className="text-blue-500 text-xs font-bold mt-1 bg-blue-50 inline-block px-1.5 py-0.5 rounded">{comparativeData?.monthDelta}</div></div>
                    <div className="text-right"><div className="text-[11px] text-gray-500 font-medium mb-1">Previous</div><div className="text-gray-800 font-bold text-base">${comparativeData?.monthPrevious?.toFixed(2)}</div></div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <SmallBarChartCard title="Net Sale" value={`$${salesData?.thisMonth?.toLocaleString()}`} change="+5.2%" />
                <SmallBarChartCard title="Gross Margin" value="32 %" change="+5.2%" />
                <SmallBarChartCard title="Cash on Hand" value={`$${financialData?.cashFlow?.toLocaleString()}`} change="+5.2%" />
                <SmallBarChartCard title="Receivable" value={`$${financialData?.pendingPayment?.toLocaleString()}`} change="+5.2%" />
                <SmallBarChartCard title="Payable" value={`$${financialData?.expenses?.toLocaleString()}`} change="+5.2%" />
                <SmallBarChartCard title="Inventory" value={`${inventoryData?.stockLevel} units`} change="-1.2%" />
              </div>
            </AnimatedBlock>

            {/* ROW 3: Alert & Opportunity + 30 Day Cash-Flow Waterfall */}
            <AnimatedBlock className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-100 shrink-0 flex flex-col">
                <CardWrapper 
                  title="Alert & Opportunity" 
                  icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
                  rightElement={<SmallRedReset />}
                >
                  <AlertOpportunityList alerts={alerts} />
                </CardWrapper>
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <CardWrapper title="30 Day Cash - Flow Waterfall" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} rightElement={<SmallRedReset />}>
                  <div className="py-2"><MemoCashFlowWaterfall /></div>
                </CardWrapper>
              </div>
            </AnimatedBlock>

            <AnimatedBlock className="w-full h-px bg-gray-200 my-2 shadow-[0_1px_0_white]"></AnimatedBlock>

            {/* ROW 4: Differences Purchase & Sales + KPI Scorecard */}
            <AnimatedBlock className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0 flex flex-col">
                <CardWrapper title="Differences Purchase & Sales" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} rightElement={<PurchaseSaleToggle />}>
                  <div className="h-62.5"><MemoDifferencesBarChart data={chartData} /></div>
                </CardWrapper>
              </div>
              <div className="w-full lg:w-125 shrink-0 flex flex-col">
                <CardWrapper title="KPI Scorecard" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}>
                  <KPIScorecard inventoryData={inventoryData} />
                </CardWrapper>
              </div>
            </AnimatedBlock>

            {/* ROW 5: Category Leaderboard */}
            <AnimatedBlock className="w-full flex flex-col">
              <CardWrapper title="Category Leaderboard" icon={<svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}>
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="w-full lg:w-1/2 p-5 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow bg-white">
                    <h4 className="text-[15px] font-bold text-gray-800 mb-4 px-2">Top 5 Categories by Sales</h4>
                    <CategoryList isTop={true} salesData={salesData} />
                  </div>
                  <div className="w-full lg:w-1/2 p-5 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow bg-white">
                    <h4 className="text-[15px] font-bold text-gray-800 mb-4 px-2">Bottom 5 Categories by Sales</h4>
                    <CategoryList isTop={false} salesData={salesData} />
                  </div>
                </div>
              </CardWrapper>
            </AnimatedBlock>

            <AnimatedBlock className="w-full h-px bg-gray-200 my-2 shadow-[0_1px_0_white]"></AnimatedBlock>

            {/* ROW 6: Stock Health, Revenue Trends, Top Sales */}
            <AnimatedBlock className="flex flex-col lg:flex-row gap-6">
              <div className="w-full lg:w-80 shrink-0">
                <CardWrapper title="Top 5 Sales Person" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}>
                  <SalesPersonList />
                </CardWrapper>
              </div>
              <div className="flex-1 min-w-0">
                <CardWrapper title="Revenue & profit Trends" icon={lineIcon} rightElement={<div className="flex items-center gap-3 text-[11px] font-bold"><span className="flex items-center gap-1"><div className="w-3.5 h-2.5 bg-red-500 rounded-sm"></div> Revenue</span><span className="flex items-center gap-1"><div className="w-3.5 h-2.5 bg-blue-500 rounded-sm"></div> Profit</span></div>}>
                  <div className="h-62.5"><MemoRevenueLineChart /></div>
                </CardWrapper>
              </div>
              <div className="w-full lg:w-80 shrink-0">
                <CardWrapper title="Stock Health Metrics" icon={lineIcon}>
                  <div className="h-62.5 relative"><MemoStockHealthDonut /></div>
                </CardWrapper>
              </div>
            </AnimatedBlock>



            

            {/* ROW 7: Grid of Metrics */}
            <AnimatedBlock className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="cursor-pointer hover:-translate-y-1 transition-transform"><MetricMini title="Total Revenue" value={revenueData?.totalRevenue?.toFixed(1) || 0} previous="12.3" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>} /></div>
              <div className="cursor-pointer hover:-translate-y-1 transition-transform"><MetricMini title="Net Profit" value={revenueData?.netProfit?.toFixed(1) || 0} previous="12.3" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>} /></div>
              <div className="cursor-pointer hover:-translate-y-1 transition-transform"><MetricMini title="Total Order" value={revenueData?.totalOrder || 0} previous="12.3" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>} /></div>
              <div className="cursor-pointer hover:-translate-y-1 transition-transform"><MetricMini title="Avg Order Value" value={revenueData?.avgOrderValue?.toFixed(0) || 0} previous="12.3" icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} /></div>
            </AnimatedBlock>

            {/* ROW 8: Sales Margin Bar */}
            <AnimatedBlock className="w-full">
              <CardWrapper title="Sales + Margin Performance" icon={lineIcon}>
                <div className="h-75"><MemoSalesMarginBar /></div>
              </CardWrapper>
            </AnimatedBlock>

            {/* ROW 9: Revenue Trends, projection, products */}
            <AnimatedBlock className="flex flex-col lg:flex-row gap-6 mt-2">
              <div className="flex-1 min-w-0">
                <CardWrapper title="Revenue & profit Trends" icon={lineIcon}>
                  <div className="h-62.5"><MemoRevenueLineChart /></div>
                </CardWrapper>
              </div>
              <div className="w-full lg:w-112.5 shrink-0">
                <CardWrapper title="Performance Summary" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>} rightElement={<SmallRedReset />}>
                  <PerformanceSummaryList />
                </CardWrapper>
              </div>
            </AnimatedBlock>

            <AnimatedBlock className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 min-w-0">
                <CardWrapper title="30 Days Cash Flow Projection" icon={lineIcon} rightElement={<SmallRedReset />}>
                  <div className="h-62.5"><MemoCashFlowProjection /></div>
                </CardWrapper>
              </div>
              <div className="w-full lg:w-112.5 shrink-0">
                <CardWrapper title="Top 5 Products" icon={lineIcon}>
                  <div className="h-62.5"><MemoTop5ProductsBar /></div>
                </CardWrapper>
              </div>
            </AnimatedBlock>

            {/* ROW 10: Alert Feed, Operational Health, Expense Radar */}
            <AnimatedBlock className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-80">
              <CardWrapper title="Alert Feed" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}>
                <MemoAlertFeedDonut />
              </CardWrapper>
              <CardWrapper title="Operational Health" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                <OperationalHealthWidget />
              </CardWrapper>
              <CardWrapper title="Expense Radar" icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /></svg>}>
                <MemoExpenseRadar />
              </CardWrapper>
            </AnimatedBlock>

            <br/>
          </Motion.div>
        </main>
      </div>
    </div>
  )
}

export default ReportDashboard
