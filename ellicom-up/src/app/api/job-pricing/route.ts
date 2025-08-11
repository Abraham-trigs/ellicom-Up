
import { NextResponse } from 'next/server'
import {
  getAllJobPricings,
  createJobPricing,
} from '@/lib/prisma/jobPricing'

export async function GET() {
  try {
    const pricing = await getAllJobPricings()
    return NextResponse.json(pricing)
  } catch (error) {
    console.error('GET /api/job-pricing error:', error)
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const newEntry = await createJobPricing(data)
    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error('POST /api/job-pricing error:', error)
    return NextResponse.json({ error: 'Failed to create pricing' }, { status: 500 })
  }
}
