const AlertCard = ({ title, desc, time, type }) => (
  <div className={`p-4 bg-white rounded-lg border-l-[3px] mb-3 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] border ${type === 'danger' ? 'border-red-500 border-l-red-500' : 'border-blue-500 border-l-blue-500'}`}>
    <div className="flex gap-3">
      {type === 'danger' ? (
        <svg className="w-5 h-5 text-red-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      ) : (
        <svg className="w-5 h-5 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      )}
      <div>
        <h4 className={`text-[12px] font-bold ${type === 'danger' ? 'text-red-500' : 'text-blue-600'}`}>{title}</h4>
        <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{desc}</p>
        <span className="text-[10px] text-gray-400 mt-2 block">{time}</span>
      </div>
    </div>
  </div>
)

export default function PerformanceSummaryList() {
  return (
     <div className="flex flex-col h-full overflow-y-auto pr-2">
       <AlertCard 
         type="danger" 
         title="Margin Dip Detected in Beverage" 
         desc="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
         time="2 hr"
       />
       <AlertCard 
         type="info" 
         title="Margin Dip Detected in Beverage" 
         desc="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
         time="2 hr"
       />
     </div>
  )
}
