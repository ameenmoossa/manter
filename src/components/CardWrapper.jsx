const CardWrapper = ({ children, title, icon, rightElement }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-[0_2px_15px_-4px_rgba(0,0,0,0.03)] p-5 flex flex-col h-full hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.06)] transition-shadow">
    {(title || icon || rightElement) && (
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          {icon && <span className="text-blue-500">{icon}</span>}
          {title && <h3 className="text-[13px] font-semibold text-blue-600 tracking-wide">{title}</h3>}
        </div>
        {rightElement && <div>{rightElement}</div>}
      </div>
    )}
    <div className="flex-1 relative">
      {children}
    </div>
  </div>
)

export default CardWrapper
