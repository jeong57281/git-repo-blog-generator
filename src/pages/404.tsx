import React from 'react';
import { Typography, Container } from '@material-ui/core';
import { Theme, makeStyles } from '@material-ui/core/styles';

import { Seo } from '../components';
import { FC } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2)
    }
}));

const NotFoundPage: FC = () => {
    const styles = useStyles();
    return (
        <Container maxWidth="md" className={styles.root}>
            <Seo title="404: Not found" />
            <Typography variant="h2" gutterBottom component="h1">
                NOT FOUND
            </Typography>
            <Typography variant="body1">
                You just hit a route that doesn&#39;t exist... the sadness.
            </Typography>
        </Container>
    );
};

export default NotFoundPage;
