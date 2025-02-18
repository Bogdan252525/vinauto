import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get
	('query') || '';

	const products = await prisma.product.findMany({
		where: {
			name: {
				contains: query,
				mode: 'insensitive',
			}
		},
		include: {
			images: {
				where: {
					isPrimary: true
				},
				select: {
					url: true
				}
			}
		}
	});
	return NextResponse.json(products)
}