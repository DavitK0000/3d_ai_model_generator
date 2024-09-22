// src/app/store.js

import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApiState {
    tripoApiKey: string | null;
    tripoClientId: string | null;
}

const initialState: ApiState = {
    tripoApiKey: 'tcli_ecf78bb535bd479fb8fd3fbc6324e0f7',
    tripoClientId: 'tsk_yAJCkGuJyM40QZoo2VwoeoggZHyluEc1tVdzOkRzAO0',
};

const tripoApiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setTripoApiKey: (state, action: PayloadAction<string>) => {
            state.tripoApiKey = action.payload;
        },
        setTripoClientId: (state, action: PayloadAction<string>) => {
            state.tripoClientId = action.payload;
        },
    },
});

export const { setTripoApiKey, setTripoClientId } = tripoApiSlice.actions;

export const store = configureStore({
    reducer: {
        api: tripoApiSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
