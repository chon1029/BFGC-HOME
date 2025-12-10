// src/sanity/schemaTypes/popupSettings.ts
// 팝업 및 공지 관리 스키마 - 템플릿 기반 팝업 생성

import { defineType, defineField } from 'sanity'
import { Bell } from 'lucide-react'

export default defineType({
    name: 'popupSettings',
    title: '팝업 & 공지 관리',
    type: 'document',
    icon: Bell,
    fields: [
        // 공지 제목
        defineField({
            name: 'title',
            title: '공지 제목',
            type: 'string',
            validation: (Rule) => Rule.required().max(100),
            description: '팝업 제목 (최대 100자)',
        }),

        // 공지 내용 (Rich Text Editor)
        defineField({
            name: 'content',
            title: '공지 내용',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: '본문', value: 'normal' },
                        { title: '제목1', value: 'h1' },
                        { title: '제목2', value: 'h2' },
                        { title: '제목3', value: 'h3' },
                        { title: '인용', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: '굵게', value: 'strong' },
                            { title: '기울임', value: 'em' },
                            { title: '밑줄', value: 'underline' },
                            { title: '취소선', value: 'strike-through' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: '링크',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                    },
                                ],
                            },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            validation: (Rule) => Rule.required(),
            description: '공지 내용 (텍스트, 이미지, 링크 등 포함 가능)',
        }),

        // 템플릿 종류
        defineField({
            name: 'template',
            title: '팝업 템플릿',
            type: 'string',
            options: {
                list: [
                    { title: '🎄 특별 예배 안내', value: 'special-worship' },
                    { title: '📅 행사 초대', value: 'event-invitation' },
                    { title: '⚠️ 긴급 공지', value: 'urgent-notice' },
                    { title: '🎉 축하 메시지', value: 'celebration' },
                ],
                layout: 'radio',
            },
            validation: (Rule) => Rule.required(),
            description: '팝업 디자인 템플릿 선택',
        }),

        // 팝업 커스터마이징
        defineField({
            name: 'customization',
            title: '팝업 커스터마이징',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'backgroundColor',
                    title: '배경색',
                    type: 'string',
                    description: 'HEX 코드 (예: #ffffff)',
                    validation: (Rule) =>
                        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                            name: 'hex',
                            invert: false,
                        }).error('올바른 HEX 코드를 입력하세요 (예: #ffffff)'),
                },
                {
                    name: 'textColor',
                    title: '텍스트 색상',
                    type: 'string',
                    description: 'HEX 코드 (예: #000000)',
                    validation: (Rule) =>
                        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                            name: 'hex',
                            invert: false,
                        }).error('올바른 HEX 코드를 입력하세요 (예: #000000)'),
                },
                {
                    name: 'buttonText',
                    title: '버튼 텍스트',
                    type: 'string',
                    description: '팝업 내 버튼 텍스트 (예: 자세히 보기)',
                },
                {
                    name: 'buttonLink',
                    title: '버튼 링크',
                    type: 'url',
                    description: '버튼 클릭 시 이동할 URL',
                    validation: (Rule) =>
                        Rule.uri({
                            scheme: ['http', 'https', 'mailto', 'tel'],
                        }),
                },
                {
                    name: 'buttonColor',
                    title: '버튼 색상',
                    type: 'string',
                    description: 'HEX 코드 (예: #38bdf8)',
                    validation: (Rule) =>
                        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
                            name: 'hex',
                            invert: false,
                        }).error('올바른 HEX 코드를 입력하세요'),
                },
            ],
        }),

        // 표시 설정
        defineField({
            name: 'displaySettings',
            title: '표시 설정',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'enabled',
                    title: '팝업 활성화',
                    type: 'boolean',
                    description: '팝업을 화면에 표시할지 여부',
                    initialValue: false,
                },
                {
                    name: 'startDate',
                    title: '시작 날짜',
                    type: 'datetime',
                    description: '팝업 표시 시작 시간',
                    validation: (Rule) => Rule.required(),
                    options: {
                        dateFormat: 'YYYY-MM-DD',
                        timeFormat: 'HH:mm',
                    },
                },
                {
                    name: 'endDate',
                    title: '종료 날짜',
                    type: 'datetime',
                    description: '팝업 표시 종료 시간',
                    validation: (Rule) => Rule.required().min(Rule.valueOfField('startDate')),
                    options: {
                        dateFormat: 'YYYY-MM-DD',
                        timeFormat: 'HH:mm',
                    },
                },
                {
                    name: 'displayOnce',
                    title: '오늘 하루 보지 않기',
                    type: 'boolean',
                    description: '쿠키를 사용하여 하루 동안 팝업을 표시하지 않음',
                    initialValue: true,
                },
                {
                    name: 'priority',
                    title: '우선순위',
                    type: 'number',
                    description: '여러 팝업이 있을 때 표시 순서 (높을수록 우선)',
                    validation: (Rule) => Rule.min(1).max(10),
                    initialValue: 5,
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
            title: 'title',
            template: 'template',
            enabled: 'displaySettings.enabled',
            startDate: 'displaySettings.startDate',
        },
        prepare({ title, template, enabled, startDate }) {
            // 템플릿 이름 매핑
            const templateNames: Record<string, string> = {
                'special-worship': '🎄 특별 예배',
                'event-invitation': '📅 행사 초대',
                'urgent-notice': '⚠️ 긴급 공지',
                celebration: '🎉 축하 메시지',
            }

            return {
                title: title,
                subtitle: `${templateNames[template] || template} | ${enabled ? '🟢 활성화' : '🔴 비활성화'} | ${startDate ? new Date(startDate).toLocaleDateString('ko-KR') : '날짜 미설정'}`,
            }
        },
    },

    // 정렬 순서 (우선순위 높은 순 → 최근 생성 순)
    orderings: [
        {
            title: '우선순위 높은 순',
            name: 'priorityDesc',
            by: [
                { field: 'displaySettings.priority', direction: 'desc' },
                { field: '_createdAt', direction: 'desc' },
            ],
        },
        {
            title: '최근 생성 순',
            name: 'createdAtDesc',
            by: [{ field: '_createdAt', direction: 'desc' }],
        },
        {
            title: '시작 날짜 순',
            name: 'startDateAsc',
            by: [{ field: 'displaySettings.startDate', direction: 'asc' }],
        },
    ],
})
