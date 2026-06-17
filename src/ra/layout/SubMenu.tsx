import * as React from "react";
import { ReactElement, ReactNode } from "react";
import {
  List,
  MenuItem,
  ListItemIcon,
  Typography,
  Collapse,
  Tooltip,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useTranslate, useSidebarState } from "react-admin";

interface Props {
  dense: boolean;
  handleToggle: () => void;
  icon: ReactElement;
  isOpen: boolean;
  name: string;
  children: ReactNode;
}

const SubMenu = (props: Props) => {
  const { handleToggle, isOpen, name, icon, children, dense } = props;
  const translate = useTranslate();

  const [sidebarIsOpen] = useSidebarState();

  const header = (
    <MenuItem
      dense={dense}
      onClick={handleToggle}
      sx={{
        color: "rgba(255,255,255,0.72)",
        borderRadius: 2,
        mx: 1,
        my: "2px",
        "&:hover": { backgroundColor: "rgba(255,255,255,0.08)", color: "#fff" },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40, color: "inherit" }}>
        {isOpen ? <ExpandMore /> : icon}
      </ListItemIcon>
      {sidebarIsOpen && (
        <Typography
          variant="inherit"
          color="inherit"
          noWrap
          sx={{ fontWeight: 500, flexGrow: 1 }}
        >
          {translate(name)}
        </Typography>
      )}
    </MenuItem>
  );

  return (
    <div>
      {sidebarIsOpen || isOpen ? (
        header
      ) : (
        <Tooltip title={translate(name)} placement="right">
          {header}
        </Tooltip>
      )}
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          dense={dense}
          component="div"
          disablePadding
          className="SubMenu"
          sx={{
            "& .MuiMenuItem-root": {
              transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
              paddingLeft: (theme) =>
                sidebarIsOpen ? theme.spacing(4) : theme.spacing(2),
            },
          }}
        >
          {children}
        </List>
      </Collapse>
    </div>
  );
};

export default SubMenu;
