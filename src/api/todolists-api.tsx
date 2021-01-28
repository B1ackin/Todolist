import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "3d3e74ba-244a-493d-82e2-37000cf7c4ef"
    }

}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4


}



export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}


type ResponseType<D = {}> = {
    resultCode: number
    message: Array<string>
    data: D
}

export type TaskType = {
    description: string
    title: string
    // completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type UpdateTaskType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export const todolistsAPI = {
    getTodolists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise;
    },
    createTodolists(title: string) {
       const promise = instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title: title})
        return promise;
    },
    deleteTodolist(id: string) {
        const promise = instance.delete<ResponseType>(`todo-lists/${id}`)
        return promise;
    },
    updateTodolist(id: string, title: string) {
        const promise = instance.put<ResponseType>(`todo-lists/${id}`, {title: title})
        return promise
    },
    getTasks(todolistID: string) {
        //возвращаем промис, тоже самое, что всерху
        return instance.get<GetTasksResponse>(`todo-lists/${todolistID}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<UpdateTaskType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

