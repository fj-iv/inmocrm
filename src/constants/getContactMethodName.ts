import { contactMethods } from './contactMethods'

export function getContactMethodName(id: number): string {
    return contactMethods.find((method) => method.id === id)?.name ?? ''
}
