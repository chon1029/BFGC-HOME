import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // 관리자 페이지는 검색 엔진 수집 제외
        },
        sitemap: 'https://www.bfgc.kr/sitemap.xml', // 실제 도메인으로 변경
    }
}
