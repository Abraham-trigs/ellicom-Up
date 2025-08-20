// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';

// // PUT: Update a specific client
// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     const body = await req.json();

//     const updatedClient = await prisma.user.update({
//       where: { id },
//       data: {
//         name: body.name,
//         email: body.email,
//         phone: body.phone,
//         // Add additional fields if needed
//       },
//     });

//     return NextResponse.json(updatedClient);
//   } catch (error) {
//     console.error('[PUT /api/clients/[id]]', error);
//     return new NextResponse('Failed to update client', { status: 500 });
//   }
// }

// // DELETE: Remove a specific client
// export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
//   const { id } = params;

//   try {
//     await prisma.user.delete({
//       where: { id },
//     });

//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error('[DELETE /api/clients/[id]]', error);
//     return new NextResponse('Failed to delete client', { status: 500 });
//   }
// }
