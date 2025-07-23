import React, { useRef, useEffect, useState } from 'react';
import { useCamera } from '../hooks/useCamera';
import { usePoseDetection } from '../hooks/usePoseDetection';
import { useSwingDetection } from '../hooks/useSwingDetection';
import { SwingData, TrackingState } from '../types/golf';

interface CameraViewProps {
  isTracking: boolean;
  isRecording: boolean;
  onSwingDetected: (swingData: SwingData) => void;
  trackingState: TrackingState;
}

const CameraView: React.FC<CameraViewProps> = ({
  isTracking,
  isRecording,
  onSwingDetected,
  trackingState
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  const { 
    stream, 
    startCamera, 
    stopCamera, 
    isLoading: cameraLoading 
  } = useCamera();

  const {
    isLoaded: poseLoaded,
    detectPose,
    drawPose
  } = usePoseDetection();

  const {
    detectSwing,
    isDetecting,
    lastSwing
  } = useSwingDetection();

  useEffect(() => {
    if (isTracking && !stream) {
      startCamera()
        .catch(err => setError(`Camera access failed: ${err.message}`));
    } else if (!isTracking && stream) {
      stopCamera();
    }
  }, [isTracking, stream, startCamera, stopCamera]);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    if (lastSwing) {
      onSwingDetected(lastSwing);
    }
  }, [lastSwing, onSwingDetected]);

  useEffect(() => {
    let animationFrame: number;

    const processFrame = async () => {
      if (!videoRef.current || !canvasRef.current || !isTracking || !poseLoaded) {
        return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx || video.readyState < 2) {
        animationFrame = requestAnimationFrame(processFrame);
        return;
      }

      // Set canvas size to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        // Detect pose
        const pose = await detectPose(video);
        
        // Clear canvas and draw pose
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (pose) {
          drawPose(ctx, pose);
          
          // Detect swing if recording
          if (isRecording) {
            detectSwing(pose, video.currentTime);
          }
        }

        // Draw recording indicator
        if (isRecording) {
          ctx.fillStyle = 'rgba(239, 68, 68, 0.8)';
          ctx.beginPath();
          ctx.arc(30, 30, 10, 0, 2 * Math.PI);
          ctx.fill();
          
          ctx.fillStyle = 'white';
          ctx.font = '16px Inter, sans-serif';
          ctx.fillText('REC', 50, 35);
        }

        // Draw tracking state
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(10, canvas.height - 40, 200, 30);
        ctx.fillStyle = 'white';
        ctx.font = '14px Inter, sans-serif';
        ctx.fillText(`Status: ${trackingState}`, 15, canvas.height - 20);

      } catch (err) {
        console.error('Frame processing error:', err);
      }

      animationFrame = requestAnimationFrame(processFrame);
    };

    if (isTracking) {
      processFrame();
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isTracking, isRecording, poseLoaded, detectPose, drawPose, detectSwing, trackingState]);

  if (error) {
    return (
      <div className="camera-container">
        <div className="error-message">
          <h3>Camera Error</h3>
          <p>{error}</p>
          <button className="button" onClick={() => setError(null)}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="camera-container">
      <video
        ref={videoRef}
        className="video-feed"
        autoPlay
        playsInline
        muted
        style={{ display: stream ? 'block' : 'none' }}
      />
      
      <canvas
        ref={canvasRef}
        className="overlay-canvas"
        style={{ display: isTracking ? 'block' : 'none' }}
      />
      
      {cameraLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Initializing camera...</p>
        </div>
      )}
      
      {!stream && !cameraLoading && !error && (
        <div className="camera-placeholder">
          <h3>📹 Camera Ready</h3>
          <p>Click "Start Tracking" to begin golf swing analysis</p>
        </div>
      )}
    </div>
  );
};

export default CameraView;
