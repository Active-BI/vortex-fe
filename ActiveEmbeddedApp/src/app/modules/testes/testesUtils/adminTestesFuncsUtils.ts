import { DefaultErrorEvent, DefaultStatus, DefaultStatusText } from "./adminTestesUtils";

const defaultParams = { errorEvent: DefaultErrorEvent, status: DefaultStatus, statusText: DefaultStatusText}

export const errorCalback = (error,{ errorEvent, status, statusText} = defaultParams) => {
    const actualError = error;
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
}
export const requestError = (request,{ errorEvent, status, statusText} = defaultParams) => {
    request.error(errorEvent, {
        status,
        statusText
    });
}