import { SwingData, SwingPhase, SwingMetrics } from '../types/golf';

// Golf swing analysis utilities
export class GolfAnalyzer {
  
  /**
   * Generate mock swing data for demonstration
   */
  static generateMockSwingData(): SwingData {
    const timestamp = Date.now();
    const id = `swing_${timestamp}`;
    
    // Simulate realistic golf swing metrics
    const ballSpeed = Math.random() * 40 + 120; // 120-160 mph
    const clubHeadSpeed = ballSpeed * 0.7 + Math.random() * 10; // Realistic ratio
    const backswingTime = Math.random() * 0.3 + 0.8; // 0.8-1.1 seconds
    const downswingTime = Math.random() * 0.1 + 0.2; // 0.2-0.3 seconds
    const swingTempo = backswingTime + downswingTime;
    const impactAngle = (Math.random() - 0.5) * 8; // -4 to +4 degrees
    
    const swingPlane = {
      angle: Math.random() * 15 + 55, // 55-70 degrees
      consistency: Math.random() * 0.3 + 0.7, // 70-100%
      deviation: Math.random() * 5 + 1 // 1-6 degrees
    };
    
    const metrics: SwingMetrics = {
      overallScore: Math.floor(Math.random() * 40 + 60), // 60-100
      timing: Math.floor(Math.random() * 30 + 70), // 70-100
      balance: Math.floor(Math.random() * 35 + 65), // 65-100
      consistency: Math.floor(Math.random() * 40 + 60), // 60-100
      power: Math.floor(Math.random() * 35 + 65), // 65-100
      tempo: Math.floor(Math.random() * 30 + 70) // 70-100
    };
    
    // Generate mock pose keypoints (simplified)
    const poseKeypoints = this.generateMockPoseKeypoints();
    
    return {
      id,
      timestamp,
      ballSpeed,
      clubHeadSpeed,
      swingTempo,
      backswingTime,
      downswingTime,
      impactAngle,
      swingPath: [],
      clubPath: [],
      ballTrajectory: [],
      poseKeypoints,
      swingPlane,
      metrics
    };
  }
  
  /**
   * Generate mock pose keypoints for demonstration
   */
  private static generateMockPoseKeypoints() {
    const keypoints = [];
    const phases: SwingPhase[] = ['address', 'takeaway', 'backswing', 'transition', 'downswing', 'impact', 'follow-through', 'finish'];
    
    for (let i = 0; i < 100; i++) {
      const progress = i / 99;
      const phase = phases[Math.floor(progress * phases.length)];
      
      // Simulate wrist movement through swing
      const wristX = 0.5 + Math.sin(progress * Math.PI * 2) * 0.3;
      const wristY = 0.6 + Math.cos(progress * Math.PI * 2) * 0.2;
      
      keypoints.push({
        name: '15', // Left wrist
        x: wristX,
        y: wristY,
        z: 0,
        visibility: 0.9,
        timestamp: i * 16.67 // ~60fps
      });
    }
    
    return keypoints;
  }
  
  /**
   * Calculate swing score based on metrics
   */
  static calculateSwingScore(data: SwingData): number {
    const { metrics, clubHeadSpeed, swingTempo, swingPlane } = data;
    
    let score = 0;
    
    // Base score from metrics (60% weight)
    score += (metrics.timing + metrics.balance + metrics.consistency + metrics.power + metrics.tempo) / 5 * 0.6;
    
    // Club head speed bonus (20% weight)
    const speedScore = Math.min(clubHeadSpeed / 110 * 100, 100); // 110 mph = 100 points
    score += speedScore * 0.2;
    
    // Swing plane consistency (20% weight)
    const planeScore = swingPlane.consistency * 100;
    score += planeScore * 0.2;
    
    return Math.round(Math.min(score, 100));
  }
  
  /**
   * Get performance recommendations based on swing data
   */
  static getRecommendations(data: SwingData): string[] {
    const recommendations = [];
    const { metrics, clubHeadSpeed, swingPlane } = data;
    
    if (metrics.balance < 70) {
      recommendations.push("Work on balance drills - practice swinging with your feet together");
    }
    
    if (metrics.timing < 70) {
      recommendations.push("Practice tempo drills - use a metronome for consistent timing");
    }
    
    if (clubHeadSpeed < 90) {
      recommendations.push("Focus on hip rotation and weight transfer exercises");
    }
    
    if (swingPlane.consistency < 0.8) {
      recommendations.push("Practice with alignment sticks to improve swing plane consistency");
    }
    
    if (metrics.power < 70) {
      recommendations.push("Work on core strengthening and flexibility exercises");
    }
    
    if (metrics.consistency < 70) {
      recommendations.push("Focus on repeating the same swing sequence - practice slow swings");
    }
    
    return recommendations;
  }
  
  /**
   * Format speed values for display
   */
  static formatSpeed(speed: number): string {
    return `${speed.toFixed(1)} mph`;
  }
  
  /**
   * Format time values for display
   */
  static formatTime(time: number): string {
    return `${time.toFixed(2)}s`;
  }
  
  /**
   * Format angle values for display
   */
  static formatAngle(angle: number): string {
    return `${angle.toFixed(1)}°`;
  }
  
  /**
   * Get color for score values
   */
  static getScoreColor(score: number): string {
    if (score >= 80) return '#22c55e'; // Green
    if (score >= 60) return '#34d399'; // Light green
    if (score >= 40) return '#fbbf24'; // Yellow
    return '#ef4444'; // Red
  }
  
  /**
   * Get performance level text
   */
  static getPerformanceLevel(score: number): string {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  }
}

// Animation utilities
export class AnimationUtils {
  
  /**
   * Smooth animation helper
   */
  static easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  
  /**
   * Linear interpolation
   */
  static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t;
  }
  
  /**
   * Create smooth counter animation
   */
  static animateCounter(
    element: HTMLElement, 
    start: number, 
    end: number, 
    duration: number = 1000
  ): void {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = this.easeInOutCubic(progress);
      const currentValue = this.lerp(start, end, easedProgress);
      
      element.textContent = Math.round(currentValue).toString();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
}

// Camera utilities
export class CameraUtils {
  
  /**
   * Get optimal camera constraints based on device
   */
  static getOptimalConstraints(): MediaStreamConstraints {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    return {
      video: {
        width: { ideal: isMobile ? 720 : 1280 },
        height: { ideal: isMobile ? 480 : 720 },
        frameRate: { ideal: isMobile ? 24 : 30 },
        facingMode: 'environment'
      },
      audio: false
    };
  }
  
  /**
   * Check camera support
   */
  static async checkCameraSupport(): Promise<boolean> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'videoinput');
    } catch {
      return false;
    }
  }
}

// Performance utilities
export class PerformanceUtils {
  
  /**
   * Throttle function calls
   */
  static throttle<T extends (...args: any[]) => any>(
    func: T, 
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return function(this: any, ...args: Parameters<T>) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  /**
   * Debounce function calls
   */
  static debounce<T extends (...args: any[]) => any>(
    func: T, 
    delay: number
  ): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout;
    return function(this: any, ...args: Parameters<T>) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
}

// Constants
export const GOLF_CONSTANTS = {
  AVERAGE_BALL_SPEED: 140, // mph
  AVERAGE_CLUB_SPEED: 98, // mph
  OPTIMAL_SWING_TEMPO: 1.2, // seconds
  OPTIMAL_TEMPO_RATIO: 3, // backswing:downswing ratio
  OPTIMAL_SWING_PLANE: 62, // degrees
  
  SCORE_THRESHOLDS: {
    EXCELLENT: 90,
    VERY_GOOD: 80,
    GOOD: 70,
    FAIR: 60
  },
  
  POSE_LANDMARKS: {
    LEFT_SHOULDER: 11,
    RIGHT_SHOULDER: 12,
    LEFT_ELBOW: 13,
    RIGHT_ELBOW: 14,
    LEFT_WRIST: 15,
    RIGHT_WRIST: 16,
    LEFT_HIP: 23,
    RIGHT_HIP: 24
  }
};
