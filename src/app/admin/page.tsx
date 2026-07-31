'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface VisitorLog {
  visitorId: string
  confidence: number
  address: string
  city: string
  country: string
  ip: string
  timestamp: string
  userAgent: string
}

export default function AdminPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [visitors, setVisitors] = useState<VisitorLog[]>([])
  const [showConfirmClear, setShowConfirmClear] = useState(false)

  useEffect(() => {
    const savedUser = sessionStorage.getItem('admin_user')
    const savedToken = sessionStorage.getItem('admin_token')
    if (savedUser && savedToken) {
      fetchLogs(savedUser, savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchLogs = async (user: string, token: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(
        `/api/track?username=${encodeURIComponent(user)}&token=${encodeURIComponent(token)}`
      )
      if (res.ok) {
        const data = await res.json()
        setVisitors(data)
        setIsAuthenticated(true)
        sessionStorage.setItem('admin_user', user)
        sessionStorage.setItem('admin_token', token)
        window.dispatchEvent(new Event('admin-session-change'))
      } else if (res.status === 401) {
        setError('Invalid username or password. Access denied.')
        sessionStorage.removeItem('admin_user')
        sessionStorage.removeItem('admin_token')
        window.dispatchEvent(new Event('admin-session-change'))
      } else {
        setError('Failed to fetch logs.')
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) {
      setError('Username and password are required')
      return
    }
    fetchLogs(username, password)
  }

  const handleClearLogs = async () => {
    const user = sessionStorage.getItem('admin_user')
    const token = sessionStorage.getItem('admin_token')
    if (!user || !token) return

    try {
      const res = await fetch(
        `/api/track?username=${encodeURIComponent(user)}&token=${encodeURIComponent(token)}`,
        { method: 'DELETE' }
      )
      if (res.ok) {
        setVisitors([])
        setShowConfirmClear(false)
      } else {
        alert('Failed to clear logs')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while clearing logs')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_user')
    sessionStorage.removeItem('admin_token')
    setIsAuthenticated(false)
    setVisitors([])
    setUsername('')
    setPassword('')
    setShowConfirmClear(false)
    window.dispatchEvent(new Event('admin-session-change'))
  }

  // Calculate stats
  const totalVisits = visitors.length
  const uniqueVisitors = new Set(visitors.map((v) => v.visitorId)).size
  
  // Count by country
  const countries = visitors.reduce((acc: Record<string, number>, v) => {
    if (v.country && v.country !== 'Unknown') {
      acc[v.country] = (acc[v.country] || 0) + 1
    }
    return acc
  }, {})
  
  const topCountry = Object.entries(countries).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

  // Helper to format date
  const formatDate = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  }

  // Helper to simplify user agent
  const getDeviceLabel = (ua: string) => {
    if (ua.includes('iPhone')) return 'iPhone'
    if (ua.includes('iPad')) return 'iPad'
    if (ua.includes('Android')) return 'Android'
    if (ua.includes('Macintosh')) return 'Mac (macOS)'
    if (ua.includes('Windows')) return 'Windows'
    if (ua.includes('Linux')) return 'Linux'
    return 'Unknown Device'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400 font-mono text-sm">
        <span className="relative flex h-3 w-3 mb-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-zinc-500"></span>
        </span>
        Loading secure dashboard...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="w-full max-w-md bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-white">Admin Panel Access</h2>
            <p className="text-xs text-zinc-500">Please enter your administrator username and password to view logs.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all placeholder:text-zinc-600"
              />
            </div>

            {error && (
              <div className="text-xs font-medium text-red-500 flex items-center gap-1.5 bg-red-950/20 border border-red-900/30 px-3.5 py-2.5 rounded-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-zinc-950 font-semibold text-sm py-3 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-xs text-zinc-500 hover:text-zinc-400 underline transition-colors">
              Return to Store
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50 transition-colors duration-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-400">
              Visitor Dashboard
            </h1>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Monitor unique visitors, exact GPS/IP addresses, and browsing statistics in real-time.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
            >
              Back to Store
            </Link>
            <button
              onClick={() => {
                const user = sessionStorage.getItem('admin_user')
                const token = sessionStorage.getItem('admin_token')
                if (user && token) fetchLogs(user, token)
              }}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-zinc-900 dark:bg-white dark:text-zinc-900 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm font-semibold cursor-pointer"
            >
              Refresh Logs
            </button>
            {showConfirmClear ? (
              <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg p-1.5 px-3">
                <span className="text-xs text-red-600 dark:text-red-400 font-semibold">Clear all logs?</span>
                <button
                  onClick={handleClearLogs}
                  className="px-2.5 py-1 text-xs font-bold text-white bg-red-600 hover:bg-red-750 rounded-lg transition-colors cursor-pointer"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className="px-2.5 py-1 text-xs font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConfirmClear(true)}
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300 bg-red-500/10 hover:bg-red-500/25 border border-red-500/20 rounded-lg transition-colors shadow-sm cursor-pointer font-semibold"
              >
                Clear Logs
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 rounded-lg transition-colors shadow-sm cursor-pointer font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          
          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-sm rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col justify-between">
            <dt className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Total Page Loads</dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{totalVisits}</dd>
            <div className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              Total logs written to local database
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-sm rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col justify-between">
            <dt className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Unique Devices (Fingerprints)</dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{uniqueVisitors}</dd>
            <div className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Distinct FingerprintJS Profiles
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 backdrop-blur-md overflow-hidden shadow-sm rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 p-6 flex flex-col justify-between">
            <dt className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Top Visitor Country</dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">{topCountry}</dd>
            <div className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
              Calculated via resolved addresses
            </div>
          </div>

        </div>

        {/* Visitor Logs Table */}
        <div className="bg-white dark:bg-zinc-900/30 backdrop-blur-md shadow-sm rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 overflow-hidden">
          <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg font-bold leading-6 text-zinc-900 dark:text-white">Recent Visits Log</h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Details of the latest 500 visitors.
            </p>
          </div>
          
          {totalVisits === 0 ? (
            <div className="p-12 text-center text-zinc-500 dark:text-zinc-400">
              <p className="text-base font-semibold">No visitor logs found.</p>
              <p className="text-sm mt-1">Open the main homepage at <Link href="/" className="underline text-zinc-800 dark:text-zinc-200">http://localhost:3001</Link> to log the first visit!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
                <thead className="bg-zinc-50 dark:bg-zinc-900/50">
                  <tr>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Time</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Location & Address</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">IP Address</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Device</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Visitor ID</th>
                    <th scope="col" className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-transparent">
                  {visitors.map((visitor, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/55 dark:hover:bg-zinc-900/20 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                        {formatDate(visitor.timestamp)}
                      </td>
                      <td className="px-6 py-4 text-xs text-zinc-900 dark:text-zinc-100 max-w-xs">
                        <div className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {visitor.city || 'Unknown'}, {visitor.country || 'Unknown'}
                        </div>
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5 leading-snug line-clamp-2" title={visitor.address}>
                          {visitor.address}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-zinc-600 dark:text-zinc-300">
                        {visitor.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600 dark:text-zinc-300">
                        <div className="font-medium">{getDeviceLabel(visitor.userAgent)}</div>
                        <div className="text-[9px] text-zinc-400 dark:text-zinc-500 max-w-[120px] truncate" title={visitor.userAgent}>
                          {visitor.userAgent}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-zinc-600 dark:text-zinc-400">
                        <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-[10px]" title={visitor.visitorId}>
                          {visitor.visitorId.slice(0, 8)}...{visitor.visitorId.slice(-4)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                          visitor.confidence >= 0.6 
                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400' 
                            : 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'
                        }`}>
                          {(visitor.confidence * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
      </div>
    </div>
  )
}
