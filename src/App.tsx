import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Resume from './pages/Resume'
import Project from './pages/Project'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<Resume />} />
      <Route path="/resume" element={<Navigate to="/about" replace />} />
      <Route path="/work/:slug" element={<Project />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
