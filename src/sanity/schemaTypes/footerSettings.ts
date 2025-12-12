// src/sanity/schemaTypes/footerSettings.ts
// 푸터 설정 스키마 - 웹사이트 하단 푸터 정보 관리

import { defineType, defineField } from 'sanity'
import { Globe } from 'lucide-react'

export default defineType({
    name: 'footerSettings',
    title: '푸터 설정',
    type: 'document',
    icon: Globe,
    // 싱글톤 패턴 - 하나의 문서만 존재
    // __experimental_singleton: true,
    fields: [
        // 교회 기본 정보 그룹
        defineField({
            name: 'churchInfo',
            title: '교회 기본 정보',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'churchName',
                    title: '교회명',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '부다페스트한인선교교회',
                },
                {
                    name: 'churchDescription',
                    title: '교회 소개',
                    type: 'text',
                    rows: 8,
                    validation: (Rule) => Rule.required(),
                    description: '푸터에 표시될 교회 소개글입니다',
                },
            ],
        }),

        // 연락처 정보 그룹
        defineField({
            name: 'contactInfo',
            title: '연락처 정보',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'address',
                    title: '주소',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '1073 Budapest, Osvát utca 16, Hungary',
                },
                {
                    name: 'phone',
                    title: '전화번호',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '+36 20 320 1595',
                },
                {
                    name: 'email',
                    title: '이메일',
                    type: 'string',
                    validation: (Rule) => Rule.required().email(),
                    initialValue: 'bfgc1004@gmail.com',
                },
            ],
        }),

        // 예배 시간 그룹
        defineField({
            name: 'worshipTime',
            title: '예배 시간',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'sundayService',
                    title: '주일 예배',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '주일 예배: 15:00(오후 3시)',
                },
                {
                    name: 'fridayPrayer',
                    title: '금요 기도회',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '금요 기도회: 19:00(저녁 7시)',
                },
            ],
        }),

        // 소셜 미디어 그룹
        defineField({
            name: 'socialMedia',
            title: '소셜 미디어',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'facebook',
                    title: 'Facebook',
                    type: 'object',
                    fields: [
                        {
                            name: 'url',
                            title: 'Facebook URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.uri({
                                    scheme: ['http', 'https'],
                                }),
                        },
                        {
                            name: 'enabled',
                            title: '표시',
                            type: 'boolean',
                            initialValue: true,
                        },
                    ],
                },
                {
                    name: 'youtube',
                    title: 'YouTube',
                    type: 'object',
                    fields: [
                        {
                            name: 'url',
                            title: 'YouTube URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.uri({
                                    scheme: ['http', 'https'],
                                }),
                        },
                        {
                            name: 'enabled',
                            title: '표시',
                            type: 'boolean',
                            initialValue: true,
                        },
                    ],
                },
                {
                    name: 'instagram',
                    title: 'Instagram',
                    type: 'object',
                    fields: [
                        {
                            name: 'url',
                            title: 'Instagram URL',
                            type: 'url',
                            validation: (Rule) =>
                                Rule.uri({
                                    scheme: ['http', 'https'],
                                }),
                        },
                        {
                            name: 'enabled',
                            title: '표시',
                            type: 'boolean',
                            initialValue: true,
                        },
                    ],
                },
            ],
        }),

        // 기타 설정 그룹
        defineField({
            name: 'otherSettings',
            title: '기타 설정',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'copyright',
                    title: '저작권 문구',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '© 2024 부다페스트한인선교교회. All rights reserved.',
                },
                {
                    name: 'antiCultStatement',
                    title: '이단 경고문',
                    type: 'text',
                    rows: 3,
                    validation: (Rule) => Rule.required(),
                    initialValue: '부다페스트한인선교교회는\n신천지 및 이단단체를 거부합니다',
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
            churchName: 'churchInfo.churchName',
            lastUpdated: 'lastUpdated',
        },
        prepare({ churchName, lastUpdated }) {
            return {
                title: `푸터 설정 - ${churchName}`,
                subtitle: lastUpdated
                    ? `최종 수정: ${new Date(lastUpdated).toLocaleDateString('ko-KR')}`
                    : '수정 내역 없음',
            }
        },
    },
})
