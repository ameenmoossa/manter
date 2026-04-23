const AlertCard = ({ type, text, time }) => {
  const badgeColor = {
    Critical: 'text-red-500',
    Warning: 'text-orange-500',
    Success: 'text-green-500',
  }

  return (
    <div className="mb-2 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
      <p className="text-xs text-gray-800 font-medium mb-1">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold ${badgeColor[type]}`}>
            {type}
          </span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <button className="text-xs text-blue-500 hover:underline">
          View Detail &gt;
        </button>
      </div>
    </div>
  )
}

export default AlertCard
