import React from 'react';
import { MenuButtonLayout } from './Styles';

interface MenuButtonProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuButton: React.FC<MenuButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <MenuButtonLayout isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
      <div></div>
      <div></div>
      <div></div>
    </MenuButtonLayout>
  );
};

export default MenuButton;
