import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, Copy, Check, BarChart2, Users, MousePointerClick, TrendingUp } from 'lucide-react';

const ShowcasePanel = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4500); // 4.5 seconds per step
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[500px] flex flex-col bg-[#130d20]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 relative overflow-hidden items-center justify-center">
      
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-600/10 blur-[80px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        
        {/* Step 0: Create Link */}
        {step === 0 && (
          <motion.div
            key="step-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">1. Shorten your links</h3>
              <p className="text-sm text-gray-400">Paste any long URL to make it clean</p>
            </div>
            
            <div className="w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <Link size={18} className="text-gray-400" />
              <motion.div
                className="h-5 bg-white/20 rounded w-0 overflow-hidden"
                animate={{ width: "80%" }}
                transition={{ duration: 1.5, ease: "linear", delay: 0.5 }}
              />
            </div>

            <motion.button
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.2, type: "spring" }}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-[0_0_15px_rgba(147,51,234,0.3)] relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.5, delay: 2.5 }}
              />
              Shorten
            </motion.button>
          </motion.div>
        )}

        {/* Step 1: Copy / Share */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">2. Ready to share</h3>
              <p className="text-sm text-gray-400">Your short link is generated</p>
            </div>

            <motion.div 
              className="w-full max-w-sm bg-purple-900/20 border border-purple-500/30 rounded-xl p-4 flex items-center justify-between"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
            >
              <span className="text-purple-300 font-medium">link.ly/abc123</span>
              
              <motion.div
                className="relative"
                initial="unclicked"
                animate="clicked"
                variants={{
                  unclicked: { scale: 1 },
                  clicked: { scale: [1, 0.8, 1], transition: { delay: 1.5, duration: 0.3 } }
                }}
              >
                <div className="p-2 bg-white/10 rounded-md">
                  <motion.div
                    variants={{
                      unclicked: { opacity: 1 },
                      clicked: { opacity: 0, transition: { delay: 1.6 } }
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Copy size={16} className="text-gray-300" />
                  </motion.div>
                  <motion.div
                    variants={{
                      unclicked: { opacity: 0 },
                      clicked: { opacity: 1, transition: { delay: 1.6 } }
                    }}
                    className="flex items-center justify-center text-green-400"
                  >
                    <Check size={16} />
                  </motion.div>
                </div>
                
                {/* Simulated mouse cursor */}
                <motion.div
                  className="absolute top-10 left-10 pointer-events-none"
                  initial={{ x: 100, y: 100, opacity: 0 }}
                  animate={{ x: -5, y: -5, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                >
                  <MousePointerClick size={24} className="text-white drop-shadow-md" />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* Step 2: Click Tracking */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col items-center gap-6"
          >
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white mb-2">3. Track Clicks</h3>
              <p className="text-sm text-gray-400">Watch your audience grow</p>
            </div>

            <div className="relative flex flex-col items-center justify-center w-40 h-40 rounded-full border-[8px] border-purple-500/20">
              <motion.svg className="absolute inset-0 w-full h-full -rotate-90">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="46%"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-purple-500"
                  initial={{ strokeDasharray: "0 1000" }}
                  animate={{ strokeDasharray: "280 1000" }}
                  transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                />
              </motion.svg>
              <motion.span 
                className="text-4xl font-bold text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Counter from={0} to={120} duration={2.5} delay={0.5} />
              </motion.span>
              <span className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Clicks</span>
            </div>
          </motion.div>
        )}

        {/* Step 3: Dashboard Preview */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col gap-4"
          >
             <div className="text-center mb-2">
              <h3 className="text-xl font-bold text-white mb-1">4. Analyze</h3>
              <p className="text-sm text-gray-400">Get detailed insights</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-2">
                <BarChart2 size={16} className="text-purple-400" />
                <div>
                  <div className="text-xs text-gray-400">Total Clicks</div>
                  <div className="text-lg font-bold text-white">12.4k</div>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 flex flex-col gap-2">
                <Users size={16} className="text-blue-400" />
                <div>
                  <div className="text-xs text-gray-400">Unique Users</div>
                  <div className="text-lg font-bold text-white">8.2k</div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/10 h-28 flex items-end justify-between gap-2 overflow-hidden">
              {[40, 60, 30, 80, 50, 90, 70].map((height, i) => (
                <motion.div
                  key={i}
                  className="w-full bg-gradient-to-t from-purple-600 to-indigo-400 rounded-t-sm"
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.1, type: "spring" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Step Indicators */}
      <div className="absolute bottom-6 flex gap-2">
        {[0, 1, 2, 3].map((i) => (
          <div 
            key={i} 
            className={`w-2 h-2 rounded-full transition-all duration-500 ${step === i ? 'bg-purple-500 w-6' : 'bg-white/20'}`} 
          />
        ))}
      </div>
    </div>
  );
};

// Helper component for animating numbers
const Counter = ({ from, to, duration, delay }) => {
  const [count, setCount] = useState(from);

  useEffect(() => {
    let startTimestamp = null;
    let timeout;
    
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * (to - from) + from));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    timeout = setTimeout(() => {
      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [from, to, duration, delay]);

  return <>{count}</>;
};

export default ShowcasePanel;
