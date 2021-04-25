import React, {useCallback, useEffect} from 'react'
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography
} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {TaskType} from "./../api/todolists-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {ErrorSnackbar} from "../components/ErrorSnackBar/ErrorSnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initiaizedAppTC, RequestStatusType} from "./app-reducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {logoutTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

/*
const Fake = React.memo(function() {
    console.log("FAKE")
    const arr = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks.count)
    return <h1>{arr.length}</h1>
})
*/

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initiaizedAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if(!isInitialized) {
        return <div style={ {position: "fixed", top: "30%", textAlign: "center", width: "100%"} }>
            <CircularProgress />
        </div>
    }



    return (
        <BrowserRouter>
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    { isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                { status === "loading" && <LinearProgress /> }

            </AppBar>
            <Container fixed>
                <Route exact path={"/"} render={() => <TodolistsList demo={demo}/>}/>
                <Route path={"/login"} render={() => <Login/>}/>

            </Container>
        </div>
        </BrowserRouter>
    );
}



// {
        //     todolists.map(tl => {
        //         let allTodolistTasks = tasks[tl.id];
        //         let tasksForTodolist = allTodolistTasks;
        //
        //         return (
        //         <Grid item key={tl.id}>
        //             <Paper style={{padding: "10px"}}>
        //                 <Todolist
        //                     id={tl.id}
        //                     title={tl.title}
        //                     tasks={tasksForTodolist}
        //                     removeTask={removeTask}
        //                     changeFilter={changeFilter}
        //                     addTask={addTask}
        //                     changeTaskStatus={changeStatus}
        //                     filter={tl.filter}
        //                     removeTodolist={removeTodolist}
        //                     changeTaskTitle={changeTaskTitle}
        //                     changeTodolistTitle={changeTodolistTitle}
        //                 />
        //             </Paper>
        //         </Grid>)
        //     })
        // }





export default App;
