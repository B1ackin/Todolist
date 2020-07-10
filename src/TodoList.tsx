import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";

type PropsType = {
    id: string,
    title: string,
    filter: FilterValueType,
    tasks: Array<TaskType>,
    removeTask: (id: string, todoListID: string) => void,
    changeFilter: (id: string, value: FilterValueType) => void,
    addTask: (title: string, todoListID: string) => void,
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void,
    removeTodoList: (id: string) => void,
    changeTaskTitle: (id: string, title: string, todoListID: string) => void,
    changeTodoListTitle: (title: string, todoListID: string ) => void
}

function TodoList(props: PropsType) {

    // let [title, setTitle] = useState<string>("");
    // let [error, setError] = useState<string|null>(null)

    let jsxTasks = props.tasks.map((t) => {

        const onStatusChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = event.currentTarget.checked;
            props.changeStatus(t.id, newIsDoneValue, props.id);
        }

        const onTitleChangeCallback = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.id);
        }

        return (
            <div key={t.id} className={(props.filter === "all" && t.isDone) ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={onStatusChangeHandler}
                />
                {/*<input type="checkbox" checked={t.isDone} onChange={onStatusChangeHandler}/>*/}
                <EditableSpan title={t.title} saveTitle={onTitleChangeCallback}/>
                <IconButton color={"primary"} onClick={()=>{props.removeTask(t.id, props.id)}}>
                    <Delete />
                </IconButton>
                {/*<button onClick={()=>{props.removeTask(t.id, props.id)}}>x</button>*/}
            </div>
        )
    });

    // const onAddTaskClick = () => {
    //     if(title.trim() !== ""){
    //         props.addTask(title, props.id);
    //
    //     } else {
    //         setError("Title is required")
    //     }
    //     setTitle("");
    // }

    const onAllChangeFilter = () => props.changeFilter(props.id,"all")
    const onActiveChangeFilter = () => props.changeFilter(props.id,"active")
    const onCompletedChangeFilter = () => props.changeFilter(props.id,"completed")
    // const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setError(null);
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressAddTask = (e: KeyboardEvent) => {
    //     setError(null);
    //     if(e.charCode === 13){
    //         onAddTaskClick()
    //     }
    // }
    const createTaskTitle = (title: string) => {
        props.addTask(title, props.id);
    }
    const deleteTodoList = () => props.removeTodoList(props.id)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id )
    }
    const allBtnClass = props.filter === "all" ? "active-filter" : "" ;


    return (
        <div>
            {/*<h3>{props.title}<button onClick={deleteTodoList}>x</button></h3>*/}
            <h3>
                <EditableSpan title={props.title} saveTitle={changeTodoListTitle} />
                {/*<button onClick={deleteTodoList}>x</button>*/}
                <IconButton onClick={deleteTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={createTaskTitle} />
            {/*<div>*/}
            {/*    <input*/}
            {/*        type="text"*/}
            {/*        value={title}*/}
            {/*        onChange={onTitleChange}*/}
            {/*        onKeyPress={onKeyPressAddTask}*/}
            {/*        className={error ? "error" : ""}*/}
            {/*    />*/}
            {/*    <button onClick={onAddTaskClick}>add</button>*/}
            {/*    {error && <div className={"error-message"}>{error}</div>}*/}
            {/*</div>*/}
            <div>
                { jsxTasks }
            </div>
            <div>
                <Button
                    // className={allBtnClass}
                    onClick={onAllChangeFilter}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    variant={"outlined"}
                >All</Button>
                <Button
                    // className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveChangeFilter}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    variant={"outlined"}
                >Active</Button>
                <Button
                    // className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedChangeFilter}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    variant={"outlined"}
                >Completed</Button>
            </div>
        </div>
    );
}

export default TodoList;
