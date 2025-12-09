import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, email, phone, subject, message } = body

        // 이메일 발송
        await resend.emails.send({
            from: 'BFGC 문의 <onboarding@resend.dev>', // TODO: 실제 도메인으로 변경
            to: process.env.ADMIN_EMAIL || 'chon1029@gmail.com',
            replyTo: email,
            subject: `[BFGC 문의] ${subject}`,
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0284c7;">새로운 문의가 접수되었습니다</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">문의자 정보</h3>
            <p><strong>이름:</strong> ${name}</p>
            <p><strong>이메일:</strong> ${email}</p>
            ${phone ? `<p><strong>연락처:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">제목</h3>
            <p>${subject}</p>
          </div>

          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">문의 내용</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #64748b; font-size: 14px;">
            문의일시: ${new Date().toLocaleString('ko-KR', { timeZone: 'Europe/Budapest' })}
          </p>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
          
          <p style="color: #64748b; font-size: 12px;">
            이 메일에 직접 답장하시면 문의자(${email})에게 전달됩니다.
          </p>
        </div>
      `,
        })

        return NextResponse.json({
            success: true,
            message: '문의가 전송되었습니다.',
        })

    } catch (error) {
        console.error('Contact form submission error:', error)
        return NextResponse.json(
            { success: false, message: '문의 전송 중 오류가 발생했습니다.' },
            { status: 500 }
        )
    }
}
