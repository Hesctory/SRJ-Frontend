import { Box, ButtonBase, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { ReactElement, ReactNode } from "react";
import React from "react";

interface HubButtonProps {
  icon: ReactElement;
  url: string;
  children: ReactNode;
}

export const HubButton = ({ icon, url, children }: HubButtonProps) => {
  const navigate = useNavigate();

  return (
    <ButtonBase
      onClick={() => navigate(url)}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        width: "100%",
        height: "100%",
        textAlign: "left",
        overflow: "hidden",
        justifyContent: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          pl: 2,
          pr: 2,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
        }}
      >
        {React.cloneElement(icon, {
          sx: { fontSize: "500%" },
        })}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          p: 2,
          gap: 0.5,
          flexGrow: 1,
          ".MuiButtonBase-root:hover &": {
            backgroundColor: "action.hover",
          },
        }}
      >
        {children}
      </Box>
    </ButtonBase>
  );
};

export const HubButtonTitle = ({ children }: { children: ReactNode }) => (
  <Typography variant="h4" fontWeight="bold">
    {children}
  </Typography>
);

export const HubButtonDescription = ({ children }: { children: ReactNode }) => (
  <Typography variant="body1" color="text.secondary">
    {children}
  </Typography>
);
