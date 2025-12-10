// src/lib/sanity/history.ts
// Sanity 히스토리 & 복원 함수

import { client } from '@/sanity/lib/client'

// 히스토리 버전 인터페이스
export interface HistoryVersion {
    _id: string
    _rev: string
    _type: string
    _updatedAt: string
    _createdAt: string
    [key: string]: any
}

/**
 * 문서의 히스토리 조회
 *
 * @param docType - 문서 타입 (siteSettings, popupSettings, emailSettings)
 * @param limit - 조회할 히스토리 개수 (기본 20개)
 * @returns 히스토리 버전 배열
 */
export async function getDocumentHistory(
    docType: string,
    limit: number = 20,
): Promise<HistoryVersion[]> {
    const query = `*[_type == $docType] | order(_updatedAt desc) [0...$limit]`
    return await client.fetch(query, { docType, limit })
}

/**
 * 특정 버전으로 복원
 *
 * @param currentDocId - 현재 문서 ID
 * @param targetVersion - 복원할 버전의 데이터
 * @returns 복원된 문서
 */
export async function restoreVersion(
    currentDocId: string,
    targetVersion: HistoryVersion,
): Promise<any> {
    // _id, _rev, _type, _createdAt, _updatedAt 제외한 모든 필드를 복원
    const { _id, _rev, _type, _createdAt, _updatedAt, ...restoreData } = targetVersion

    // 현재 문서를 타겟 버전의 데이터로 업데이트
    return await client
        .patch(currentDocId)
        .set({
            ...restoreData,
            lastUpdated: new Date().toISOString(), // 복원 시간 기록
        })
        .commit()
}

/**
 * 사이트 설정 히스토리 조회
 */
export async function getSiteSettingsHistory(limit: number = 20): Promise<HistoryVersion[]> {
    return await getDocumentHistory('siteSettings', limit)
}

/**
 * 팝업 설정 히스토리 조회 (특정 팝업 ID)
 */
export async function getPopupHistory(popupId: string, limit: number = 20): Promise<HistoryVersion[]> {
    const query = `*[_type == "popupSettings" && _id == $popupId] | order(_updatedAt desc) [0...$limit]`
    return await client.fetch(query, { popupId, limit })
}

/**
 * 이메일 설정 히스토리 조회
 */
export async function getEmailSettingsHistory(limit: number = 20): Promise<HistoryVersion[]> {
    return await getDocumentHistory('emailSettings', limit)
}

/**
 * 복원 이력 기록 (선택 사항)
 *
 * 복원 작업을 로그로 남기고 싶을 때 사용
 */
export interface RestoreLog {
    _type: 'restoreLog'
    documentType: string
    documentId: string
    restoredFrom: string // 복원한 버전의 _rev
    restoredAt: string
    restoredBy?: string // 복원한 사용자 (추후 인증 연동 시)
}

export async function createRestoreLog(log: Omit<RestoreLog, '_type'>): Promise<RestoreLog> {
    return await client.create({
        _type: 'restoreLog',
        ...log,
    })
}
