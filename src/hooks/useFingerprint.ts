'use client'

import { useEffect, useState } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

interface FingerprintResult {
  visitorId: string | null
  confidence: number
  loading: boolean
  error: string | null
  address?: string | null
  city?: string | null
  country?: string | null
  ip?: string | null
}

const getBrowserLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation not supported'))
      return
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
      { timeout: 5000, enableHighAccuracy: true }
    )
  })
}

export function useFingerprint(): FingerprintResult {
  const [result, setResult] = useState<FingerprintResult>({
    visitorId: null,
    confidence: 0,
    loading: true,
    error: null,
    address: null,
    city: null,
    country: null,
    ip: null,
  })

  useEffect(() => {
    const getFingerprint = async () => {
      try {
        const fp = await FingerprintJS.load()
        const data = await fp.get()
        
        let address = null
        let city = null
        let country = null
        let ip = null

        // Try browser GPS geolocation first
        try {
          const coords = await getBrowserLocation()
          const geoRes = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lon}&format=json`,
            {
              headers: {
                'Accept-Language': 'en',
              },
            }
          )
          if (geoRes.ok) {
            const geoData = await geoRes.json()
            address = geoData.display_name
            city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.suburb
            country = geoData.address.country
          }
        } catch (gpsError) {
          console.warn('GPS Geolocation failed or denied, falling back to IP:', gpsError)
        }

        // Fallback to IP Geolocation if GPS denied/failed or address is empty
        if (!address) {
          try {
            const ipRes = await fetch('https://ipapi.co/json/')
            if (ipRes.ok) {
              const ipData = await ipRes.json()
              ip = ipData.ip
              city = ipData.city
              country = ipData.country_name
              address = `${ipData.city}, ${ipData.region}, ${ipData.country_name} (Estimated via IP)`
            }
          } catch (ipErr) {
            console.error('IP Geolocation fallback failed:', ipErr)
          }
        } else {
          // If GPS succeeded, still try to fetch the IP address in background for logs
          try {
            const ipRes = await fetch('https://ipapi.co/json/')
            if (ipRes.ok) {
              const ipData = await ipRes.json()
              ip = ipData.ip
            }
          } catch (ipErr) {
            // Ignore background IP fetch failures
          }
        }

        setResult({
          visitorId: data.visitorId,
          confidence: data.confidence.score,
          loading: false,
          error: null,
          address,
          city,
          country,
          ip,
        })

        // Send to your backend
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            visitorId: data.visitorId,
            confidence: data.confidence.score,
            address,
            city,
            country,
            ip,
          }),
        }).catch(err => console.error('Tracking error:', err))
      } catch (err) {
        setResult({
          visitorId: null,
          confidence: 0,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to get fingerprint',
          address: null,
          city: null,
          country: null,
          ip: null,
        })
      }
    }

    getFingerprint()
  }, [])

  return result
}