import { Datagrid, List, ReferenceInput, SelectInput, TextField, TextInput } from "react-admin";

const studentsFilters = [
    <ReferenceInput key="schoolYearId" source="schoolYearId" reference="school-years" alwaysOn>
        <SelectInput label="Año Escolar" optionText="year" />
    </ReferenceInput>,
    <TextInput key="dni" source="dni" label="DNI" alwaysOn />,
    <TextInput key="fullName" source="fullName" label="Nombre" alwaysOn />,

];

export const StudentsList = () => {

    return (
        <List filters={studentsFilters} debounce={500}>
            <Datagrid bulkActionButtons={false}
            
            sx={{
                '& .column-dni': { width: '15%' },
                '& .column-fullName': { width: '85%' },
            }}>
                <TextField source="dni" label="DNI" />
                <TextField source="fullName" label="Nombre Completo" />
            </Datagrid>
        </List>
    );
}
