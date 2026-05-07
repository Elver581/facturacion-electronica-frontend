import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DocsPage from './pages/DocsPage'
import DianGuidePage from './pages/DianGuidePage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/docs"      element={<DocsPage />} />
        <Route path="/guia-dian" element={<DianGuidePage />} />
      </Routes>
    </BrowserRouter>
  )
}
