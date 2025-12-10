// src/sanity/schemaTypes/siteSettings.ts
// 사이트 기본 설정 스키마 - SEO, 연락처, 예배 시간 등 관리

import { defineType, defineField } from 'sanity'
import { Settings } from 'lucide-react'

export default defineType({
    name: 'siteSettings',
    title: '사이트 관리',
    type: 'document',
    icon: Settings,
    // 싱글톤 패턴 - 하나의 문서만 존재
    __experimental_singleton: true,
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
                    description: '교회 소개글 (메인 페이지에 표시)',
                    initialValue:
                        '사도행전적 역사가 일어나는 교회 부다페스트 한인선교교회에 오신 것을 환영합니다!',
                },
                {
                    name: 'churchLogo',
                    title: '교회 로고',
                    type: 'image',
                    description: '교회 로고 이미지 (권장: PNG, 투명 배경)',
                    options: {
                        hotspot: true,
                    },
                },
            ],
        }),

        // SEO 설정 그룹
        defineField({
            name: 'seoSettings',
            title: 'SEO 설정',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: false,
            },
            fields: [
                {
                    name: 'metaTitle',
                    title: '메타 제목',
                    type: 'string',
                    validation: (Rule) => Rule.required().max(60),
                    description: '브라우저 탭에 표시되는 제목 (최대 60자)',
                    initialValue: '부다페스트한인선교교회 | BFGC',
                },
                {
                    name: 'metaDescription',
                    title: '메타 설명',
                    type: 'text',
                    rows: 3,
                    validation: (Rule) => Rule.required().max(160),
                    description: '검색 결과에 표시되는 설명 (최대 160자)',
                    initialValue:
                        '헝가리 부다페스트에 위치한 한인교회입니다. 예배, 선교, 양육, 치유, 교제를 통해 하나님 나라를 세워갑니다.',
                },
                {
                    name: 'keywords',
                    title: '키워드',
                    type: 'array',
                    of: [{ type: 'string' }],
                    description: 'SEO 검색 키워드 (엔터로 추가)',
                    initialValue: ['부다페스트', '한인교회', 'BFGC', '헝가리', '선교교회'],
                },
                {
                    name: 'ogImage',
                    title: 'OG 이미지',
                    type: 'image',
                    description: '소셜 미디어 공유 시 표시되는 이미지 (권장: 1200x630px)',
                    options: {
                        hotspot: true,
                    },
                },
                {
                    name: 'favicon',
                    title: '파비콘',
                    type: 'image',
                    description: '브라우저 탭 아이콘 (권장: 32x32px)',
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
                {
                    name: 'address',
                    title: '주소',
                    type: 'string',
                    validation: (Rule) => Rule.required(),
                    initialValue: '1073 Budapest, Osvát utca 16, Hungary',
                },
                {
                    name: 'kakaoChannelUrl',
                    title: '카카오톡 채널 URL',
                    type: 'url',
                    description: '카카오톡 오픈채팅 또는 채널 링크',
                    validation: (Rule) =>
                        Rule.uri({
                            scheme: ['http', 'https'],
                        }),
                },
                {
                    name: 'googleMapUrl',
                    title: '구글 지도 링크',
                    type: 'url',
                    description: '오시는 길 구글 지도 URL',
                    validation: (Rule) =>
                        Rule.uri({
                            scheme: ['http', 'https'],
                        }),
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
                {
                    name: 'dawnPrayer',
                    title: '새벽 기도회',
                    type: 'string',
                    description: '새벽 기도회 시간 (선택)',
                },
                {
                    name: 'specialNotice',
                    title: '특별 예배 공지',
                    type: 'text',
                    rows: 3,
                    description: '특별 예배, 시간 변경 등 공지사항',
                },
            ],
        }),

        // 외부 서비스 연동 그룹
        defineField({
            name: 'externalServices',
            title: '외부 서비스 연동',
            type: 'object',
            options: {
                collapsible: true,
                collapsed: true,
            },
            fields: [
                {
                    name: 'googleAnalyticsId',
                    title: '구글 애널리틱스 ID',
                    type: 'string',
                    description: 'GA4 측정 ID (예: G-XXXXXXXXXX)',
                },
                {
                    name: 'facebookPixelId',
                    title: '페이스북 픽셀 ID',
                    type: 'string',
                    description: '페이스북 픽셀 추적 ID',
                },
                {
                    name: 'naverSiteVerification',
                    title: '네이버 사이트 인증',
                    type: 'string',
                    description: '네이버 서치 어드바이저 인증 코드',
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
                title: `사이트 설정 - ${churchName}`,
                subtitle: lastUpdated
                    ? `최종 수정: ${new Date(lastUpdated).toLocaleDateString('ko-KR')}`
                    : '수정 내역 없음',
            }
        },
    },
})
