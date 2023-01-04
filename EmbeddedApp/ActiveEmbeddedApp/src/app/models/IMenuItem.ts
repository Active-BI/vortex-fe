export interface IMenuItem {
    class: string,
    context: string,
    icon: string
    id: string
    longTitle: string
    menuSubItens: null | IMenuSubItens[]
    path: string
    title: string
}

export interface IPostMenuItem {
    class: string,
    context: string,
    icon: string
    longTitle: string
    menuSubItens: null | IMenuSubItens[]
    path: string
    title: string
}

export interface IMenuSubItens {
    class: string,
    context: string,
    icon: string
    id: string
    longTitle: string
    path: string
    title: string
    menuItemId: string
}