export interface LunchAssignment {
  id: number;
  personId: number;
  personFullName: string;
  enrollmentId: number | null;
  lunchId: number;
  lunchName: string | null;
  assignedDate: string;
  unitPrice: number;
  hasDebt: boolean;
  isSettled: boolean;
  debtPaidAmount: number | null;
  debtPaidDate: string | null;
  balanceDue: number;
  assignedById: number | null;
}

export interface CreateLunchAssignment {
  personId: number;
  lunchIds: number[];
  assignedDate: string;
  shiftId: number;
  amountPaid?: number | null;
}

export type PersonType = "student" | "staff" | "other";

export interface LunchDebtSummary {
  id: number;
  personFullName: string;
  personType: PersonType;
  unpaidCount: number;
  totalDebt: number;
  oldestUnpaidDate: string;
}

export interface RecordLunchPayment {
  personId: number;
  amount: number;
  date: string;
}

export interface LunchPaymentLine {
  assignmentId: number;
  assignedDate: string;
  lunchName: string | null;
  applied: number;
  remainingAfter: number;
  isSettled: boolean;
}

export interface LunchPaymentResult {
  lines: LunchPaymentLine[];
  totalAllocated: number;
  change: number;
}
