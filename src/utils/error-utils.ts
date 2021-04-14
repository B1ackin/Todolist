import {setAppErrorAC, setAppStatusAC, SetErrorActionsType, SetStatusActionsType} from "../app/app-reducer";
import {ResponseType} from "../api/todolists-api"
import {ThunkDispatch} from "redux-thunk";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch<SetStatusActionsType | SetErrorActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Some error occurred"))
    }
}

export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetStatusActionsType | SetErrorActionsType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error"))
    dispatch(setAppStatusAC('failed'))
}