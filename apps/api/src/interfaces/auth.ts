export interface IRegisterUserBody {
    email: string,
    password: string,
    name: string,
    isHost?: boolean
}

export interface IUserModal {
    id: number,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    role: string[]
}

