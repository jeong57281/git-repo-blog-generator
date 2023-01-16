import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Theme, ThemeProvider } from '@material-ui/core/styles';

import MetaLayout from './meta-layout';
import { FCR, themes, getCookie, setCookie, themeCookie } from '../../util';

const Layout: FCR = (props) => {
    const [theme, setTheme] = useState<Theme>(themes[getCookie(themeCookie) || 'light']);
    const switchTheme = (): void => {
        setTheme((prev) => {
            const newTheme = prev.palette.type === 'dark' ? 'light' : 'dark';
            setCookie(themeCookie, newTheme);
            return themes[newTheme];
        });
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MetaLayout switchTheme={switchTheme}>{props.children}</MetaLayout>
        </ThemeProvider>
    );
};

export default Layout;
