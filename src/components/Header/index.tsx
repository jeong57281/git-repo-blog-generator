import React, { useState } from 'react';
import MenuButton from '@components/MenuButton';
import { HeaderLayout, HeaderSideBox, HeaderParagraph } from './Styles';

interface HeaderProps {
  repoName: string;
}

function Header({ repoName }: HeaderProps) {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderLayout>
      <HeaderSideBox>
        <MenuButton isOpen={isMenuOpen} setIsOpen={setMenuOpen} />
      </HeaderSideBox>

      <HeaderParagraph>{repoName}</HeaderParagraph>

      <HeaderSideBox />
    </HeaderLayout>
  );
}

export default Header;
