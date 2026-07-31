'use client'

import React from 'react'
import { useFingerprint } from '@/hooks/useFingerprint'

interface VisitorTrackerProps {
  children?: React.ReactNode
}

export function VisitorTracker({ children }: VisitorTrackerProps) {
  const { visitorId, confidence, loading, error } = useFingerprint()

  return (
    <>
      {children}
      <div className="fixed bottom-4 right-4 z-50 p-4 rounded-xl border border-zinc-200/50 bg-white/70 backdrop-blur-md shadow-lg dark:border-zinc-800/50 dark:bg-zinc-950/70 transition-all duration-300 hover:shadow-xl max-w-xs md:max-w-sm">
        {loading ? (
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>Identifying visitor...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 dark:text-red-400 text-xs flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span>Tracking error: {error}</span>
          </div>
        ) : (
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase">
                Visitor Tracked
              </span>
            </div>
            <div className="font-mono text-[10px] space-y-0.5 text-zinc-600 dark:text-zinc-300 leading-tight">
              <div className="truncate">
                <span className="font-semibold text-zinc-400 dark:text-zinc-500">ID:</span> {visitorId}
              </div>
              <div>
                <span className="font-semibold text-zinc-400 dark:text-zinc-500">Confidence:</span> {(confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}