# 🏌️ Golf Shot Tracker

An AI-powered golf swing analysis website that uses computer vision to track and analyze your golf shots in real-time. Get instant feedback on your swing mechanics, ball speed, tempo, and overall technique using just your camera.

## ✨ Features

### 🎯 Real-time Swing Analysis
- **Pose Detection**: Advanced pose estimation using MediaPipe
- **Swing Path Tracking**: Visualize your club and body movement
- **Phase Detection**: Automatic identification of swing phases (address, takeaway, backswing, downswing, impact, follow-through)

### 📊 Comprehensive Metrics
- **Ball Speed Estimation**: Calculate ball velocity after impact
- **Club Head Speed**: Measure your club head speed throughout the swing
- **Swing Tempo**: Analyze backswing and downswing timing
- **Impact Angle**: Assess your angle of attack at impact
- **Swing Plane Analysis**: Track swing plane consistency and angle

### 📈 Performance Scoring
- **Overall Swing Score**: Comprehensive rating out of 100
- **Individual Metrics**: Timing, balance, consistency, power, and tempo scores
- **Comparative Analysis**: Compare against professional benchmarks
- **Progress Tracking**: Monitor improvement over time

### 🎨 Interactive Visualizations
- **Real-time Pose Overlay**: See your skeleton tracking on live video
- **Swing Path Charts**: Line graphs showing club and wrist trajectories
- **Performance Radar**: Spider chart displaying all performance metrics
- **Progress Analytics**: Historical data visualization

### 💡 AI-Powered Insights
- **Personalized Feedback**: Custom analysis based on your swing data
- **Practice Recommendations**: Targeted suggestions for improvement
- **Technique Tips**: Professional insights for better performance
- **Drill Suggestions**: Specific exercises to address weak areas

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Modern web browser** with camera access
- **Good lighting** for optimal pose detection
- **Stable internet connection** for MediaPipe models

### Installation

1. **Install Node.js** if you haven't already:
   - Visit [nodejs.org](https://nodejs.org/)
   - Download and install the latest LTS version
   - Verify installation: `node --version` and `npm --version`

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Building for Production
```bash
npm run build
npm run preview
```

## 🎯 How to Use

### Setup
1. **Position your camera** about 6-8 feet away, perpendicular to your swing plane
2. **Ensure good lighting** with minimal shadows
3. **Clear background** works best for pose detection
4. **Wear contrasting clothing** for better tracking

### Recording a Swing
1. Click **"Start Tracking"** to initialize pose detection
2. Position yourself in the camera frame with your golf club
3. Click **"Start Recording"** when ready to swing
4. **Perform your golf swing** naturally
5. **View instant analysis** with detailed metrics and insights

### Understanding Your Results

#### Swing Metrics
- **Ball Speed**: Estimated velocity of the ball after impact (mph)
- **Club Head Speed**: Peak velocity of your club head (mph)
- **Swing Tempo**: Total time from takeaway to finish (seconds)
- **Impact Angle**: Angle of club at ball contact (degrees)
- **Swing Plane**: Consistency and angle of your swing plane

#### Performance Scores (0-100)
- **Timing**: Sequence and coordination of swing movements
- **Balance**: Stability throughout the swing
- **Consistency**: Repeatability of swing mechanics
- **Power**: Efficiency of power generation and transfer
- **Tempo**: Rhythm and pacing of the swing

## 🛠️ Technology Stack

### Frontend Framework
- **React 18**: Modern UI framework with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and development server

### Computer Vision
- **MediaPipe**: Google's pose estimation framework
- **OpenCV.js**: Computer vision algorithms in the browser
- **WebRTC**: Camera access and video processing

### Data Visualization
- **Chart.js**: Interactive charts and graphs
- **React Chart.js 2**: React wrapper for Chart.js
- **Custom Canvas**: Real-time pose overlay rendering

### Styling
- **CSS3**: Modern styling with grid and flexbox
- **CSS Variables**: Dynamic theming
- **Responsive Design**: Mobile and tablet support

## 📱 Browser Compatibility

### Recommended Browsers
- **Chrome 90+** (Best performance)
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**

### Required Features
- **WebRTC support** for camera access
- **WebAssembly** for MediaPipe
- **ES2020 features** for modern JavaScript
- **Canvas API** for pose visualization

## 🎯 Best Practices for Accurate Results

### Camera Setup
- **Tripod or stable surface** for consistent positioning
- **6-8 feet distance** from the golfer
- **Hip height** camera position
- **Side view** (perpendicular to target line)

### Lighting Conditions
- **Natural daylight** or bright indoor lighting
- **Avoid backlighting** or strong shadows
- **Even illumination** across the swing area
- **Minimal background clutter**

### Swing Execution
- **Normal swing speed** for best tracking
- **Full body visible** throughout the swing
- **Consistent setup position** for comparison
- **Multiple swings** for better analysis

## 🔧 Customization

### Detection Settings
You can adjust the computer vision parameters in the code:

```typescript
// In usePoseDetection.ts
poseInstance.setOptions({
  modelComplexity: 1,        // 0, 1, or 2 (higher = more accurate, slower)
  smoothLandmarks: true,     // Smooth landmark positions
  minDetectionConfidence: 0.5,  // Confidence threshold for detection
  minTrackingConfidence: 0.5    // Confidence threshold for tracking
});
```

### Camera Settings
Modify camera parameters in `useCamera.ts`:

```typescript
const mediaStream = await navigator.mediaDevices.getUserMedia({
  video: {
    width: { ideal: 1280 },    // Camera resolution
    height: { ideal: 720 },
    frameRate: { ideal: 30 },  // Frames per second
    facingMode: 'environment'  // 'user' for front camera
  }
});
```

## 🐛 Troubleshooting

### Common Issues

#### Camera Not Working
- **Check permissions**: Allow camera access in browser
- **Try different browsers**: Chrome generally works best
- **Check other apps**: Close other applications using the camera
- **Restart browser**: Sometimes helps with permission issues

#### Poor Pose Detection
- **Improve lighting**: Add more light sources
- **Check background**: Use a plain, contrasting background
- **Distance**: Move closer or further from camera
- **Clothing**: Wear form-fitting, contrasting clothes

#### Low Performance
- **Close other tabs**: Free up browser resources
- **Lower resolution**: Reduce camera resolution in settings
- **Update browser**: Use the latest browser version
- **Check hardware**: Ensure adequate CPU/GPU performance

#### Analysis Inaccuracies
- **Calibration**: The system uses estimated measurements
- **Multiple swings**: Take several swings for better average
- **Consistent setup**: Use same position and camera angle
- **Professional comparison**: Remember these are estimates, not professional measurements

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Development Setup
1. Fork the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature-name`
4. Make your changes
5. Run tests: `npm run lint`
6. Submit a pull request

### Areas for Contribution
- **Improved algorithms** for swing analysis
- **Additional metrics** and insights
- **Mobile optimization** and responsive design
- **Performance improvements** and optimization
- **Documentation** and tutorials
- **Bug fixes** and stability improvements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MediaPipe Team** for the amazing pose detection framework
- **OpenCV Community** for computer vision tools
- **Golf Professionals** who provided insights on swing mechanics
- **React Community** for the excellent ecosystem

## 📞 Support

Having issues? Here's how to get help:

1. **Check this README** for common solutions
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed information
4. **Join our community** for discussions and tips

## 🔮 Roadmap

### Short Term
- [ ] Ball tracking and trajectory analysis
- [ ] Mobile app version
- [ ] Swing comparison feature
- [ ] Export swing data

### Long Term
- [ ] AI-powered coaching recommendations
- [ ] Integration with golf simulation software
- [ ] Social features and sharing
- [ ] Professional instructor tools
- [ ] Club recommendation engine

---

**Made with ❤️ for golfers who want to improve their game through technology**
