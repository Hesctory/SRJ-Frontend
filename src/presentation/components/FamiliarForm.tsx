import { BooleanInput, DateInput, ReferenceInput, SelectInput, TextInput, required } from "react-admin";
import { Box } from "@mui/material";
import LocationFormSelector from "./LocationFormSelector";
import SecondLanguagesFormSelector from "./SecondLanguagesFormSelector";

interface FamiliarFormProps {
    sourcePrefix?: string;
}

const FamiliarForm = ({ sourcePrefix }: FamiliarFormProps) => {
    const base = sourcePrefix ? `${sourcePrefix}.` : "";

    return (
        <>
            <Box display="flex" gap={2} width="100%">
                <TextInput source={`${base}names`} label="Nombre(s)" isRequired validate={required()} />
                <TextInput source={`${base}paternalLastname`} label="Apellido Paterno" isRequired validate={required()} />
                <TextInput source={`${base}maternalLastname`} label="Apellido Materno" isRequired validate={required()} />
            </Box>

            <ReferenceInput source={`${base}genderId`} reference="genders">
                <SelectInput label="Sexo" isRequired validate={required()} />
            </ReferenceInput>

            <DateInput source={`${base}birthDate`} label="Fecha de Nacimiento (DD/MM/AAAA)" isRequired validate={required()} />

            <Box display="flex" gap={2} width="100%">
                <ReferenceInput source={`${base}documentTypeId`} reference="document-types">
                    <SelectInput label="Tipo de Documento de Identidad" isRequired validate={required()} />
                </ReferenceInput>
                <TextInput source={`${base}idDocumentNumber`} label="Número de Documento de Identidad" isRequired validate={required()} />
            </Box>

            <ReferenceInput source={`${base}nativeLanguageId`} reference="languages">
                <SelectInput label="Lengua Materna" isRequired validate={required()} />
            </ReferenceInput>
            <SecondLanguagesFormSelector sourcePrefix={sourcePrefix} />

            <ReferenceInput source={`${base}ethnicSelfIdentificationId`} reference="ethnic-self-identifications">
                <SelectInput label="Autoidentificación Étnica" />
            </ReferenceInput>

            <ReferenceInput source={`${base}civilStateId`} reference="civil-states">
                <SelectInput label="Estado Civil" />
            </ReferenceInput>
            <ReferenceInput source={`${base}religionId`} reference="religions">
                <SelectInput label="Religión" />
            </ReferenceInput>

            <Box display="flex" gap={2} width="100%">
                <ReferenceInput source={`${base}levelOfEducationId`} reference="level-of-educations">
                    <SelectInput label="Nivel de Instrucción" isRequired validate={required()}/>
                </ReferenceInput>
                <TextInput source={`${base}occupation`} label="Ocupación" />
                <TextInput source={`${base}workCenter`} label="Centro de Trabajo" />
            </Box>

            <ReferenceInput source={`${base}relationshipId`} reference="familiar-relationship-types">
                <SelectInput label="Relación con el NNA" isRequired validate={required()} />
            </ReferenceInput>

            <TextInput source={`${base}address`} label="Domicilio" isRequired validate={required()} />
            <Box display="flex" gap={2} width="100%">
                <LocationFormSelector sourcePrefix={sourcePrefix ? `${sourcePrefix}.addressLocation` : "addressLocation"} />
            </Box>
            <Box display="flex" gap={2} alignItems="center">
                <BooleanInput source={`${base}lives`} label="Vive" />
                <BooleanInput source={`${base}livesWithStudent`} label="Vive con el NNA" />
            </Box>

            <TextInput source={`${base}landlinePhone`} label="Teléfono Fijo" />
            <TextInput source={`${base}cellPhone`} label="Número de Teléfono Celular" />
            <TextInput source={`${base}email`} label="Correo Electrónico" />
        </>
    );
};

export default FamiliarForm;
