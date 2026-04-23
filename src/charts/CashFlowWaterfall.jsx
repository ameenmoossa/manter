import React from 'react';

const defaultKPIs = [
  { name: 'Opening Cash', value: 23766.00, hex: '#4F70FF', txtColor: 'text-[#4F70FF]' },
  { name: 'Predicted Inflows', value: 23766.00, hex: '#FF5E5E', txtColor: 'text-[#FF5E5E]' },
  { name: 'Predicted Outflows', value: 23766.00, hex: '#FF974A', txtColor: 'text-[#FF974A]' },
  { name: 'Closing Cash', value: 23766.00, hex: '#EA580C', txtColor: 'text-[#EA580C]' },
];

const CashFlowWaterfall = ({ data = defaultKPIs }) => {
  // calculate total for percentages
  const total = data.reduce((acc, item) => acc + Math.abs(item.value), 0);

  return (
    <div className="flex flex-col w-full justify-center px-1 pb-1 pt-2">
      {/* 1. Thin Horizontal Waterfall Strip */}
      <div className="w-full h-2 flex rounded-sm overflow-hidden mb-2 shrink-0">
        {data.map((item, idx) => {
          const widthPercent = total > 0 ? (Math.abs(item.value) / total) * 100 : 0;
          return (
            <div 
              key={idx} 
              style={{ width: `${widthPercent}%`, backgroundColor: item.hex }} 
              className="h-full cursor-pointer hover:brightness-110 transition-all border-r border-white/20 last:border-r-0"
              title={`${item.name}: $${Math.abs(item.value).toLocaleString()}`}
            />
          );
        })}
      </div>

      {/* 2. KPI Section (Inline Text Blocks Below Strip, Aligned to Segments) */}
      <div className="flex w-full mt-1">
        {data.map((item, idx) => {
          const widthPercent = total > 0 ? (Math.abs(item.value) / total) * 100 : 0;
          const isLast = idx === data.length - 1;
          
          return (
            <div 
              key={idx} 
              style={{ width: `${widthPercent}%` }} 
              className={`flex flex-col cursor-pointer group ${isLast ? 'items-end text-right' : 'items-start text-left'}`}
            >
              <span className="text-[12px] font-medium text-gray-500 mb-0.5 group-hover:text-gray-700 transition-colors">
                {item.name}
              </span>
              <span className={`text-[16px] font-bold ${item.txtColor} tracking-tight`}>
                ${Math.abs(item.value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CashFlowWaterfall;
