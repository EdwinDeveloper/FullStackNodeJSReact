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

export interface DeleteTaskResponse extends DefaultResponse {
    data: ""
}

export interface CreateTaskResponse extends DefaultResponse {
    data: Task
}

export interface User {
    id: string,
    name: string,
    email: string,
    tasks: Task[]
}

export interface Task {
    id: string;
    title: string;
    priority: string;
    isCompleted: boolean;
    assignedToId: User;
}

export interface TaskRequest {
    title: string;
    priority: string;
    isCompleted: boolean;
    assignedToId: String;
}

export interface DefaultResponse {
    status: number
}