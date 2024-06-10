// useNavbarToggle.js
import { useState } from 'react';

const useNavbarToggle = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return { isCollapsed, toggleNavbar };
};

export default useNavbarToggle;
