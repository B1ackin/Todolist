import React from "react"
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "../components/EditableSpan/EditableSpan";
import App from "./App";
import {Provider} from "react-redux";
import {store} from "./store";
import {ReduxStoreProviderDecorator} from "../stories/ReduxStoreProviderDecorator";

export default {
    title: "App Component",
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const AppWithReduxBaseExample = () => {
    return <>

        <App />

    </>
}


