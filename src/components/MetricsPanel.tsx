import React from 'react';
import { SwingData } from '../types/golf';

interface MetricsPanelProps {
  swingData: SwingData | null;
}

const MetricsPanel: React.FC<MetricsPanelProps> = ({ swingData }) => {
  if (!swingData) {
    return (
      <div className="metrics-panel">
        <h3>📊 Swing Metrics</h3>
        <p className="no-data">No swing data available. Record a swing to see analysis.</p>
      </div>
    );
  }

  const {
    ballSpeed,
    clubHeadSpeed,
    swingTempo,
    backswingTime,
    downswingTime,
    impactAngle,
    swingPlane,
    metrics
  } = swingData;

  return (
    <div className="metrics-panel">
      <h3>📊 Swing Metrics</h3>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-value">{ballSpeed.toFixed(1)}</div>
          <div className="metric-label">Ball Speed (mph)</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{clubHeadSpeed.toFixed(1)}</div>
          <div className="metric-label">Club Speed (mph)</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{swingTempo.toFixed(2)}</div>
          <div className="metric-label">Total Time (s)</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{backswingTime.toFixed(2)}</div>
          <div className="metric-label">Backswing (s)</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{downswingTime.toFixed(2)}</div>
          <div className="metric-label">Downswing (s)</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{impactAngle.toFixed(1)}°</div>
          <div className="metric-label">Impact Angle</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{swingPlane.angle.toFixed(1)}°</div>
          <div className="metric-label">Swing Plane</div>
        </div>

        <div className="metric-card">
          <div className="metric-value">{(swingPlane.consistency * 100).toFixed(0)}%</div>
          <div className="metric-label">Consistency</div>
        </div>
      </div>

      <div className="swing-scores">
        <h4>🎯 Swing Analysis Scores</h4>
        <div className="scores-grid">
          <div className="score-item">
            <span className="score-label">Overall Score:</span>
            <span className={`score-value ${getScoreClass(metrics.overallScore)}`}>
              {metrics.overallScore}/100
            </span>
          </div>
          
          <div className="score-item">
            <span className="score-label">Timing:</span>
            <span className={`score-value ${getScoreClass(metrics.timing)}`}>
              {metrics.timing}/100
            </span>
          </div>
          
          <div className="score-item">
            <span className="score-label">Balance:</span>
            <span className={`score-value ${getScoreClass(metrics.balance)}`}>
              {metrics.balance}/100
            </span>
          </div>
          
          <div className="score-item">
            <span className="score-label">Power:</span>
            <span className={`score-value ${getScoreClass(metrics.power)}`}>
              {metrics.power}/100
            </span>
          </div>
          
          <div className="score-item">
            <span className="score-label">Tempo:</span>
            <span className={`score-value ${getScoreClass(metrics.tempo)}`}>
              {metrics.tempo}/100
            </span>
          </div>
        </div>
      </div>

      <div className="swing-summary">
        <h4>📝 Quick Analysis</h4>
        <div className="analysis-text">
          {generateSwingAnalysis(swingData)}
        </div>
      </div>
    </div>
  );
};

const getScoreClass = (score: number): string => {
  if (score >= 80) return 'score-excellent';
  if (score >= 60) return 'score-good';
  if (score >= 40) return 'score-fair';
  return 'score-poor';
};

const generateSwingAnalysis = (swingData: SwingData): string => {
  const { metrics, clubHeadSpeed, swingTempo } = swingData;
  
  let analysis = '';
  
  if (metrics.overallScore >= 80) {
    analysis += 'Excellent swing! ';
  } else if (metrics.overallScore >= 60) {
    analysis += 'Good swing with room for improvement. ';
  } else {
    analysis += 'Several areas to work on. ';
  }
  
  if (clubHeadSpeed < 90) {
    analysis += 'Focus on increasing club head speed through better rotation. ';
  } else if (clubHeadSpeed > 120) {
    analysis += 'Great club head speed! ';
  }
  
  if (swingTempo < 1.0) {
    analysis += 'Your swing is quite fast - try slowing down for better control. ';
  } else if (swingTempo > 2.0) {
    analysis += 'Your swing tempo is quite slow - try to be more aggressive. ';
  } else {
    analysis += 'Good swing tempo. ';
  }
  
  if (metrics.balance < 60) {
    analysis += 'Work on maintaining better balance throughout your swing. ';
  }
  
  if (metrics.timing < 60) {
    analysis += 'Focus on the timing of your swing sequence. ';
  }
  
  return analysis;
};

export default MetricsPanel;
