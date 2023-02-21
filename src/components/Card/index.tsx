import React from 'react';
import { CardLayout, CardTitleParagraph } from './Styles';

interface CardProps {
  title?: string | undefined;
  maxWidth?: string | undefined;
  children: React.ReactElement;
}

function Card({ title, maxWidth = '100%', children }: CardProps) {
  return (
    <CardLayout maxWidth={maxWidth}>
      {title && <CardTitleParagraph>{title}</CardTitleParagraph>}
      {children}
    </CardLayout>
  );
}

export default Card;
