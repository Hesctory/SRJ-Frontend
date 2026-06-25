import { Suspense, type ReactNode } from "react";
import {
  AppBar,
  Sidebar,
  Notification,
  Loading,
  CheckForApplicationUpdate,
  TitlePortal,
  UserMenu,
} from "react-admin";
import { Box } from "@mui/material";
import { MyMenu } from "./MyMenu";

/**
 * Light, slim appbar that sits ONLY above the content column (not over the
 * sidebar). `position="static"` keeps it in normal flow inside the content
 * column so the full-height sidebar owns the left edge.
 *
 * The title slot is forced to dark text: a few resources pass inline white-
 * styled `title` spans (meant for the old dark appbar); the `!important` rule
 * keeps them legible on this light bar without editing those resources.
 */
const MyAppBar = () => (
  <AppBar
    color="inherit"
    position="static"
    elevation={0}
    userMenu={<UserMenu />}
    sx={{
      backgroundColor: "background.paper",
      color: "text.primary",
      borderBottom: "1px solid",
      borderColor: "divider",
      "& #react-admin-title, & #react-admin-title *": {
        color: "#1b2430 !important",
      },
    }}
  >
    <TitlePortal />
  </AppBar>
);

/**
 * Inverted shell. RA's default Layout stacks the appbar on top (full width) and
 * clips the sidebar height below it. Here the dark sidebar spans the full height
 * on the left, and a content column (appbar + scrollable main) fills the rest.
 */
export const MyLayout = ({ children }: { children: ReactNode }) => (
  <Box
    sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}
  >
    <Sidebar appBarAlwaysOn>
      <MyMenu />
    </Sidebar>

    <Box
      sx={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}
    >
      <MyAppBar />
      <Box
        component="main"
        id="main-content"
        sx={{
          flex: 1,
          minWidth: 0,
          p: 3,
          overflow: "auto",
        }}
      >
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Box>
    </Box>

    <Notification />
    <CheckForApplicationUpdate />
  </Box>
);
