// src/sanity/schemaTypes/emailSettings.ts
// 이메일 알림 설정 스키마 - 알림 수신자 및 방식 관리

import { defineType, defineField } from 'sanity'
import { Mail } from 'lucide-react'

export default defineType({
    name: 'emailSettings',
    title: '이메일 & 알림 설정',
    type: 'document',
    icon: Mail,
    // 싱글톤 패턴 - 하나의 문서만 존재
    __experimental_singleton: true,
    fields: [
        // 새가족 등록 알림
        defineField({
            name: 'newcomerNotification',
            title: '새가족 등록 알림',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'enabled',
                    title: '알림 활성화',
                    type: 'boolean',
                    description: '새가족 등록 시 이메일 알림 받기',
                    initialValue: true,
                },
                {
                    name: 'recipients',
                    title: '수신자 이메일',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: '알림을 받을 이메일 주소 (여러 개 가능)',
                    validation: (Rule) =>
                        Rule.custom((emails: string[] | undefined) => {
                            if (!emails || emails.length === 0) return true
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const invalidEmails = emails.filter((email) => !emailRegex.test(email))
                            if (invalidEmails.length > 0) {
                                return `올바르지 않은 이메일: ${invalidEmails.join(', ')}`
                            }
                            return true
                        }),
                },
                {
                    name: 'subject',
                    title: '이메일 제목',
                    type: 'string',
                    description: '알림 이메일 제목',
                    initialValue: '[BFGC] 새가족 등록 알림',
                },
            ],
        }),

        // 문의하기 알림
        defineField({
            name: 'contactNotification',
            title: '문의하기 알림',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'enabled',
                    title: '알림 활성화',
                    type: 'boolean',
                    description: '문의 접수 시 이메일 알림 받기',
                    initialValue: true,
                },
                {
                    name: 'recipients',
                    title: '수신자 이메일',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: '알림을 받을 이메일 주소 (여러 개 가능)',
                    validation: (Rule) =>
                        Rule.custom((emails: string[] | undefined) => {
                            if (!emails || emails.length === 0) return true
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const invalidEmails = emails.filter((email) => !emailRegex.test(email))
                            if (invalidEmails.length > 0) {
                                return `올바르지 않은 이메일: ${invalidEmails.join(', ')}`
                            }
                            return true
                        }),
                },
                {
                    name: 'subject',
                    title: '이메일 제목',
                    type: 'string',
                    description: '알림 이메일 제목',
                    initialValue: '[BFGC] 새로운 문의가 접수되었습니다',
                },
            ],
        }),

        // 제자훈련 신청 알림
        defineField({
            name: 'discipleshipNotification',
            title: '제자훈련 신청 알림',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'enabled',
                    title: '알림 활성화',
                    type: 'boolean',
                    description: '제자훈련 신청 시 이메일 알림 받기',
                    initialValue: true,
                },
                {
                    name: 'recipients',
                    title: '수신자 이메일',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: '알림을 받을 이메일 주소 (여러 개 가능)',
                    validation: (Rule) =>
                        Rule.custom((emails: string[] | undefined) => {
                            if (!emails || emails.length === 0) return true
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const invalidEmails = emails.filter((email) => !emailRegex.test(email))
                            if (invalidEmails.length > 0) {
                                return `올바르지 않은 이메일: ${invalidEmails.join(', ')}`
                            }
                            return true
                        }),
                },
                {
                    name: 'subject',
                    title: '이메일 제목',
                    type: 'string',
                    description: '알림 이메일 제목',
                    initialValue: '[BFGC] 제자훈련 신청 알림',
                },
            ],
        }),

        // 설교 업로드 알림
        defineField({
            name: 'sermonNotification',
            title: '설교 업로드 알림',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'enabled',
                    title: '알림 활성화',
                    type: 'boolean',
                    description: '새 설교 업로드 시 구독자에게 이메일 발송',
                    initialValue: false,
                },
                {
                    name: 'recipients',
                    title: '수신자 이메일',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: '설교 알림을 받을 구독자 이메일 (여러 개 가능)',
                    validation: (Rule) =>
                        Rule.custom((emails: string[] | undefined) => {
                            if (!emails || emails.length === 0) return true
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const invalidEmails = emails.filter((email) => !emailRegex.test(email))
                            if (invalidEmails.length > 0) {
                                return `올바르지 않은 이메일: ${invalidEmails.join(', ')}`
                            }
                            return true
                        }),
                },
                {
                    name: 'subject',
                    title: '이메일 제목',
                    type: 'string',
                    description: '알림 이메일 제목',
                    initialValue: '[BFGC] 새로운 설교가 업로드되었습니다',
                },
            ],
        }),

        // 이메일 발송 설정
        defineField({
            name: 'emailConfig',
            title: '이메일 발송 설정',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'senderName',
                    title: '발신자 이름',
                    type: 'string',
                    description: '이메일 발신자로 표시될 이름',
                    initialValue: '부다페스트한인선교교회',
                },
                {
                    name: 'senderEmail',
                    title: '발신자 이메일',
                    type: 'string',
                    description: '이메일 발신자 주소',
                    validation: (Rule) => Rule.email(),
                    initialValue: 'bfgc1004@gmail.com',
                },
                {
                    name: 'replyTo',
                    title: '답장 받을 이메일',
                    type: 'string',
                    description: '수신자가 답장할 때 사용될 이메일 주소',
                    validation: (Rule) => Rule.email(),
                    initialValue: 'bfgc1004@gmail.com',
                },
                {
                    name: 'ccEmails',
                    title: '참조(CC) 이메일',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: '모든 알림 이메일에 참조로 추가할 이메일 (선택)',
                    validation: (Rule) =>
                        Rule.custom((emails: string[] | undefined) => {
                            if (!emails || emails.length === 0) return true
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                            const invalidEmails = emails.filter((email) => !emailRegex.test(email))
                            if (invalidEmails.length > 0) {
                                return `올바르지 않은 이메일: ${invalidEmails.join(', ')}`
                            }
                            return true
                        }),
                },
            ],
        }),

        // 알림 방식 설정 (추후 확장)
        defineField({
            name: 'notificationMethods',
            title: '알림 방식 설정',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'emailEnabled',
                    title: '이메일 알림 사용',
                    type: 'boolean',
                    description: '이메일 알림 전체 활성화/비활성화',
                    initialValue: true,
                },
                {
                    name: 'kakaoEnabled',
                    title: '카카오톡 알림 사용 (추후)',
                    type: 'boolean',
                    description: '카카오톡 알림 (추후 구현 예정)',
                    initialValue: false,
                    readOnly: true,
                },
                {
                    name: 'smsEnabled',
                    title: 'SMS 알림 사용 (추후)',
                    type: 'boolean',
                    description: 'SMS 문자 알림 (추후 구현 예정)',
                    initialValue: false,
                    readOnly: true,
                },
            ],
        }),

        // 최종 수정 정보 (자동)
        defineField({
            name: 'lastUpdated',
            title: '최종 수정일',
            type: 'datetime',
            readOnly: true,
            options: {
                dateFormat: 'YYYY-MM-DD',
                timeFormat: 'HH:mm',
            },
        }),
    ],

    // 미리보기 설정
    preview: {
        select: {
            emailEnabled: 'notificationMethods.emailEnabled',
            lastUpdated: 'lastUpdated',
        },
        prepare({ emailEnabled, lastUpdated }) {
            return {
                title: '이메일 & 알림 설정',
                subtitle: `${emailEnabled ? '🟢 이메일 알림 활성화' : '🔴 이메일 알림 비활성화'} | ${lastUpdated ? `최종 수정: ${new Date(lastUpdated).toLocaleDateString('ko-KR')}` : '수정 내역 없음'}`,
            }
        },
    },
})
