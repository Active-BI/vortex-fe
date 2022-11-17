export interface FSDocument extends HTMLDocument
{
    mozFullScreenElement?: Element;
    mozCancelFullScreen: any;
    msFullscreenElement?: Element;
    msExitFullscreen: any;
    webkitFullscreenElement?: Element;
    webkitExitFullscreen: any;
}

export interface FSDocumentElement extends HTMLElement
{
    mozRequestFullScreen?: () => void;
    msRequestFullscreen?: () => void;
    webkitRequestFullscreen?: () => void;
}
