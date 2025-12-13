import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from 'next-sanity'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, course, motivation } = body

    // Sanity 클라이언트 생성 (핸들러 내부에서)
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    })

    // 1. Sanity에 저장
    const application = await client.create({
      _type: 'discipleshipApplication',
      name,
      phone,
      email,
      course,
      motivation,
      submittedAt: new Date().toISOString(),
      status: 'pending',
    })

    // 2. 이메일 발송
    const courseNames: Record<string, string> = {
      foundation: '성장반 (12주)',
      discipleship: '제자반 (24주)',
      leadership: '사역자반 (36주)',
    }

    // Resend 클라이언트 생성 (핸들러 내부에서)
    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.emails.send({
      from: 'BFGC 제자훈련 <onboarding@resend.dev>', // TODO: 실제 도메인으로 변경
      to: process.env.ADMIN_EMAIL || 'chon1029@gmail.com',
      subject: `[제자훈련 신청] ${name}님 - ${courseNames[course]}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7;">제자훈련 신청이 접수되었습니다</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">신청자 정보</h3>
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>이메일:</strong> ${email}</p>
            <p><strong>신청 과정:</strong> ${courseNames[course]}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">신청 동기</h3>
            <p style="white-space: pre-wrap;">${motivation}</p>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            신청일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Europe/Budapest' })}
          </p>
        </div>
      `,
    })

    return NextResponse.json({
      success: true,
      message: '신청이 완료되었습니다.',
      applicationId: application._id,
    })

  } catch (error) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      { success: false, message: '신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
