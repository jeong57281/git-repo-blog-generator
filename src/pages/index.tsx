import React from 'react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { Grid, Button, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { Seo, Hero, Lazy } from '../components';
import { FC } from '../util';

const useStyles = makeStyles((theme: Theme) => ({
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const IndexPage: FC = ({ pageContext, data }) => {
  console.log('page context', pageContext);
  console.log('graph ql data', data);

  const styles = useStyles();

  return (
    <>
      <Seo title="Home" />
      <Lazy type="grow" delay={500} timeout={1000} mountOnEnter unmountOnExit>
        <Hero
          title="Hi people"
          description="Welcome to your new Gatsby site. Now go build something great with
          Typescript and Material-ui."
        >
          <div className={styles.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Lazy type="slide" direction="left" delay={500}>
                  <Button
                    component={GatsbyLink}
                    to="/page-two/"
                    variant="contained"
                    color="primary"
                  >
                    Go to page 2
                  </Button>
                </Lazy>
              </Grid>
            </Grid>
          </div>
        </Hero>
      </Lazy>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allFile {
      edges {
        node {
          name
          relativePath
        }
      }
    }
  }
`;
