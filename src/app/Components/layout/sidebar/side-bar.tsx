import React from 'react';
import SideBarItem from './side-bar-item';

/**
 * サイドバー
 * @returns JSX
 */
const SideBar = () => {
  return (
    <div className="bg-blue-300 h-screen">
      <div>
        <ul className="p-2">
          <SideBarItem label="Projects" />
          <SideBarItem label="Menu Item 2" />
          <SideBarItem label="Menu Item 3" />
        </ul>
      </div>
    </div>
  );
}

export default SideBar;