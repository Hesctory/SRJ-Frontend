import { ReferenceInput, SelectInput, TextInput, required } from "react-admin";
import { Box } from "@mui/material";
import AcademicFormSelector from "./AcademicFormSelector";

interface EnrollmentFormInputsProps {
    sourcePrefix?: string;
}

const EnrollmentFormInputs = ({ sourcePrefix }: EnrollmentFormInputsProps) => {
    const base = sourcePrefix ? `${sourcePrefix}.` : "";

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <AcademicFormSelector sourcePrefix={sourcePrefix} />
            <ReferenceInput source={`${base}schoolFeeConceptId`} reference="school-fee-concepts">
                <SelectInput label="Concepto de Cobro" fullWidth isRequired validate={required()} />
            </ReferenceInput>
            <TextInput source={`${base}previousSchool`} label="Colegio Anterior" fullWidth />
        </Box>
    );
};

export default EnrollmentFormInputs;
