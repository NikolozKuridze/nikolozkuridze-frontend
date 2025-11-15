import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  BookOpen,
  FolderGit2,
  LogOut,
  Menu,
  X,
  Home,
  User,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAdminStore((state) => state.logout);
  const admin = useAdminStore((state) => state.admin);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      label: t('admin.dashboard'),
      icon: LayoutDashboard,
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      path: '/admin/blogs',
      label: t('admin.blogs'),
      icon: BookOpen,
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      path: '/admin/projects',
      label: t('admin.projects'),
      icon: FolderGit2,
      gradient: 'from-purple-500 to-violet-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl text-white border border-slate-700/50 shadow-lg"
      >
        <AnimatePresence mode="wait">
          {sidebarOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : '-100%'
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:translate-x-0 fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-slate-900/95 via-slate-900/98 to-slate-950/95 backdrop-blur-xl border-r border-slate-800/50 z-40 shadow-2xl"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-500/5 via-transparent to-purple-500/5 pointer-events-none" />

        {/* Header */}
        <div className="relative p-6 border-b border-slate-800/50">
          <Link to="/" className="block group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-0.5 group-hover:text-sky-400 transition-colors">
                  Nikoloz Kuridze
                </h2>
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {t('admin.title')}
                </p>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="relative block group"
                >
                  <motion.div
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-300 overflow-hidden ${
                      isActive
                        ? 'bg-gradient-to-r ' + item.gradient + ' text-white shadow-lg shadow-' + item.gradient.split(' ')[1].replace('to-', '') + '/20'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                    }`}
                  >
                    {/* Animated background for active state */}
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-600/20 blur-xl"
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                      />
                    )}

                    <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'animate-pulse' : ''}`} />
                    <span className="relative z-10 font-medium">{item.label}</span>

                    {/* Hover glow effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-700/0 via-slate-700/5 to-slate-700/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="px-4 py-4 space-y-2">
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-300 hover:text-white transition-all duration-300 group"
            >
              <Home className="w-5 h-5 group-hover:text-sky-400 transition-colors" />
              <span className="font-medium">{t('admin.layout.viewWebsite')}</span>
            </motion.button>
          </Link>
        </div>

        {/* User Profile & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-sm">
          <div className="mb-4 px-3 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 mb-0.5 uppercase tracking-wide font-semibold">{t('admin.title')}</p>
                <p className="text-white font-medium text-sm truncate">{admin?.email || 'admin@example.com'}</p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-semibold">{t('admin.logout')}</span>
          </motion.button>
        </div>
      </motion.aside>

      {/* Main content */}
      <main className="lg:ml-72 p-4 md:p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <Outlet />
        </motion.div>
      </main>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}