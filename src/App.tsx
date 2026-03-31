import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Upload from './pages/Upload'
import Results from './pages/Results'
import About from './pages/About'
import './App.css'

export type Page = 'home' | 'upload' | 'results' | 'about'

export interface AnalysisResult {
  status: 'tampered' | 'authentic'
  confidence: number
  psnr: number
  wmAccuracy: number
  ber: number
  tamperedRegions: { x: number; y: number; w: number; h: number; label: string }[]
  frameResults?: { frame: number; status: 'tampered' | 'authentic'; confidence: number }[]
  fileName: string
  fileType: 'image' | 'video'
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  const navigate = (page: Page) => setCurrentPage(page)

  const handleAnalysisComplete = (data: AnalysisResult) => {
    setResult(data)
    setCurrentPage('results')
  }

  return (
    <div className="app">
      <Navbar currentPage={currentPage} navigate={navigate} />
      <main className="main-content">
        {currentPage === 'home' && <Home navigate={navigate} />}
        {currentPage === 'upload' && <Upload onComplete={handleAnalysisComplete} />}
        {currentPage === 'results' && <Results result={result} navigate={navigate} />}
        {currentPage === 'about' && <About />}
      </main>
    </div>
  )
}

export default App