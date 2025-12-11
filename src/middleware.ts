import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        // 관리자 권한 확인 로직이 필요하다면 여기에 추가
        // 현재는 로그인 여부만 확인 (withAuth 기본 동작)
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token, // 토큰이 있으면(로그인 상태면) 통과
        },
    }
)

export const config = {
    matcher: ["/admin/:path*"], // /admin 하위 모든 경로 보호
}
