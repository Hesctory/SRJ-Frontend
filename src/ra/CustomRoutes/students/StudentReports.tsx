import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import {
  HubButton,
  HubButtonDescription,
  HubButtonTitle,
} from "../../../presentation/components/HubButton";
import { HubLayout } from "../../../presentation/components/HubLayout";

export const StudentReports = () => (
  <HubLayout title="Reportes de Estudiantes">
    <HubButton icon={<HowToRegIcon />} url="/enrolled-students-report">
      <HubButtonTitle>Estudiantes Matriculados</HubButtonTitle>
      <HubButtonDescription>
        Consulta el listado de estudiantes actualmente matriculados, con sus
        datos de grado y sección.
      </HubButtonDescription>
    </HubButton>
    <HubButton
      icon={<AssignmentIndIcon />}
      url="/students/reports/registration"
    >
      <HubButtonTitle>Ficha de Matrícula</HubButtonTitle>
      <HubButtonDescription>
        Genera e imprime la ficha de inscripción oficial de un estudiante con
        todos sus datos personales.
      </HubButtonDescription>
    </HubButton>
  </HubLayout>
);
