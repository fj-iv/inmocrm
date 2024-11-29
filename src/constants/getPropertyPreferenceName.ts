import { propertyPreferences } from '@/constants/propertyPreferences'

export function getPropertyPreferenceName(id: number): string {
    return propertyPreferences.find((preference) => preference.id === id)?.name ?? ''
}
