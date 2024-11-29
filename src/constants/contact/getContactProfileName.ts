import { contactProfiles } from './contactProfiles'

export function getContactProfileName(id: number): string {
    return contactProfiles.find((profile) => profile.id === id)?.name ?? ''
}
