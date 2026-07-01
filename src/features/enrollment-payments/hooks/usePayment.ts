import { useState } from "react";
import { Identifier, useNotify, useRefresh } from "react-admin";
import { API_URL, httpClient } from "@/app/dataProvider";
import {
  PaymentConfirmResponse,
  PaymentFormValues,
  PaymentPreviewResponse,
} from "@/types/payment";

const usePayment = (enrollmentId: Identifier) => {
  const notify = useNotify();
  const refresh = useRefresh();

  const [previewData, setPreviewData] = useState<PaymentPreviewResponse | null>(
    null,
  );
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const preview = async (
    values: PaymentFormValues,
    debtId?: Identifier,
  ): Promise<void> => {
    setIsPreviewing(true);
    try {
      const body: Record<string, unknown> = {
        enrollmentId,
        amount: values.amount,
        paymentMethodId: values.paymentMethodId,
        date: values.date,
      };
      if (debtId !== undefined) body.enrollmentDebtId = debtId;

      const { json } = await httpClient(`${API_URL}/payment-preview`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      setPreviewData(json as PaymentPreviewResponse);
    } catch {
      notify("Error al generar el plan de pago", { type: "error" });
    } finally {
      setIsPreviewing(false);
    }
  };

  const confirm = async (): Promise<PaymentConfirmResponse | null> => {
    if (!previewData) return null;
    setIsConfirming(true);
    try {
      const { json } = await httpClient(`${API_URL}/payments`, {
        method: "POST",
        body: JSON.stringify({ previewToken: previewData.previewToken }),
      });
      notify("Pago registrado correctamente", { type: "success" });
      refresh();
      setPreviewData(null);
      return json as PaymentConfirmResponse;
    } catch {
      notify("Error al registrar el pago", { type: "error" });
      return null;
    } finally {
      setIsConfirming(false);
    }
  };

  const resetPreview = () => setPreviewData(null);

  return {
    previewData,
    isPreviewing,
    isConfirming,
    preview,
    confirm,
    resetPreview,
  };
};

export default usePayment;
