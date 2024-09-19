export interface User {
    id: string;
    name: string;
    email: string;
    tasks: Task[]
}

export interface Task {
    id: string;
    title: string;
    priority: string;
    isCompleted: boolean;
    assignedToId: User;
}