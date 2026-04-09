import { Datagrid, List, TextField } from "react-admin";

export const StudentsList = () => {
    
    return (
        <List>
            <Datagrid bulkActionButtons={false}>
                <TextField source="dni" label="DNI" sx={{ width: "15%" }} />
                <TextField source="fullName" label="Nombre Completo" sx={{ width: "65%" }} />
                <TextField source="studentCode" label="Código" sx={{ width: "20%" }} />
            </Datagrid>
        </List>
    );
}
