import React from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { zhCN } from '@mui/material/locale';

type ThemeProp = {
    children: JSX.Element
}

export enum themePalette {
    BG = "#FFFDF7",
    RED = "#D91E36",
    DARK = "#0F1108",
    CARD_WHITE = "#feffff",
    SUCCESS = "#388e3c",
    BLUE = "#0081C9",
    PURPLE = "#800080",
    ERROR = "#d32f2f",
    FONT_GLOBAL = "Nunito"
}

const theme = createTheme({
    palette:{
        background: {
            default: themePalette.BG
        },
        primary: {
            main: themePalette.RED,
        },
        secondary:{
            main: themePalette.BLUE,
        },
        info:{
            main: themePalette.BG
        }

    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL
    },
    components: {
        MuiButton: {
            defaultProps: {
                style: {
                    textTransform: "none",
                    boxShadow: "none",
                    borderRadius: "0.5em"
                }
            }
        }
    }
},zhCN);

export const ThemeConfig: React.FC<ThemeProp> = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
        );
}