import { User } from '../models/models'
import { AxiosOptions } from './AxiosOptions'

//const url_base = "http://localhost:3000"
const url_base = "http://192.241.147.44:3000"

export function getAllUsers(): AxiosOptions{
    let options: AxiosOptions = {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/users/all`,
        data: {}
    }
    return options
}

export function deleteUser(userId: string): AxiosOptions{
    let options: AxiosOptions = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/users/${userId}`
    }
    return options
}

export function updateUser(user: User): AxiosOptions{
    let options: AxiosOptions = {
        method: 'patch',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/users/update`,
        data: user
    }
    return options
}

export function createUser(user: any): AxiosOptions{
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/users/create`,
        data: user
    }
    return options
}

export function deleteTask(userId: string): AxiosOptions{
    let options: AxiosOptions = {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/tasks/${userId}`
    }
    return options
}

export function createTask(task: any): AxiosOptions{
    let options: AxiosOptions = {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        url: `${url_base}/tasks/create`,
        data: task
    }
    return options
}