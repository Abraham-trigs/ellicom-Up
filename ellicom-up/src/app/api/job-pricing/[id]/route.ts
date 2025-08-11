// app/api/job-pricing/[id]/route.ts
import { NextResponse } from 'next/server'
import {
  getJobPricingById,
  updateJobPricing,
  deleteJobPricing,
} from '@/lib/prisma/jobPricing'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const item = await getJobPricingById(params.id)
    if (!item) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(item)
  } catch (error) {
    console.error('GET /api/job-pricing/:id error:', error)
    return NextResponse.json({ error: 'Failed to fetch item' }, { status: 500 })
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const data = await req.json()
    const updated = await updateJobPricing(params.id, data)
    return NextResponse.json(updated)
  } catch (error) {
    console.error('PATCH /api/job-pricing/:id error:', error)
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const deleted = await deleteJobPricing(params.id)
    return NextResponse.json(deleted)
  } catch (error) {
    console.error('DELETE /api/job-pricing/:id error:', error)
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 })
  }
}
