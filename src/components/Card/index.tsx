import React from 'react';
import { CardLayout, CardTitleParagraph, CardContentBox } from './Styles';

interface CardProps {
  title?: string | undefined;
  maxWidth?: string | undefined;
  children: React.ReactElement;
}

function Card({ title, maxWidth = '100%', children }: CardProps) {
  return (
    <CardLayout maxWidth={maxWidth}>
      <CardContentBox>
        {title && <CardTitleParagraph>{title}</CardTitleParagraph>}
        {children}
      </CardContentBox>
    </CardLayout>
  );
}

export default Card;
