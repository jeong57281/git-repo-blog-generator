import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';

import useSiteMetadata from '../../hooks/useSiteMetadata';
import Header from './header';
import Footer from './footer';
import { FCR } from '../../util';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.default
    },
    main: {
        marginTop: '5rem',
        backgroundColor: theme.palette.background.default
    }
}));

type MetaLayoutProps = {
    switchTheme: () => void;
};

const MetaLayout: FCR<MetaLayoutProps> = (props) => {
    const styles = useStyles();
    const { title } = useSiteMetadata();
    return (
        <div className={styles.root}>
            <Header switchTheme={props.switchTheme} siteTitle={title} />
            <main className={styles.main}>{props.children}</main>
            <Footer />
        </div>
    );
};

export default MetaLayout;
