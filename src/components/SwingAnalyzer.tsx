import React, { useEffect, useRef } from 'react';
import { SwingData } from '../types/golf';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
} from 'chart.js';
import { Line, Radar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement
);

interface SwingAnalyzerProps {
  swingData: SwingData | null;
}

const SwingAnalyzer: React.FC<SwingAnalyzerProps> = ({ swingData }) => {
  const chartRef = useRef<any>(null);

  if (!swingData) {
    return (
      <div className="swing-analyzer">
        <h3>📈 Swing Analysis</h3>
        <p className="no-data">Record a swing to see detailed analysis charts.</p>
      </div>
    );
  }

  const swingPathData = {
    labels: swingData.poseKeypoints.map((_, index) => `Frame ${index + 1}`),
    datasets: [
      {
        label: 'Wrist Trajectory',
        data: swingData.poseKeypoints
          .filter(kp => kp.name.includes('15') || kp.name.includes('16')) // Wrist landmarks
          .map(kp => ({ x: kp.x * 100, y: kp.y * 100 })),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderWidth: 2,
        pointRadius: 1,
        tension: 0.4
      }
    ]
  };

  const performanceRadarData = {
    labels: ['Timing', 'Balance', 'Consistency', 'Power', 'Tempo'],
    datasets: [
      {
        label: 'Current Swing',
        data: [
          swingData.metrics.timing,
          swingData.metrics.balance,
          swingData.metrics.consistency,
          swingData.metrics.power,
          swingData.metrics.tempo
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgb(16, 185, 129)',
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(16, 185, 129)',
        borderWidth: 2
      },
      {
        label: 'Target (Pro Level)',
        data: [90, 90, 85, 80, 85],
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderColor: 'rgba(239, 68, 68, 0.5)',
        pointBackgroundColor: 'rgba(239, 68, 68, 0.5)',
        pointBorderColor: '#fff',
        borderWidth: 1,
        borderDash: [5, 5]
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Swing Path Analysis',
        color: 'white'
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: 'Performance Analysis',
        color: 'white'
      }
    },
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        pointLabels: {
          color: 'white'
        },
        ticks: {
          color: 'white',
          backdropColor: 'transparent'
        },
        min: 0,
        max: 100
      }
    }
  };

  return (
    <div className="swing-analyzer">
      <h3>📈 Swing Analysis</h3>
      
      <div className="charts-container">
        <div className="chart-container">
          <div style={{ height: '300px' }}>
            <Line ref={chartRef} data={swingPathData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div style={{ height: '300px' }}>
            <Radar data={performanceRadarData} options={radarOptions} />
          </div>
        </div>
      </div>

      <div className="analysis-insights">
        <h4>🔍 Key Insights</h4>
        <div className="insights-grid">
          <div className="insight-card">
            <h5>Swing Plane</h5>
            <p>
              Your swing plane is at {swingData.swingPlane.angle.toFixed(1)}° with{' '}
              {(swingData.swingPlane.consistency * 100).toFixed(0)}% consistency.
              {swingData.swingPlane.angle < 55 ? ' Try to steepen your swing plane.' : ''}
              {swingData.swingPlane.angle > 65 ? ' Try to flatten your swing plane.' : ''}
            </p>
          </div>

          <div className="insight-card">
            <h5>Tempo Analysis</h5>
            <p>
              Backswing: {swingData.backswingTime.toFixed(2)}s, 
              Downswing: {swingData.downswingTime.toFixed(2)}s.
              {swingData.backswingTime / swingData.downswingTime > 3 ? 
                ' Good tempo ratio!' : 
                ' Work on slowing down your backswing relative to downswing.'}
            </p>
          </div>

          <div className="insight-card">
            <h5>Power Generation</h5>
            <p>
              Club head speed: {swingData.clubHeadSpeed.toFixed(1)} mph.
              {swingData.clubHeadSpeed < 90 ? 
                ' Focus on hip rotation and weight transfer for more power.' :
                swingData.clubHeadSpeed > 110 ?
                ' Excellent power! Focus on consistency.' :
                ' Good power generation.'}
            </p>
          </div>

          <div className="insight-card">
            <h5>Impact Position</h5>
            <p>
              Impact angle: {swingData.impactAngle.toFixed(1)}°.
              {Math.abs(swingData.impactAngle) < 2 ? 
                ' Excellent impact position!' :
                swingData.impactAngle > 2 ?
                ' Try to strike down on the ball more.' :
                ' Avoid hitting up on the ball too much.'}
            </p>
          </div>
        </div>
      </div>

      <div className="recommendations">
        <h4>💡 Practice Recommendations</h4>
        <ul>
          {swingData.metrics.balance < 70 && (
            <li>Work on balance drills - practice swinging with your feet together</li>
          )}
          {swingData.metrics.timing < 70 && (
            <li>Practice tempo drills - use a metronome for consistent timing</li>
          )}
          {swingData.clubHeadSpeed < 90 && (
            <li>Focus on hip rotation and weight transfer exercises</li>
          )}
          {swingData.swingPlane.consistency < 0.8 && (
            <li>Practice with alignment sticks to improve swing plane consistency</li>
          )}
          {swingData.metrics.power < 70 && (
            <li>Work on core strengthening and flexibility exercises</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SwingAnalyzer;
