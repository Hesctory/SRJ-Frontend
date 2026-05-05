import { Datagrid, List, TextField } from "react-admin";
import { useNavigate } from "react-router-dom";

export const EnrollmentPaymentsList = () => {
  const navigate = useNavigate();

  const handleRowClick = (id: string | number): false => {
    navigate(`/enrollment-selector/${id}`);
    return false;
  };

  return (
    <List resource="students">
      <Datagrid bulkActionButtons={false} rowClick={handleRowClick}>
        <TextField source="dni" label="DNI" sx={{ width: "15%" }} />
        <TextField
          source="fullName"
          label="Nombre Completo"
          sx={{ width: "70%" }}
        />
        <TextField source="studentCode" label="Código" sx={{ width: "15%" }} />
      </Datagrid>
    </List>
  );
};
