import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ReportDashboard from './pages/ReportDashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReportDashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App