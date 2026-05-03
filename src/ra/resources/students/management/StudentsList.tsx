import { Datagrid, List, TextField } from "react-admin";

export const StudentsList = () => {
    
    return (
        <List>
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
