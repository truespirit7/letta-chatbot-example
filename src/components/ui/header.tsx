import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="relative flex w-full min-w-0 cursor-default flex-col space-y-2 p-2">
      <span className="text-2xl font-bold">{title}</span>
    </div>
  );
};

export default Header;
