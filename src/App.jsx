import { MotionConfig } from 'framer-motion';
import Home from './pages/Home.jsx';

export default function App() {
  return (
    <MotionConfig reducedMotion="never">
      <Home />
    </MotionConfig>
  );
}
