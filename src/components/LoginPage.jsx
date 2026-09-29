import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Wrench, 
  LogIn, 
  Eye, 
  EyeOff, 
  Shield, 
  Users,
  FlaskConical,
  Search
} from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [selectedPortal, setSelectedPortal] = useState(null); // 'maintenance' or 'faculty'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const CREDENTIALS = {
    maintenance: { username: 'admin', password: 'admin123', label: 'Maintenance Department' },
    faculty: { username: 'faculty', password: 'faculty123', label: 'Faculty / Lab Assistant' }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const cred = CREDENTIALS[selectedPortal];
      if (username.trim().toLowerCase() === cred.username && password === cred.password) {
        onLogin(selectedPortal);
      } else {
        setError('Invalid username or password. Check credentials below.');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleGuestTracker = () => {
    onLogin('tracker');
  };

  // Portal Selection Screen
  if (!selectedPortal) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="bg-slate-900 text-white py-4 px-6 shadow-lg">
          <div className="max-w-5xl mx-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">CampusFix</h1>
              <p className="text-xs text-slate-400">University Classroom & Lab Maintenance System</p>
            </div>
          </div>
        </header>

        {/* Portal Selection */}
        <main className="flex-1 flex items-center justify-center p-6">
          <div className="max-w-2xl w-full">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Welcome to CampusFix
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Select your portal to continue
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Maintenance Portal */}
              <button
                onClick={() => setSelectedPortal('maintenance')}
                className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Maintenance Department</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Manage tickets, assign technicians, add/edit workers, and resolve maintenance issues.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-amber-700">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Admin Access Required</span>
                </div>
              </button>

              {/* Faculty Portal */}
              <button
                onClick={() => setSelectedPortal('faculty')}
                className="group bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-500 hover:shadow-lg transition-all text-left"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-4 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Faculty / Lab Assistant</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Raise maintenance tokens for classroom display issues or lab workstation problems.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-indigo-700">
                  <Users className="w-3.5 h-3.5" />
                  <span>Faculty Login Required</span>
                </div>
              </button>
            </div>

            {/* Guest Token Tracker */}
            <div className="text-center">
              <button
                onClick={handleGuestTracker}
                className="inline-flex items-center gap-2 text-sm text-purple-700 hover:text-purple-900 font-semibold bg-purple-50 hover:bg-purple-100 px-5 py-2.5 rounded-xl transition"
              >
                <Search className="w-4 h-4" />
                <span>Track Token Status (No Login Required)</span>
              </button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-500 text-xs py-4 px-6 text-center">
          CampusFix — University Engineering & Computing Campus Maintenance Portal
        </footer>
      </div>
    );
  }

  // Login Form Screen
  const isMaintenance = selectedPortal === 'maintenance';
  const cred = CREDENTIALS[selectedPortal];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 text-white py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center shadow-md">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight">CampusFix</h1>
              <p className="text-xs text-slate-400">University Classroom & Lab Maintenance System</p>
            </div>
          </div>
          <button
            onClick={() => { setSelectedPortal(null); setError(''); setUsername(''); setPassword(''); }}
            className="text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition"
          >
            ← Back to Portals
          </button>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-sm w-full">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Portal Banner */}
            <div className={`p-6 text-white text-center ${
              isMaintenance 
                ? 'bg-gradient-to-r from-amber-600 to-orange-700' 
                : 'bg-gradient-to-r from-indigo-600 to-violet-700'
            }`}>
              <div className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center ${
                isMaintenance ? 'bg-white/20' : 'bg-white/20'
              }`}>
                {isMaintenance ? (
                  <Wrench className="w-7 h-7 text-white" />
                ) : (
                  <GraduationCap className="w-7 h-7 text-white" />
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight">
                {isMaintenance ? 'Maintenance Department' : 'Faculty / Lab Assistant'}
              </h2>
              <p className="text-xs text-white/80 mt-1">
                {isMaintenance ? 'Admin Portal Login' : 'Staff Portal Login'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={`Enter ${isMaintenance ? 'admin' : 'faculty'} username`}
                  required
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full px-4 py-2.5 pr-10 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 text-white font-bold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition ${
                  isMaintenance 
                    ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/30' 
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Sign In</span>
                  </>
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="px-6 pb-5">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs">
                <span className="font-bold text-slate-700 block mb-1">Demo Credentials:</span>
                <div className="text-slate-600 space-y-0.5">
                  <div>Username: <span className="font-mono font-bold text-indigo-700">{cred.username}</span></div>
                  <div>Password: <span className="font-mono font-bold text-indigo-700">{cred.password}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-500 text-xs py-4 px-6 text-center">
        CampusFix — University Engineering & Computing Campus Maintenance Portal
      </footer>
    </div>
  );
}
