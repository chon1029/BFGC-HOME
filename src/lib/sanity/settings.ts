// src/lib/sanity/settings.ts
// Sanity Settings CRUD 함수

import { client } from '@/sanity/lib/client'

// ====================================
// 사이트 설정 (siteSettings)
// ====================================

export interface SiteSettings {
    _id?: string
    _type: 'siteSettings'
    churchInfo: {
        churchName: string
        churchDescription: string
        churchLogo?: any
    }
    seoSettings: {
        metaTitle: string
        metaDescription: string
        keywords: string[]
        ogImage?: any
        favicon?: any
    }
    contactInfo: {
        phone: string
        email: string
        address: string
        kakaoChannelUrl?: string
        googleMapUrl?: string
    }
    worshipTime: {
        sundayService: string
        fridayPrayer: string
        dawnPrayer?: string
        specialNotice?: string
    }
    externalServices?: {
        googleAnalyticsId?: string
        facebookPixelId?: string
        naverSiteVerification?: string
    }
    lastUpdated?: string
}

// 사이트 설정 조회
export async function getSiteSettings(): Promise<SiteSettings | null> {
    const query = `*[_type == "siteSettings"][0]`
    return await client.fetch(query)
}

// 사이트 설정 생성/업데이트
export async function updateSiteSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    // 기존 문서 확인
    const existing = await getSiteSettings()

    if (existing) {
        // 업데이트
        return await client
            .patch(existing._id!)
            .set({
                ...data,
                lastUpdated: new Date().toISOString(),
            })
            .commit()
    } else {
        // 새로 생성
        return await client.create({
            _type: 'siteSettings',
            ...data,
            lastUpdated: new Date().toISOString(),
        })
    }
}

// ====================================
// 팝업 설정 (popupSettings)
// ====================================

export interface PopupSettings {
    _id?: string
    _type: 'popupSettings'
    title: string
    content: any[] // Block content
    template: 'special-worship' | 'event-invitation' | 'urgent-notice' | 'celebration'
    customization: {
        backgroundColor?: string
        textColor?: string
        buttonText?: string
        buttonLink?: string
        buttonColor?: string
    }
    displaySettings: {
        enabled: boolean
        startDate: string
        endDate: string
        displayOnce: boolean
        priority: number
    }
    lastUpdated?: string
}

// 모든 팝업 조회 (우선순위 높은 순)
export async function getAllPopups(): Promise<PopupSettings[]> {
    const query = `*[_type == "popupSettings"] | order(displaySettings.priority desc, _createdAt desc)`
    return await client.fetch(query)
}

// 활성화된 팝업만 조회
export async function getActivePopups(): Promise<PopupSettings[]> {
    const now = new Date().toISOString()
    const query = `*[_type == "popupSettings" && displaySettings.enabled == true && displaySettings.startDate <= $now && displaySettings.endDate >= $now] | order(displaySettings.priority desc)`
    return await client.fetch(query, { now })
}

// 특정 팝업 조회
export async function getPopupById(id: string): Promise<PopupSettings | null> {
    const query = `*[_type == "popupSettings" && _id == $id][0]`
    return await client.fetch(query, { id })
}

// 팝업 생성
export async function createPopup(data: Omit<PopupSettings, '_id' | '_type'>): Promise<PopupSettings> {
    return await client.create({
        _type: 'popupSettings',
        ...data,
        lastUpdated: new Date().toISOString(),
    })
}

// 팝업 업데이트
export async function updatePopup(id: string, data: Partial<PopupSettings>): Promise<PopupSettings> {
    return await client
        .patch(id)
        .set({
            ...data,
            lastUpdated: new Date().toISOString(),
        })
        .commit()
}

// 팝업 삭제
export async function deletePopup(id: string): Promise<void> {
    await client.delete(id)
}

// ====================================
// 이메일 설정 (emailSettings)
// ====================================

export interface EmailSettings {
    _id?: string
    _type: 'emailSettings'
    newcomerNotification: {
        enabled: boolean
        recipients: string[]
        subject: string
    }
    contactNotification: {
        enabled: boolean
        recipients: string[]
        subject: string
    }
    discipleshipNotification: {
        enabled: boolean
        recipients: string[]
        subject: string
    }
    sermonNotification: {
        enabled: boolean
        recipients: string[]
        subject: string
    }
    emailConfig: {
        senderName: string
        senderEmail: string
        replyTo: string
        ccEmails: string[]
    }
    notificationMethods: {
        emailEnabled: boolean
        kakaoEnabled: boolean
        smsEnabled: boolean
    }
    lastUpdated?: string
}

// 이메일 설정 조회
export async function getEmailSettings(): Promise<EmailSettings | null> {
    const query = `*[_type == "emailSettings"][0]`
    return await client.fetch(query)
}

// 이메일 설정 생성/업데이트
export async function updateEmailSettings(data: Partial<EmailSettings>): Promise<EmailSettings> {
    const existing = await getEmailSettings()

    if (existing) {
        // 업데이트
        return await client
            .patch(existing._id!)
            .set({
                ...data,
                lastUpdated: new Date().toISOString(),
            })
            .commit()
    } else {
        // 새로 생성
        return await client.create({
            _type: 'emailSettings',
            ...data,
            lastUpdated: new Date().toISOString(),
        })
    }
}
