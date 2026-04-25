import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn, LogOut, LayoutDashboard, Globe } from 'lucide-react';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // We don't want to show the navbar on the Auth page (/)
  if (location.pathname === '/') return null;

  return (
    <nav className="w-full bg-[#130d20]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
        
        {/* Left: Brand */}
        <div className="flex items-center w-1/4">
          <Link to="/public" className="flex items-center gap-2 transition-transform hover:scale-105">
            <img src="/favicon.svg" alt="Linkly Logo" className="w-8 h-8 drop-shadow-[0_0_10px_rgba(147,51,234,0.3)]" />
            <span className="text-xl font-bold text-white tracking-tight">Linkly</span>
          </Link>
        </div>
        
        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center justify-center gap-2 w-2/4">
          <Link 
            to="/public" 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${location.pathname === '/public' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <Globe size={16} />
            <span className="font-medium text-sm">Public Dashboard</span>
          </Link>
          <Link 
            to="/dashboard" 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${location.pathname === '/dashboard' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard size={16} />
            <span className="font-medium text-sm">Private Dashboard</span>
          </Link>
        </div>

        {/* Right: User/Guest & Actions */}
        <div className="flex items-center justify-end gap-4 w-1/4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${user ? 'bg-purple-500/20 text-purple-400' : 'bg-gray-500/20 text-gray-400'}`}>
              <User size={14} />
            </div>
            <span className={`text-sm font-medium truncate max-w-[120px] ${user ? 'text-gray-200' : 'text-gray-400'}`}>
              {user ? user.name : 'Guest'}
            </span>
          </div>
          
          {user ? (
            <Button variant="secondary" className="!py-2 !px-4 text-sm !w-auto" onClick={logout}>
              <LogOut size={16} />
              <span className="hidden lg:inline">Logout</span>
            </Button>
          ) : (
            <Link to="/">
              <Button variant="primary" className="!py-2 !px-4 text-sm !w-auto">
                <LogIn size={16} />
                <span className="hidden lg:inline">Login / Signup</span>
                <span className="lg:hidden">Login</span>
              </Button>
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
