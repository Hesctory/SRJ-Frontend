import type { ReactNode } from "react";
import { Layout as RALayout, AppBar, CheckForApplicationUpdate } from "react-admin";
import { MyMenu } from "./MyMenu";

const MyAppBar = () => <AppBar color="primary" />;

export const MyLayout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyMenu} appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
