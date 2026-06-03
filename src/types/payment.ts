import { Identifier } from "react-admin";

export type DebtStatus =
  | "PENDING"
  | "PARTIALLY_PAID"
  | "OVERDUE"
  | "PAID"
  | "CANCELLED";

export type DrawerMode = "pay" | "details" | "quickPay";

export interface EnrollmentDebt {
  id: Identifier;
  enrollmentId: Identifier;
  description: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string;
  status: DebtStatus;
}

export interface DebtInstallment {
  id: Identifier;
  debtId: Identifier;
  amount: number;
  date: string;
  paymentMethodName: string;
  reference?: string;
}

export interface PaymentMethod {
  id: Identifier;
  name: string;
}

export interface PaymentPlanLine {
  debtId: Identifier;
  description: string;
  allocated: number;
  remaining: number;
}

export interface PaymentPlan {
  lines: PaymentPlanLine[];
  totalAllocated: number;
  change: number;
}

export interface PaymentPreviewResponse {
  previewToken: string;
  paymentPlan: PaymentPlan;
}

export interface PaymentConfirmResponse {
  id: Identifier;
  paymentPlan: PaymentPlan;
}

export interface PaymentFormValues {
  amount: number;
  paymentMethodId: Identifier;
  date: string;
}

export interface DrawerState {
  open: boolean;
  mode: DrawerMode | null;
  debtId: Identifier | null;
}
