import { useState } from "react";
import { Identifier } from "react-admin";
import { DrawerState } from "../../types/payment";

const CLOSED: DrawerState = { open: false, mode: null, debtId: null };

const usePaymentDrawer = () => {
  const [drawerState, setDrawerState] = useState<DrawerState>(CLOSED);

  const openPay = (debtId: Identifier) =>
    setDrawerState({ open: true, mode: "pay", debtId });

  const openDetails = (debtId: Identifier) =>
    setDrawerState({ open: true, mode: "details", debtId });

  const openQuickPay = () =>
    setDrawerState({ open: true, mode: "quickPay", debtId: null });

  const closeDrawer = () => setDrawerState(CLOSED);

  return { drawerState, openPay, openDetails, openQuickPay, closeDrawer };
};

export default usePaymentDrawer;
