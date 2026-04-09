import { useState } from "react";
import { Menu } from "react-admin";
import { modules } from "../../modules";
import SubMenu from './SubMenu';

export const MyMenu = () => {
  const [openStates, setOpenStates] = useState<{[key: number]: boolean}>({});

  return (
    <Menu>
      <Menu.DashboardItem />
      {modules.map((module) => {
        const isOpen = openStates[module.id] || false;
        const handleToggle = () => setOpenStates(prev => ({...prev, [module.id]: !prev[module.id]}));

        if (module.children && module.children.length > 0) {
          return (
            <SubMenu
              key={module.id}
              dense={false}
              handleToggle={handleToggle}
              icon={module.icon}
              isOpen={isOpen}
              name={module.name}
            >
              {module.children.map((child) => (
                <Menu.Item 
                  key={child.id} 
                  to={child.path} 
                  primaryText={child.name}
                  leftIcon={child.icon}
                />
              ))}
            </SubMenu>
          );
        }

        return (
          <Menu.Item
            key={module.id}
            to={module.path}
            primaryText={module.name}
            leftIcon={module.icon}
          />
        );
      })}
    </Menu>
  );
};
