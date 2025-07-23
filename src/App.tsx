import { useState, useEffect } from 'react'
import CameraView from './components/CameraView'
import MetricsPanel from './components/MetricsPanel'
import ControlPanel from './components/ControlPanel'
import SwingAnalyzer from './components/SwingAnalyzer'
import { SwingData, TrackingState } from './types/golf'
import { GolfAnalyzer } from './utils/golfAnalyzer'
import './App.css'

function App() {
  const [isTracking, setIsTracking] = useState(false)
  const [trackingState, setTrackingState] = useState<TrackingState>('idle')
  const [swingData, setSwingData] = useState<SwingData | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStartTracking = () => {
    setIsTracking(true)
    setTrackingState('ready')
  }

  const handleStopTracking = () => {
    setIsTracking(false)
    setTrackingState('idle')
    setIsRecording(false)
  }

  const handleSwingDetected = (data: SwingData) => {
    setSwingData(data)
    setTrackingState('analyzing')
    
    // Simulate analysis processing
    setTimeout(() => {
      setTrackingState('complete')
    }, 2000)
  }

  const handleStartRecording = () => {
    setIsRecording(true)
    setTrackingState('recording')
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setTrackingState('ready')
  }

  // Demo function to generate sample data
  const handleTryDemo = () => {
    setTrackingState('analyzing')
    setTimeout(() => {
      const demoData = GolfAnalyzer.generateMockSwingData()
      setSwingData(demoData)
      setTrackingState('complete')
    }, 1500)
  }

  return (
    <div className="app">
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <h1>🏌️ Golf Shot Tracker</h1>
          <p>AI-Powered Swing Analysis using Computer Vision</p>
        </div>
      </header>

      <main className="app-main">
        <div className="tracking-section">
          <CameraView
            isTracking={isTracking}
            isRecording={isRecording}
            onSwingDetected={handleSwingDetected}
            trackingState={trackingState}
          />
          
          <ControlPanel
            isTracking={isTracking}
            isRecording={isRecording}
            trackingState={trackingState}
            onStartTracking={handleStartTracking}
            onStopTracking={handleStopTracking}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
            onTryDemo={handleTryDemo}
          />
        </div>

        <div className="analysis-section">
          <MetricsPanel swingData={swingData} />
          <SwingAnalyzer swingData={swingData} />
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React, MediaPipe, and OpenCV.js | Real-time Computer Vision Golf Analysis</p>
        <p>© 2025 Golf Shot Tracker - Improve your game with AI technology</p>
      </footer>
    </div>
  )
}

export default App
