import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

import { FC } from '../../util';

type MetaProperty = {
    property: string;
    content: string;
};

type MetaName = {
    name: string;
    content: string;
};

type Meta = MetaName | MetaProperty;

export interface SEOProps {
    title: string;
    description?: string;
    lang?: string;
    meta?: Meta[];
}

const SEO: FC<SEOProps> = (props) => {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author {
                            name
                        }
                    }
                }
            }
        `
    );

    const metaDescription = props.description || site.siteMetadata.description;

    return (
        <Helmet
            htmlAttributes={{
                lang: props.lang || 'en'
            }}
            title={props.title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription
                },
                {
                    property: `og:title`,
                    content: props.title
                },
                {
                    property: `og:description`,
                    content: metaDescription
                },
                {
                    property: `og:type`,
                    content: `website`
                },
                {
                    name: `twitter:card`,
                    content: `summary`
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author.name
                },
                {
                    name: `twitter:title`,
                    content: props.title
                },
                {
                    name: `twitter:description`,
                    content: metaDescription
                }
            ].concat(props.meta || [])}
        />
    );
};

export default SEO;
