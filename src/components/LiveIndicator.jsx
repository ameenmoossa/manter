const LiveIndicator = ({ isConnected }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        {isConnected ? (
          <>
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <div className="absolute h-3 w-3 rounded-full bg-green-500/30 animate-ping" />
          </>
        ) : (
          <div className="h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
      <span className="text-xs text-gray-500">
        {isConnected ? 'Live' : 'Reconnecting...'}
      </span>
    </div>
  )
}

export default LiveIndicator
