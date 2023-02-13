import React, { useState } from 'react';
import { HeaderLayout, HeaderSideBox, HeaderParagraph } from './Styles';
import MenuButton from '@components/MenuButton';

const Header: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderLayout>
      <HeaderSideBox>
        <MenuButton isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
      </HeaderSideBox>
      <HeaderParagraph>제목</HeaderParagraph>
      <HeaderSideBox />
    </HeaderLayout>
  );
};

export default Header;
