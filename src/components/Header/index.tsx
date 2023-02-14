import React, { useState } from 'react';
import MenuButton from '@components/MenuButton';
import { HeaderLayout, HeaderSideBox, HeaderParagraph } from './Styles';

function Header() {
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
}

export default Header;
