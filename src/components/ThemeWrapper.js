import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import getTheme from '../theme/getTheme';
export default function ThemeWrapper({children}) {
    
    
    const dispatch = useDispatch();
    const theme = useSelector(state => state.theme.theme);
   
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}
