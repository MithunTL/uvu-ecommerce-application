import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const filePath = path.join(process.cwd(), 'src/data/visitors.json')

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { visitorId, confidence, address, city, country, ip } = body

    if (!visitorId) {
      return NextResponse.json({ error: 'Visitor ID is required' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const userAgent = req.headers.get('user-agent') || 'Unknown'

    // Get IP from request headers if client didn't supply it
    const clientIp = ip || req.headers.get('x-forwarded-for') || '127.0.0.1'

    const newLog = {
      visitorId,
      confidence,
      address: address || 'Unknown',
      city: city || 'Unknown',
      country: country || 'Unknown',
      ip: clientIp,
      timestamp,
      userAgent,
    }

    // Ensure the src/data directory exists
    await fs.mkdir(path.dirname(filePath), { recursive: true })

    let logs = []
    try {
      const fileData = await fs.readFile(filePath, 'utf-8')
      logs = JSON.parse(fileData)
    } catch (e) {
      // File doesn't exist yet, we will initialize with an empty array
    }

    // Add new log to the beginning (most recent first)
    logs.unshift(newLog)

    // Limit to latest 500 logs to prevent file growth issues
    if (logs.length > 500) {
      logs = logs.slice(0, 500)
    }

    await fs.writeFile(filePath, JSON.stringify(logs, null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Track API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const username = searchParams.get('username')
    const correctUsername = process.env.ADMIN_USERNAME || 'admin'
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== correctUsername || token !== correctPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let logs = []
    try {
      const fileData = await fs.readFile(filePath, 'utf-8')
      logs = JSON.parse(fileData)
    } catch (e) {
      // File doesn't exist yet
    }
    return NextResponse.json(logs)
  } catch (err) {
    console.error('GET Track API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token')
    const username = searchParams.get('username')
    const correctUsername = process.env.ADMIN_USERNAME || 'admin'
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin123'

    if (username !== correctUsername || token !== correctPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Clear logs by writing empty array
    await fs.writeFile(filePath, JSON.stringify([], null, 2), 'utf-8')

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE Track API error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
