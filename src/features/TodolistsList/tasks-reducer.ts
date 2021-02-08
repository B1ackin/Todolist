import {TasksStateType} from '../../trash/App';
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {act} from "react-dom/test-utils";

// export type RemoveTaskActionType = {
//     type: 'REMOVE-TASK',
//     todolistId: string
//     taskId: string
// }
//
// export type AddTaskActionType = {
//     type: 'ADD-TASK',
//     task: TaskType
// }
//
// export type UpdateTaskActionType = {
//     type: 'UPDATE-TASK',
//     todolistId: string
//     taskId: string
//     model: UpdateDomainTaskModelType
// }
//
// export type ChangeTaskTitleActionType = {
//     type: 'CHANGE-TASK-TITLE',
//     todolistId: string
//     taskId: string
//     title: string
// }
//
// export type SetTasksActionType = {
//     type: 'SET-TASKS'
//     tasks: Array<TaskType>
//     todolistId: string
// }




const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)
            }
            // const stateCopy = {...state} // старый вариант - выше зарефакторинный код
            // const tasks = stateCopy[action.todolistId];
            // const newTasks = tasks.
            // stateCopy[action.todolistId] = newTasks;
            // return stateCopy;
        }
        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        //     const stateCopy = {...state}
        //     const newTask = action.task
        //     const tasks = stateCopy[newTask.todoListId];
        //     const newTasks = [newTask, ...tasks];
        //     stateCopy[newTask.todoListId] = newTasks;
        //     return stateCopy;
        // }
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(task => task.id === action.taskId ? {...task, ...action.model}: task) }
        //     let todolistTasks = state[action.todolistId];
        //     state[action.todolistId] = todolistTasks
        //         .map(t => t.id === action.taskId
        //             ? {...t, ...action.model}
        //             : t);
        //     return ({...state});
        // }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = [];
            })
            return copyState
        }
        case 'SET-TASKS': {
            const copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }
        default:
            return state;
    }
}
// actions
export const removeTaskAC = (taskId: string, todolistId: string) => ({type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
// export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) => ({ type: 'SET-TASKS', tasks, todolistId} as const)

//thunks
export const fetchTaskTC = (todolistId: string) =>  (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(setTaskAC(res.data.items, todolistId))
            })
    }

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then ( res => {
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
            })
    }

export const addTaskTC = (title: string, todolistId: string  ) => (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTask(todolistId, title)
            .then(res => {
                debugger
                const task = res.data.data.item;
                const action = addTaskAC(task)
                dispatch(action)
            })
    }

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string) => {

    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const state = getState();
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if(!task) {
            console.warn("Task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            // можно так ...task но лучше как сейчас
            title: task.title,
            ...domainModel
        }
        todolistsAPI.updateTask(taskId, todolistId, apiModel)
            .then((res) => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }
}

//types
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTaskAC>


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}