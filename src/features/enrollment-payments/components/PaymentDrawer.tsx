import { Box, Divider, Drawer, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Identifier } from "react-admin";
import { DrawerState, PaymentFormValues } from "@/types/payment";
import usePayment from "../hooks/usePayment";
import InstallmentsSummary from "./InstallmentsSummary";
import PaymentForm from "./PaymentForm";
import PaymentPlanModal from "./PaymentPlanModal";

interface PaymentDrawerProps {
  drawerState: DrawerState;
  enrollmentId: Identifier;
  onClose: () => void;
  onPaymentConfirmed: () => void;
}

const DRAWER_WIDTH = 480;

const DrawerTitle: Record<NonNullable<DrawerState["mode"]>, string> = {
  pay: "Registrar pago",
  details: "Detalles de deuda",
  quickPay: "Pago rápido",
};

const PaymentDrawer = ({
  drawerState,
  enrollmentId,
  onClose,
  onPaymentConfirmed,
}: PaymentDrawerProps) => {
  const { open, mode, debtId } = drawerState;
  const {
    previewData,
    isPreviewing,
    isConfirming,
    preview,
    confirm,
    resetPreview,
  } = usePayment(enrollmentId);

  const handleFormSubmit = (values: PaymentFormValues) => {
    preview(values, debtId ?? undefined);
  };

  const handleConfirm = async () => {
    await confirm();
    onPaymentConfirmed();
    onClose();
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, p: 3 } }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h6">{mode ? DrawerTitle[mode] : ""}</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" flexDirection="column" gap={3} overflow="auto">
          {(mode === "pay" || mode === "quickPay") && (
            <PaymentForm
              onSubmit={handleFormSubmit}
              submitting={isPreviewing}
            />
          )}

          {(mode === "pay" || mode === "details") && debtId !== null && (
            <InstallmentsSummary debtId={debtId} />
          )}
        </Box>
      </Drawer>

      <PaymentPlanModal
        open={previewData !== null}
        plan={previewData?.paymentPlan ?? null}
        onCancel={resetPreview}
        onConfirm={handleConfirm}
        isConfirming={isConfirming}
      />
    </>
  );
};

export default PaymentDrawer;
