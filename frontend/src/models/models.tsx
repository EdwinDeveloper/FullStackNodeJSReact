export interface GetUsersResponse extends DefaultResponse{
    data: User[]
}

export interface DeleteUserResponse extends DefaultResponse {
    data: ""
}

export interface UpdateUserResponse extends DefaultResponse {
    data: User
}

export interface CreateUserResponse extends DefaultResponse {
    data: User
}

export interface User {
    id: string,
    name: string,
    email: string,
}

export interface DefaultResponse {
    status: number
}