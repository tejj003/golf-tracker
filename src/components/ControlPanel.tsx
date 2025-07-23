import React from 'react';
import { TrackingState } from '../types/golf';
import { Play, Square, Camera, StopCircle } from 'lucide-react';

interface ControlPanelProps {
  isTracking: boolean;
  isRecording: boolean;
  trackingState: TrackingState;
  onStartTracking: () => void;
  onStopTracking: () => void;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onTryDemo?: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isTracking,
  isRecording,
  trackingState,
  onStartTracking,
  onStopTracking,
  onStartRecording,
  onStopRecording,
  onTryDemo
}) => {
  const getStatusIndicator = () => {
    switch (trackingState) {
      case 'recording':
        return <span className="status-indicator recording">🔴 Recording</span>;
      case 'ready':
        return <span className="status-indicator ready">✅ Ready</span>;
      case 'analyzing':
        return <span className="status-indicator processing">⚡ Analyzing</span>;
      case 'complete':
        return <span className="status-indicator ready">✅ Analysis Complete</span>;
      case 'error':
        return <span className="status-indicator recording">❌ Error</span>;
      default:
        return <span className="status-indicator">⏳ Idle</span>;
    }
  };

  return (
    <div className="controls-panel">
      <div className="status-section">
        <h3>System Status</h3>
        {getStatusIndicator()}
      </div>

      <div className="controls-section">
        <h3>Camera Controls</h3>
        <div className="button-group">
          {!isTracking ? (
            <button
              className="button"
              onClick={onStartTracking}
              disabled={trackingState === 'initializing'}
            >
              <Camera size={20} />
              Start Tracking
            </button>
          ) : (
            <button
              className="button"
              onClick={onStopTracking}
            >
              <StopCircle size={20} />
              Stop Tracking
            </button>
          )}

          {isTracking && !isRecording && (
            <button
              className="button"
              onClick={onStartRecording}
              disabled={trackingState !== 'ready'}
            >
              <Play size={20} />
              Start Recording
            </button>
          )}

          {isRecording && (
            <button
              className="button"
              onClick={onStopRecording}
              style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}
            >
              <Square size={20} />
              Stop Recording
            </button>
          )}
        </div>
      </div>

      <div className="instructions-section">
        <h3>Instructions</h3>
        <ol>
          <li>Position yourself in frame with your golf club</li>
          <li>Click "Start Tracking" to initialize pose detection</li>
          <li>Click "Start Recording" when ready to swing</li>
          <li>Perform your golf swing naturally</li>
          <li>View analysis results below</li>
        </ol>
      </div>

      <div className="tips-section">
        <h3>💡 Tips for Best Results</h3>
        <ul>
          <li>Ensure good lighting conditions</li>
          <li>Keep your full body visible in frame</li>
          <li>Stand perpendicular to the camera</li>
          <li>Maintain consistent distance from camera</li>
          <li>Use a contrasting background</li>
        </ul>
      </div>
    </div>
  );
};

export default ControlPanel;
