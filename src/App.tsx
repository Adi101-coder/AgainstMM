import Preloader from './components/landing/Preloader'
import { useScrollToHash } from './hooks/useScrollToHash'
import { Routes, Route } from 'react-router-dom'
import Distribution from './pages/Distribution'
import Home from './pages/Home'
import Methodology from './pages/Methodology'
import NotFound from './pages/NotFound'

export default function App() {
  useScrollToHash()

  return (
    <>
      <Preloader />
      <Routes>
        <Route index element={<Home />} />
        <Route path="methodology" element={<Methodology />} />
        <Route path="distribution" element={<Distribution />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
