// Providers.js
'use client';

import { Provider } from "react-redux";
import { store } from "./store/store";
// import { Providers } from "react-redux"

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}