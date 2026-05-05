import SchoolIcon from "@mui/icons-material/School";
import { HubButton, HubButtonTitle, HubButtonDescription } from "./HubButton";

export const TuitionsButton = () => (
  <HubButton icon={<SchoolIcon />} url="/enrollment-payments">
    <HubButtonTitle>Pensiones</HubButtonTitle>
    <HubButtonDescription>
      Registra, consulta y gestiona los pagos de pensiones escolares de cada
      estudiante por período
    </HubButtonDescription>
  </HubButton>
);
