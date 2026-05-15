import { Datagrid, List, TextField, TextInput } from "react-admin";
import AcademicFilterSelector from "../../../../presentation/components/AcademicFilterSelector";

const studentsFilters = [
    <AcademicFilterSelector key="academic" alwaysOn />,
    <TextInput key="dni" source="dni" label="DNI" alwaysOn />,
    <TextInput key="fullName" source="fullName" label="Nombre" alwaysOn />,
];

export const StudentsList = () => (
    <List filters={studentsFilters} debounce={500}>
        <Datagrid
            bulkActionButtons={false}
            sx={{
                "& .column-dni": { width: "15%" },
                "& .column-fullName": { width: "85%" },
            }}
        >
            <TextField source="dni" label="DNI" />
            <TextField source="fullName" label="Nombre Completo" />
        </Datagrid>
    </List>
);
