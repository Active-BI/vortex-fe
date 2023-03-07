export interface UserSignInResponse {
    apiToken: string,
    succeded: boolean,
    message: string,
    redirect2FA?: boolean,
    manualEntryKey?: string,
    urlImage?: string,
    tempToken?: string
}