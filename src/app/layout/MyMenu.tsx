import { useState } from "react";
import { Menu, useSidebarState } from "react-admin";
import { Box, Typography } from "@mui/material";
import { modules } from "../../modules";
import SubMenu from "./SubMenu";
import logoSRJ from "../../../public/logoSRJ.png";

const BrandHeader = () => {
  const [open] = useSidebarState();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: open ? "flex-start" : "center",
        gap: 1.25,
        px: open ? 2.5 : 0,
        height: 56,
        mb: 1,
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        component="img"
        src={logoSRJ}
        alt="SRJ"
        sx={{
          width: 36,
          height: 36,
          flexShrink: 0,
          objectFit: "contain",
        }}
      />
      {open && (
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.95rem",
            letterSpacing: "0.02em",
            whiteSpace: "nowrap",
          }}
        >
          SRJ System
        </Typography>
      )}
    </Box>
  );
};

export const MyMenu = () => {
  const [openStates, setOpenStates] = useState<{ [key: number]: boolean }>({});

  return (
    <Menu>
      <BrandHeader />
      <Menu.DashboardItem />
      {modules.map((module) => {
        const isOpen = openStates[module.id] || false;
        const handleToggle = () =>
          setOpenStates((prev) => ({ ...prev, [module.id]: !prev[module.id] }));

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
