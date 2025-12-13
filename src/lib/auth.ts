import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { client } from "@/lib/sanity"

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                // Sanity에서 사용자 조회 (스키마가 아직 없으므로 임시 로직)
                // 실제로는 Sanity에 'user' 스키마를 만들고 거기서 조회해야 함
                // 현재는 Mocking된 관리자 계정만 허용

                // TODO: Sanity User Schema 연동 시 교체
                const isValidUser = credentials.email === 'chon1029@gmail.com' && credentials.password === 'password'

                if (isValidUser) {
                    return {
                        id: '1',
                        name: 'Admin User',
                        email: 'chon1029@gmail.com',
                        role: 'admin'
                    }
                }

                return null
            }
        })
    ],
    pages: {
        signIn: '/login', // 커스텀 로그인 페이지 경로
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.role = token.role
            }
            return session
        }
    },
    session: {
        strategy: "jwt"
    },
    // @ts-ignore
    trustHost: true,
    debug: true,
    // Vercel 환경 변수 누락 시 비상용 키 사용 (500 에러 방지)
    secret: process.env.NEXTAUTH_SECRET || 'bfgc-home-secret-key-2025-very-secure',
}
