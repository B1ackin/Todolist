import React, {CSSProperties, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import AddItemForm from "./AddItemForm";
import {Menu} from "@material-ui/icons";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";

export type TaskType = {
    id: string,
    isDone: boolean,
    title: string,
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType
}

export type FilterValueType = "all" | "active" | "completed";

type TasksStateType = {
    [key: string]: Array<TaskType>
}

let elementPadding: CSSProperties = {padding: "15px"};

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "Books", filter: "all"},
        {id: todoListID2, title: "Songs", filter: "all"},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todoListID1]: [
            {id: v1(), isDone: true, title: "JS"},
            {id: v1(), isDone: true, title: "React"},
            {id: v1(), isDone: false, title: "Redux"},
        ],
        [todoListID2]: [
            {id: v1(), isDone: false, title: "RestAPI"},
            {id: v1(), isDone: false, title: "GraphQL"},
            {id: v1(), isDone: true, title: "GraphQL"},
        ]
    });
    console.dir(setTasks);

    function removeTask(id: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListID: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, title: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(task => task.id === id);
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function changeFilter(id: string, value: FilterValueType) {
        let todoList = todoLists.find(tl => tl.id === id);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([newTodoList, ...todoLists]);
        setTasks({
            ...tasks,
            [newTodoListID]: []
        })
    }

    function changeTodoListTitle(newTitle: string, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        ToDoList
                    </Typography>

                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "15px 0px 15px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todoLists.map(tl => {
                        let allTasks = tasks[tl.id];
                        let tasksForTodoList = allTasks;

                        if (tl.filter === "active") {
                            tasksForTodoList = allTasks.filter(t => t.isDone === false)
                        }
                        if (tl.filter === "completed") {
                            tasksForTodoList = allTasks.filter(t => t.isDone === true)
                        }
                        return (
                            <Grid item key={tl.id}>
                                <Paper style={elementPadding}  elevation={3}>
                                    <TodoList
                                        id={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                        tasks={tasksForTodoList}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeStatus={changeStatus}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
