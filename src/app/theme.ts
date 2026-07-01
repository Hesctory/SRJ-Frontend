import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";

/**
 * SRJ design system — "Slate + royal blue".
 *
 * The shell (sidebar) is a dark slate rail; blue (#2456d6) is reserved as the
 * *action / active* color, not a flooded surface. Surfaces are white on a soft
 * slate-tinted background. Everything below is global so resources stay untouched:
 * inputs, buttons, cards, filters and list toolbars all inherit from here.
 */

// Slate sidebar rail. Kept as a constant so the layout can reference the same value.
export const SIDEBAR_DARK = "#1b2430";

const BLUE = {
  main: "#2456d6",
  dark: "#1b44ad",
  light: "#5b82e3",
  contrastText: "#ffffff",
};

const palette = {
  mode: "light" as const,
  primary: BLUE,
  secondary: {
    main: "#475569",
    dark: "#334155",
    light: "#64748b",
    contrastText: "#ffffff",
  },
  info: BLUE,
  success: { main: "#16a34a", contrastText: "#ffffff" },
  warning: { main: "#d97706", contrastText: "#ffffff" },
  error: { main: "#dc2626", contrastText: "#ffffff" },
  background: {
    default: "#f2f4f7",
    paper: "#ffffff",
  },
  text: {
    primary: "#1b2430",
    secondary: "#5b6675",
    disabled: "#9aa4b2",
  },
  divider: "#e3e8ef",
};

// Soft, layered shadows instead of MUI's heavy default elevation.
const SOFT_SHADOW =
  "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.08)";

const FONT = "'Plus Jakarta Sans', sans-serif";

const customizations = {
  palette,
  shape: { borderRadius: 8 },
  // Balanced density: standard 8px base unit.
  spacing: 8,
  sidebar: {
    width: 248,
    closedWidth: 64,
  },
  typography: {
    fontFamily: FONT,
    // Clear hierarchy: tight, weighted headings down to calm body text.
    h1: {
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: "2rem",
      letterSpacing: "-0.02em",
    },
    h2: {
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: "1.6rem",
      letterSpacing: "-0.015em",
    },
    h3: {
      fontFamily: FONT,
      fontWeight: 700,
      fontSize: "1.35rem",
      letterSpacing: "-0.01em",
    },
    h4: { fontFamily: FONT, fontWeight: 600, fontSize: "1.15rem" },
    h5: { fontFamily: FONT, fontWeight: 600, fontSize: "1.05rem" },
    h6: { fontFamily: FONT, fontWeight: 600, fontSize: "1rem" },
    subtitle1: { fontFamily: FONT, fontWeight: 600 },
    subtitle2: {
      fontFamily: FONT,
      fontWeight: 600,
      color: palette.text.secondary,
    },
    body1: { fontFamily: FONT, fontSize: "0.9rem" },
    body2: { fontFamily: FONT, fontSize: "0.85rem" },
    button: {
      fontFamily: FONT,
      fontWeight: 600,
      textTransform: "none" as const,
      letterSpacing: 0,
    },
  },
  components: {
    // --- Buttons (RA Create/Export/Save/Filter + MUI buttons everywhere) ---
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none" as const,
          fontWeight: 600,
          letterSpacing: 0,
          paddingInline: 14,
        },
        contained: {
          boxShadow: SOFT_SHADOW,
          "&:hover": { boxShadow: SOFT_SHADOW },
        },
        sizeSmall: { paddingInline: 10 },
        sizeLarge: { paddingInline: 18, paddingBlock: 8 },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 8 } },
    },

    // --- Inputs: modern outlined boxes instead of RA's default filled underline ---
    MuiTextField: {
      defaultProps: { variant: "outlined" as const, size: "small" as const },
    },
    MuiFormControl: {
      defaultProps: { variant: "outlined" as const, size: "small" as const },
    },
    MuiSelect: { defaultProps: { variant: "outlined" as const } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundColor: "#ffffff",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.divider,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary.light,
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: palette.primary.main,
            borderWidth: 1.5,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: { "&.Mui-focused": { color: palette.primary.main } },
      },
    },

    // --- Cards & surfaces ---
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: "none" },
        rounded: { borderRadius: 12 },
        elevation1: { boxShadow: SOFT_SHADOW },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: `1px solid ${palette.divider}`,
          boxShadow: SOFT_SHADOW,
          backgroundImage: "none",
        },
      },
    },

    // --- App bar: light, slim, hairline bottom border (no heavy shadow) ---
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "none" } },
    },

    // --- Sidebar: full-height dark slate rail ---
    RaSidebar: {
      styleOverrides: {
        root: {
          height: "100vh",
          marginTop: 0,
          "& .RaSidebar-fixed": {
            height: "100vh",
            top: 0,
            backgroundColor: SIDEBAR_DARK,
          },
          "& .MuiPaper-root": {
            backgroundColor: SIDEBAR_DARK,
            border: "none",
          },
        },
      },
    },
    RaMenu: {
      styleOverrides: { root: { backgroundColor: "transparent" } },
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          color: "rgba(255,255,255,0.72)",
          borderRadius: 8,
          margin: "2px 8px",
          paddingTop: 8,
          paddingBottom: 8,
          borderLeft: "3px solid transparent",
          "& .RaMenuItemLink-icon": { color: "inherit", minWidth: 40 },
          "&:hover": { backgroundColor: "rgba(255,255,255,0.08)" },
          "&.RaMenuItemLink-active": {
            color: "#fff",
            fontWeight: 600,
            backgroundColor: "rgba(36,86,214,0.22)",
            borderLeft: `3px solid ${palette.primary.main}`,
            "& .RaMenuItemLink-icon": { color: "#fff" },
          },
        },
      },
    },

    // --- List action toolbar + filters: spacing & alignment ---
    RaTopToolbar: {
      styleOverrides: {
        root: {
          alignItems: "center",
          gap: 8,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: { "& .RaList-main": { gap: 8 } },
      },
    },
    RaFilterForm: {
      styleOverrides: {
        root: { gap: 4 },
      },
    },
    // --- Tables: compact density (EXPERIMENTAL — recommendation #5) ---
    // Tighter rows so admins scan more records per screen, plus a sticky,
    // shaded header so column labels stay visible on long lists. RA Datagrid
    // renders size="small" cells, so the padding override lands on every list.
    // Delete this whole block to revert tables to RA/MUI defaults.
    MuiTableCell: {
      styleOverrides: {
        sizeSmall: { paddingTop: 4, paddingBottom: 4 },
        head: {
          position: "sticky" as const,
          top: 0,
          zIndex: 2,
          backgroundColor: "#f8fafc",
          fontWeight: 600,
          color: palette.text.secondary,
        },
      },
    },
  },
};

export const theme = createTheme(deepmerge(defaultTheme, customizations));
