import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
	return (
		<div className="space-y-2 relative flex w-full min-w-0 flex-col p-2 cursor-default">
			<span className="text-2xl font-bold">{title}</span>
		</div>
	);
};

export default Header;
