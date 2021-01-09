import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsAPI} from "../api/todolists-api";


export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "3d3e74ba-244a-493d-82e2-37000cf7c4ef"
    }

}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
        .then((res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>("")

    const CreateTodo = () => {
        todolistsAPI.createTodolists(title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
    <div>
        <input placeholder={"Введите title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
        <button onClick={CreateTodo}>Create Todolist</button>
    </div>
    </div>
} //Готово

export const DeleteTodolist = () =>  {
    const [state, setState] = useState<any>(null)
    const [deleteTodolist, setDeleteTodolist] = useState<any>("")

    // useEffect(() => {
    //
    // }, [])

    const deleteTodo = () => {
        const todolistId = deleteTodolist;
        todolistsAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"Введите ID todolist"} value={deleteTodolist} onChange={(e) => {setDeleteTodolist(e.currentTarget.value)}}/>
            <button onClick={deleteTodo}>delete todolist</button>
        </div>
    </div>
} // Готово

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todoId, setTodoId] = useState("")
    const [title, setTitle] = useState("")

    // useEffect(() => {
    //     const todolistId = todoId;
    //     todolistsAPI.updateTodolist(todolistId, title)
    //         .then((res) => {
    //             setState(res.data);
    //         })
    // }, [])

    const updateTitle = () => {
        todolistsAPI.updateTodolist(todoId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"Введите ID Todolists"}
                   value={todoId}
                   onChange={(e) => {setTodoId(e.currentTarget.value)}}
            />
            <input placeholder={"Введите title"}
                   value={title}
                   onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <button onClick={updateTitle}>Update title</button>
        </div>
    </div>
} // Готово

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todolistID, setTodolistID] = useState("")

    const GetTaskForId = () => {
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                setState(res.data);
            })
    }



    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"Введите ID Todolist"} value={todolistID} onChange={(e) => {setTodolistID(e.currentTarget.value)}}/>
            <button onClick={GetTaskForId}>Посмотреть</button>
        </div>


    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>("")
    const [todolistId, setTodolistId] = useState<string>("")

    const deteleTask = () => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input placeholder={"todolistID"} value={todolistId} onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={"taskId"} value={taskId} onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
        <button onClick={deteleTask}>Delete Task</button>
    </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>("")
    const [todolistID, setTodolistID] = useState<any>("")

    const CreateTodo = () => {
        const todolistId = todolistID
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={"Введите ID Todolist"} value={todolistID} onChange={(e) => {setTodolistID(e.currentTarget.value)}}/>
            <input placeholder={"Введите title"} value={title} onChange={(e) => {setTitle(e.currentTarget.value)}}/>
            <button onClick={CreateTodo}>Add Task</button>
        </div>
    </div>
}



//Создание таски
//Обновление таски - посмотреть в доке свойства (передается ещё модел)
