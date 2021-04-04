import {v1} from "uuid";
import {removeTodolistAC, TodolistDomainType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {appReducer, InitialStateType, setErrorAC, setStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setErrorAC("some error"))

    expect(endState.error).toBe("some error");

});

test('correct status message should be set', () => {
    const endState = appReducer(startState, setStatusAC("loading"))

    expect(endState.status).toBe("loading");

});