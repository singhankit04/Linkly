import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Link as LinkIcon, Copy, Check, BarChart2, Clock, User, Plus, MessageSquare } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import axiosInstance from '../utils/axiosInstance';

const GuestDashboard = () => {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // URL Creation State
  const [longUrl, setLongUrl] = useState('');
  const [alias, setAlias] = useState('');
  const [secretMessage, setSecretMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [newlyCreated, setNewlyCreated] = useState(null);
  const [error, setError] = useState('');
  
  const [copiedNew, setCopiedNew] = useState(false);
  const [copiedRowId, setCopiedRowId] = useState(null);

  // Fetch Public Links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axiosInstance.get('/url/get/withoutuser');
        if (res.data.success) {
          // Sort links by latest first
          const sortedLinks = res.data.allUrl.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLinks(sortedLinks);
        }
      } catch (err) {
        console.error("Failed to fetch public links:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleShorten = async (e) => {
    e.preventDefault();
    if (!longUrl) return;

    setIsGenerating(true);
    setNewlyCreated(null);
    setError('');

    try {
      const res = await axiosInstance.post('/url/create/withoutuser', {
        longUrl,
        slug: alias || undefined,
        secretMessage: secretMessage || null
      });

      if (res.data.success) {
        
        const newLink = {
          _id: Date.now().toString(), // temporary ID until refresh
          shortUrl: res.data.shortUrl, // The backend returns just the ID/slug
          longUrl: longUrl,
          clicks: 0,
          createdAt: new Date().toISOString(),
          user: null,
          secretMessage: secretMessage || null
        };
        
        const fullShortUrl = `${import.meta.env.VITE_API_BASE}/url/redirect/${res.data.shortUrl}`;
        setNewlyCreated(fullShortUrl);
        setLinks([newLink, ...links]);
        setLongUrl('');
        setAlias('');
        setSecretMessage('');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create link');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (text, isRowId = null) => {
    navigator.clipboard.writeText(text);
    if (isRowId) {
      setCopiedRowId(isRowId);
      setTimeout(() => setCopiedRowId(null), 2000);
    } else {
      setCopiedNew(true);
      setTimeout(() => setCopiedNew(false), 2000);
    }
  };

  // Helper to format Date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const filteredLinks = links.filter(link => 
    (link.longUrl && link.longUrl.toLowerCase().includes(searchQuery.toLowerCase())) || 
    (link.shortUrl && link.shortUrl.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0a0710] font-sans text-gray-200 relative overflow-hidden flex flex-col items-center pt-28 pb-12 px-4 sm:px-6">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl z-10 flex flex-col">
        
        {/* Header */}
        <div className="mb-10 text-center lg:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Public Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Create and browse public links securely.
          </motion.p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: URL Creation Form */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-[#130d20]/80 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Create New Link</h2>
              <form onSubmit={handleShorten} className="flex flex-col gap-4">
                <Input 
                  label="Long URL"
                  placeholder="https://your-very-long-url.com..." 
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                />
                
                <Input 
                  label="Custom name (Optional)"
                  placeholder="e.g., my-campaign" 
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <MessageSquare size={14} /> Secret Message (Optional)
                  </label>
                  <textarea
                    placeholder="Add a secret message for anyone who sees this link..."
                    value={secretMessage}
                    onChange={(e) => setSecretMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors resize-none"
                  />
                </div>
                
                {error && <p className="text-red-400 text-sm mt-1">{error}</p>}

                <Button type="submit" disabled={isGenerating || !longUrl} className="mt-2">
                  {isGenerating ? 'Shortening...' : 'Shorten Link'}
                  <Plus size={18} />
                </Button>
              </form>

              <AnimatePresence>
                {newlyCreated && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="bg-green-400/10 border border-green-400/20 rounded-xl p-4 flex items-center justify-between overflow-hidden"
                  >
                    <div className="flex flex-col text-left truncate pr-4">
                      <span className="text-xs text-green-400 font-medium mb-1">Successfully Generated!</span>
                      <span className="text-white font-semibold truncate">{newlyCreated}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(newlyCreated)}
                      className="flex-shrink-0 bg-white/10 hover:bg-white/20 transition p-2 rounded-lg text-white"
                    >
                      {copiedNew ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Public Links List */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h2 className="text-2xl font-bold text-white">Recent Public Links</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="Search links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#130d20] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-sm shadow-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {isLoading ? (
                <div className="flex justify-center p-12">
                  <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredLinks.length === 0 ? (
                <div className="bg-[#130d20]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-xl">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">No links found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search query or create a new link.</p>
                </div>
              ) : (
                <AnimatePresence>
                  {filteredLinks.map((link, index) => (
                    <motion.div 
                      key={link._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-[#130d20]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-xl hover:bg-white/[0.04] transition-colors group flex flex-col gap-4"
                    >
                      {/* Top Row: Short URL and Stats */}
                      <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400">
                            <LinkIcon size={20} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <a 
                                href={`${import.meta.env.VITE_API_BASE}/url/redirect/${link.shortUrl}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="font-bold text-white text-lg hover:text-purple-400 transition-colors cursor-pointer"
                              >
                              {link.shortUrl}
                              </a>
                              <button 
                                onClick={() => handleCopy(`${import.meta.env.VITE_API_BASE}/url/redirect/${link.shortUrl}`, link._id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-md text-gray-400 hover:text-white"
                                aria-label="Copy Link"
                              >
                                {copiedRowId === link._id ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-medium text-gray-400">
                          <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1.5 rounded-lg">
                            <BarChart2 size={14} className="text-purple-400" />
                            <span className="text-gray-200">{link.clicks} clicks</span>
                          </div>
                        </div>
                      </div>

                      {/* Secret Message Block (Conditional) */}
                      {link.secretMessage && (
                        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex items-start gap-3">
                          <MessageSquare size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-blue-100/80 italic leading-relaxed">
                            "{link.secretMessage}"
                          </p>
                        </div>
                      )}

                      {/* Bottom Meta Row */}
                      <div className="flex items-center gap-4 text-xs text-gray-500 mt-1 border-t border-white/5 pt-3">
                        <div className="flex items-center gap-1.5">
                          <Clock size={12} />
                          <span>{formatDate(link.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User size={12} />
                          <span>Guest</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
