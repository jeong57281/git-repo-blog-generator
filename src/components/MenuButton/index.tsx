import React from 'react';
import { MenuButtonLayout } from './Styles';

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MenuButton({ isOpen, setIsOpen }: MenuButtonProps) {
  return (
    <MenuButtonLayout isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <div />
      <div />
      <div />
    </MenuButtonLayout>
  );
}

export default MenuButton;
