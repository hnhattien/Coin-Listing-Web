import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import theme from '../theme/theme';
const localStorageThemeName = localStorage.getItem("casper_theme");
const initialState = {
    name: localStorageThemeName || 'light',
}
initialState.theme = theme[initialState.name];

if(document.querySelector("body") && localStorageThemeName !== 'light'){
    document.querySelector("body").classList.add(localStorageThemeName)
}

const themeSlice = createSlice({
    name: "theme",
    initialState: initialState,
    reducers: {
        toggleTheme : (state, action) => {
            if(state.name === 'light'){
                state.name = 'dark';
                state.theme = theme['dark']
                localStorage.setItem("casper_theme", 'dark');
            }
            else{
                state.name = 'light';
                state.theme = theme['light']
                localStorage.setItem("casper_theme", 'light');
            }
        }
    }
})

export const { toggleTheme, mapThemeFromLocalStorage } = themeSlice.actions;

export default themeSlice.reducer;