export interface SwingData {
  id: string;
  timestamp: number;
  ballSpeed: number; // mph
  clubHeadSpeed: number; // mph
  swingTempo: number; // seconds
  backswingTime: number; // seconds
  downswingTime: number; // seconds
  impactAngle: number; // degrees
  swingPath: SwingPathPoint[];
  clubPath: ClubPathPoint[];
  ballTrajectory: BallTrajectoryPoint[];
  poseKeypoints: PoseKeypoint[];
  swingPlane: SwingPlane;
  metrics: SwingMetrics;
}

export interface SwingPathPoint {
  x: number;
  y: number;
  timestamp: number;
  phase: SwingPhase;
}

export interface ClubPathPoint {
  x: number;
  y: number;
  z: number;
  timestamp: number;
  velocity: number;
  acceleration: number;
}

export interface BallTrajectoryPoint {
  x: number;
  y: number;
  z: number;
  timestamp: number;
  velocity: number;
}

export interface PoseKeypoint {
  name: string;
  x: number;
  y: number;
  z: number;
  visibility: number;
  timestamp: number;
}

export interface SwingPlane {
  angle: number; // degrees
  consistency: number; // 0-1
  deviation: number; // degrees
}

export interface SwingMetrics {
  overallScore: number; // 0-100
  timing: number; // 0-100
  balance: number; // 0-100
  consistency: number; // 0-100
  power: number; // 0-100
  tempo: number; // 0-100
}

export type SwingPhase = 
  | 'address' 
  | 'takeaway' 
  | 'backswing' 
  | 'transition' 
  | 'downswing' 
  | 'impact' 
  | 'follow-through' 
  | 'finish';

export type TrackingState = 
  | 'idle' 
  | 'initializing' 
  | 'ready' 
  | 'recording' 
  | 'analyzing' 
  | 'complete' 
  | 'error';

export interface CameraSettings {
  width: number;
  height: number;
  frameRate: number;
  facingMode: 'user' | 'environment';
}

export interface DetectionSettings {
  minDetectionConfidence: number;
  minTrackingConfidence: number;
  ballDetectionThreshold: number;
  swingDetectionSensitivity: number;
}

export interface CalibrationData {
  pixelsPerMeter: number;
  cameraHeight: number; // meters
  cameraAngle: number; // degrees
  distanceToPlayer: number; // meters
}
