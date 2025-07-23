import { useState, useEffect, useCallback } from 'react';
import { Pose, POSE_LANDMARKS } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

interface PoseResults {
  poseLandmarks: any[];
  poseWorldLandmarks: any[];
}

export const usePoseDetection = () => {
  const [pose, setPose] = useState<Pose | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastResults, setLastResults] = useState<PoseResults | null>(null);

  useEffect(() => {
    const initializePose = async () => {
      try {
        const poseInstance = new Pose({
          locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
          }
        });

        poseInstance.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          smoothSegmentation: false,
          minDetectionConfidence: 0.5,
          minTrackingConfidence: 0.5
        });

        poseInstance.onResults((results: PoseResults) => {
          setLastResults(results);
        });

        await poseInstance.initialize();
        setPose(poseInstance);
        setIsLoaded(true);
      } catch (error) {
        console.error('Failed to initialize pose detection:', error);
      }
    };

    initializePose();

    return () => {
      if (pose) {
        pose.close();
      }
    };
  }, []);

  const detectPose = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!pose || !isLoaded) {
      return null;
    }

    try {
      await pose.send({ image: videoElement });
      return lastResults;
    } catch (error) {
      console.error('Pose detection error:', error);
      return null;
    }
  }, [pose, isLoaded, lastResults]);

  const drawPose = useCallback((
    ctx: CanvasRenderingContext2D, 
    results: PoseResults
  ) => {
    if (!results || !results.poseLandmarks) {
      return;
    }

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Draw pose connections
    drawConnectors(ctx, results.poseLandmarks, POSE_LANDMARKS, {
      color: '#00FF00',
      lineWidth: 2
    });

    // Draw pose landmarks
    drawLandmarks(ctx, results.poseLandmarks, {
      color: '#FF0000',
      radius: 3
    });

    // Highlight key golf swing points
    const keyPoints = [
      11, 12, // Shoulders
      13, 14, // Elbows
      15, 16, // Wrists
      23, 24, // Hips
      25, 26, // Knees
      27, 28  // Ankles
    ];

    keyPoints.forEach(pointIndex => {
      if (results.poseLandmarks[pointIndex]) {
        const landmark = results.poseLandmarks[pointIndex];
        const x = landmark.x * width;
        const y = landmark.y * height;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#FFD700';
        ctx.fill();
        ctx.strokeStyle = '#FF6B00';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });

  }, []);

  return {
    isLoaded,
    detectPose,
    drawPose,
    lastResults
  };
};
