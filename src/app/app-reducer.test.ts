import {v1} from "uuid";
import {removeTodolistAC, TodolistDomainType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle"
    }
})

test('correct error message should be set', () => {
    const endState = appReducer(startState, setAppErrorAC("some error"))

    expect(endState.error).toBe("some error");

});

test('correct status message should be set', () => {
    const endState = appReducer(startState, setAppStatusAC("loading"))

    expect(endState.status).toBe("loading");

});