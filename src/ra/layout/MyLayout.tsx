import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { MyMenu } from "./MyMenu";

export const MyLayout = ({ children }: { children: ReactNode }) => (
  <RALayout menu={MyMenu}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
