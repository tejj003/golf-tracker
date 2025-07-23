import { useState, useCallback, useRef } from 'react';
import { SwingData, SwingPhase, PoseKeypoint } from '../types/golf';

interface SwingDetectionState {
  isDetecting: boolean;
  currentPhase: SwingPhase;
  swingStartTime: number | null;
  swingPoints: PoseKeypoint[];
  ballLastPosition: { x: number; y: number } | null;
}

export const useSwingDetection = () => {
  const [state, setState] = useState<SwingDetectionState>({
    isDetecting: false,
    currentPhase: 'address',
    swingStartTime: null,
    swingPoints: [],
    ballLastPosition: null
  });
  
  const [lastSwing, setLastSwing] = useState<SwingData | null>(null);
  const swingDataRef = useRef<Partial<SwingData>>({});

  const analyzeSwingPhase = useCallback((landmarks: any[], timestamp: number): SwingPhase => {
    if (!landmarks || landmarks.length < 33) return 'address';

    // Get key pose landmarks for golf swing analysis
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftElbow = landmarks[13];
    const rightElbow = landmarks[14];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];

    if (!leftWrist || !rightWrist || !leftShoulder || !rightShoulder) {
      return 'address';
    }

    // Calculate wrist positions relative to shoulders
    const leftWristHeight = leftWrist.y - leftShoulder.y;
    const rightWristHeight = rightWrist.y - rightShoulder.y;
    const avgWristHeight = (leftWristHeight + rightWristHeight) / 2;

    // Calculate swing plane angle
    const wristDistance = Math.abs(leftWrist.x - rightWrist.x);
    const shoulderDistance = Math.abs(leftShoulder.x - rightShoulder.x);

    // Determine swing phase based on positions and movement
    if (avgWristHeight > 0.1) {
      if (wristDistance > shoulderDistance * 1.5) {
        return 'backswing';
      } else {
        return 'takeaway';
      }
    } else if (avgWristHeight < -0.3) {
      return 'follow-through';
    } else if (avgWristHeight < -0.1) {
      return 'downswing';
    } else {
      return 'address';
    }
  }, []);

  const calculateBallSpeed = useCallback((ballPositions: { x: number; y: number; timestamp: number }[]): number => {
    if (ballPositions.length < 2) return 0;

    const sortedPositions = ballPositions.sort((a, b) => a.timestamp - b.timestamp);
    const firstPos = sortedPositions[0];
    const lastPos = sortedPositions[sortedPositions.length - 1];

    const distance = Math.sqrt(
      Math.pow(lastPos.x - firstPos.x, 2) + 
      Math.pow(lastPos.y - firstPos.y, 2)
    );
    
    const timeElapsed = (lastPos.timestamp - firstPos.timestamp) / 1000; // Convert to seconds
    
    if (timeElapsed === 0) return 0;

    // Convert pixels per second to mph (approximate conversion based on camera setup)
    const pixelsPerSecond = distance / timeElapsed;
    const estimatedSpeedMph = pixelsPerSecond * 0.01; // This would need calibration
    
    return Math.min(estimatedSpeedMph, 200); // Cap at reasonable golf ball speed
  }, []);

  const calculateSwingMetrics = useCallback((swingPoints: PoseKeypoint[]): any => {
    if (swingPoints.length === 0) {
      return {
        overallScore: 0,
        timing: 0,
        balance: 0,
        consistency: 0,
        power: 0,
        tempo: 0
      };
    }

    // Calculate basic metrics from pose data
    const timing = Math.random() * 40 + 60; // Placeholder: 60-100
    const balance = Math.random() * 30 + 70; // Placeholder: 70-100
    const consistency = Math.random() * 40 + 50; // Placeholder: 50-90
    const power = Math.random() * 50 + 50; // Placeholder: 50-100
    const tempo = Math.random() * 30 + 70; // Placeholder: 70-100
    
    const overallScore = (timing + balance + consistency + power + tempo) / 5;

    return {
      overallScore: Math.round(overallScore),
      timing: Math.round(timing),
      balance: Math.round(balance),
      consistency: Math.round(consistency),
      power: Math.round(power),
      tempo: Math.round(tempo)
    };
  }, []);

  const detectSwing = useCallback((poseResults: any, timestamp: number) => {
    if (!poseResults || !poseResults.poseLandmarks) {
      return;
    }

    const landmarks = poseResults.poseLandmarks;
    const currentPhase = analyzeSwingPhase(landmarks, timestamp);

    setState(prevState => {
      const newState = { ...prevState };

      // Start swing detection on takeaway
      if (currentPhase === 'takeaway' && !prevState.isDetecting) {
        newState.isDetecting = true;
        newState.swingStartTime = timestamp;
        newState.swingPoints = [];
        swingDataRef.current = {
          id: `swing_${Date.now()}`,
          timestamp: Date.now(),
          swingPath: [],
          clubPath: [],
          ballTrajectory: [],
          poseKeypoints: []
        };
      }

      // Collect swing data during active detection
      if (newState.isDetecting) {
        const poseKeypoints: PoseKeypoint[] = landmarks.map((landmark: any, index: number) => ({
          name: `landmark_${index}`,
          x: landmark.x,
          y: landmark.y,
          z: landmark.z || 0,
          visibility: landmark.visibility || 1,
          timestamp
        }));

        newState.swingPoints.push(...poseKeypoints);
        newState.currentPhase = currentPhase;

        // End swing detection on follow-through completion
        if (currentPhase === 'follow-through' && prevState.currentPhase !== 'follow-through') {
          newState.isDetecting = false;
          
          const swingDuration = newState.swingStartTime ? timestamp - newState.swingStartTime : 0;
          const backswingTime = swingDuration * 0.6; // Approximate
          const downswingTime = swingDuration * 0.4; // Approximate
          
          const metrics = calculateSwingMetrics(newState.swingPoints);
          
          const swingData: SwingData = {
            id: swingDataRef.current.id || `swing_${Date.now()}`,
            timestamp: Date.now(),
            ballSpeed: calculateBallSpeed([]), // Would need ball tracking
            clubHeadSpeed: Math.random() * 50 + 80, // Placeholder: 80-130 mph
            swingTempo: swingDuration / 1000,
            backswingTime: backswingTime / 1000,
            downswingTime: downswingTime / 1000,
            impactAngle: Math.random() * 10 - 5, // Placeholder: -5 to +5 degrees
            swingPath: [],
            clubPath: [],
            ballTrajectory: [],
            poseKeypoints: newState.swingPoints,
            swingPlane: {
              angle: Math.random() * 20 + 50, // Placeholder: 50-70 degrees
              consistency: Math.random() * 0.3 + 0.7, // Placeholder: 0.7-1.0
              deviation: Math.random() * 5 + 2 // Placeholder: 2-7 degrees
            },
            metrics
          };

          setLastSwing(swingData);
        }
      }

      return newState;
    });
  }, [analyzeSwingPhase, calculateBallSpeed, calculateSwingMetrics]);

  const resetDetection = useCallback(() => {
    setState({
      isDetecting: false,
      currentPhase: 'address',
      swingStartTime: null,
      swingPoints: [],
      ballLastPosition: null
    });
    setLastSwing(null);
  }, []);

  return {
    isDetecting: state.isDetecting,
    currentPhase: state.currentPhase,
    detectSwing,
    resetDetection,
    lastSwing
  };
};
