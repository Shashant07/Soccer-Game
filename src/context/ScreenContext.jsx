import { createContext, useState } from "react";

import { SCREENS } from '../config/screens';

export const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
    const [screen, setScreen] = useState(SCREENS.LANDING);

    return (
        <ScreenContext.Provider value={{ screen, setScreen }}>{children}</ScreenContext.Provider>
    )
}