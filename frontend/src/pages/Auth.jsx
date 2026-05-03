import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import ShowcasePanel from '../components/ShowcasePanel';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Login, Signup } from '../api/authapi';


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', password: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const formVariants = {
    initial: { opacity: 0, x: isLogin ? -20 : 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut', staggerChildren: 0.1 } },
    exit: { opacity: 0, x: isLogin ? 20 : -20, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
    if (success) setSuccess('');
  };

  const toggleAuthMode = (mode) => {
    setIsLogin(mode);
    setError('');
    setSuccess('');
    // Optionally reset form: setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (isLogin) {
        const res = await Login(formData)
        await login(res.data.user, res.data.accessToken);
        navigate('/dashboard');
      } else {
        const res = await Signup(formData);
        await login(res.data.user, res.data.accessToken);
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.customMessage || err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0710] p-4 relative overflow-hidden font-sans text-gray-200">
      {/* Background glowing effects inspired by the dashboard image */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-8 items-center md:items-center justify-center z-10">
        
        {/* Left Column - Form */}
        <motion.div 
          className="w-full max-w-md bg-[#130d20]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-8 relative flex-shrink-0"
          variants={pageVariants}
          initial="initial"
          animate="animate"
        >
          <div className="text-center mb-8">
            <motion.h1 
              key={isLogin ? 'login-title' : 'signup-title'}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2 tracking-tight"
            >
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </motion.h1>
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Enter your details to access your dashboard.' : 'Sign up to get started with your new account.'}
            </p>
          </div>

          {/* Toggle Switch */}
          <div className="flex p-1 bg-white/5 rounded-xl mb-8 relative">
            <motion.div 
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white/10 rounded-lg shadow-sm"
              animate={{ left: isLogin ? '4px' : 'calc(50% + 2px)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => toggleAuthMode(true)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors cursor-pointer ${isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Login
            </button>
            <button
              onClick={() => toggleAuthMode(false)}
              className={`flex-1 py-2 text-sm font-medium z-10 transition-colors cursor-pointer ${!isLogin ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Area */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? 'login' : 'signup'}
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
            >
              {!isLogin && (
                <motion.div variants={itemVariants}>
                  <Input 
                    label="Full Name" 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Minhas A." 
                    autoComplete="name"
                    required={!isLogin}
                  />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <Input 
                  label="Email Address" 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com" 
                  autoComplete="email"
                  required
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <Input 
                  label="Password" 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••" 
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                />
              </motion.div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-red-400 text-sm text-center bg-red-400/10 p-2.5 rounded-xl border border-red-400/20"
                >
                  {error}
                </motion.div>
              )}

              {success && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="text-green-400 text-sm text-center bg-green-400/10 p-2.5 rounded-xl border border-green-400/20"
                >
                  {success}
                </motion.div>
              )}

              {isLogin && (
                <motion.div variants={itemVariants} className="flex justify-end">
                  <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                    Forgot Password?
                  </a>
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="mt-2 flex flex-col gap-3">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight size={18} />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </AnimatePresence>
        </motion.div>

        {/* Right Column - Animated Panel & Guest Button */}
        <div className="w-full max-w-md flex flex-col gap-6 justify-between">
          <div className="hidden md:block w-full">
            <ShowcasePanel />
          </div>
          
          <div className="mt-auto">
            <Button type="button" variant="ghost" onClick={() => navigate('/public')}>
              Experience as guest
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
