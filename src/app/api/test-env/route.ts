import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    return NextResponse.json({
        VERSION: '2.0 (Config Injection Test)',
        IS_VERCEL: !!process.env.VERCEL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'MISSING',
        NEXTAUTH_SECRET_EXISTS: !!process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID_EXISTS: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET_EXISTS: !!process.env.GOOGLE_CLIENT_SECRET,
        SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'MISSING',
        SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'MISSING',
        NODE_ENV: process.env.NODE_ENV,
    })
}
