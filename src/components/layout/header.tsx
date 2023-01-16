import React, { useState } from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { AppBar, Toolbar, Typography, Link, Button, Tooltip } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { BsToggleOn, BsToggleOff } from 'react-icons/bs';

import { FC } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    title: {
        flexGrow: 1
    },
    link: {
        textDecoration: 'none'
    }
}));

export interface HeaderProps {
    switchTheme: () => void;
    siteTitle?: string;
}

const Header: FC<HeaderProps> = (props) => {
    const [showOn, setShowOn] = useState<boolean>(false);
    const styles = useStyles();

    const onSwitch = (): void => {
        setShowOn((prev) => !prev);
        props.switchTheme();
    };

    return (
        <AppBar component="header" position="static" className={styles.root}>
            <Toolbar>
                <Typography variant="h6" className={styles.title}>
                    <Link to="/" component={GatsbyLink} color="inherit" className={styles.link}>
                        {props.siteTitle || ''}
                    </Link>
                </Typography>
                <Tooltip title="switch theme">
                    <Button onClick={onSwitch}>
                        {showOn ? <BsToggleOn size="40" /> : <BsToggleOff size="40" />}
                    </Button>
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
