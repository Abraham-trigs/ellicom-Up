import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// PUT: Update a client
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const id = params.id

    const updatedClient = await prisma.client.update({
      where: { id },
      data: body,
    })

    return NextResponse.json(updatedClient)
  } catch (error) {
    console.error(`[PUT /api/clients/${params.id}]`, error)
    return new NextResponse('Failed to update client', { status: 500 })
  }
}

// DELETE: Delete a client
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await prisma.client.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(`[DELETE /api/clients/${params.id}]`, error)
    return new NextResponse('Failed to delete client', { status: 500 })
  }
}
