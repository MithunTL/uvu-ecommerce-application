'use client'

import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface FingerprintResult {
  visitorId: string | null
  confidence: number
  loading: boolean
  error: string | null
}

export function useFingerprint(): FingerprintResult {
  const [result, setResult] = useState<FingerprintResult>({
    visitorId: null,
    confidence: 0,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load()
        const data = await fp.get()
        
        setResult({
          visitorId: data.visitorId,
          confidence: data.confidence.score,
          loading: false,
          error: null,
        })

        // Send to your backend
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            visitorId: data.visitorId,
            confidence: data.confidence.score 
          }),
        }).catch(err => console.error('Tracking error:', err))
      } catch (err) {
        setResult({
          visitorId: null,
          confidence: 0,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to get fingerprint',
        })
      }
    }

    getFingerprint()
  }, [])

  return result
}