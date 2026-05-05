import { BooleanInput, Create, DateInput, NumberInput, ReferenceInput, SelectInput, TabbedForm, TextInput, required } from "react-admin";
import CRUDToolBar from "../../../layout/CRUDToolBar";
import { EnrollButton } from "../../../CustomButtons/EnrollButton";
import { Box, Typography } from "@mui/material";
import LocationFormSelector from "../../../../presentation/components/LocationFormSelector";
import SecondLanguagesFormSelector from "../../../../presentation/components/SecondLanguagesFormSelector";
import DisabilityForm from "../../../../presentation/components/DisabilityForm";
import MultipleFamiliarsForm from "../../../../presentation/components/MultipleFamiliarsForm";
import { useFormState } from 'react-hook-form';

const DebugErrors = () => {
    const { errors } = useFormState();
    console.log("FORM ERRORS:", errors);
    return null;
};



export const StudentCreate = () => {
        return (
        <Create mutationMode="pessimistic">
            <TabbedForm defaultValues={{ familiars: [] }} toolbar={<CRUDToolBar><EnrollButton /></CRUDToolBar>}>
                <TabbedForm.Tab label="Datos Personales">

                    <Box display="flex" gap={2} width="100%">
                        <TextInput source="names" label="Nombres" isRequired validate={required()} />
                        <TextInput source="paternalLastname" label="Apellido Paterno" isRequired validate={required()} />
                        <TextInput source="maternalLastname" label="Apellido Materno" isRequired validate={required()} />
                    </Box>

                    <ReferenceInput source="genderId" reference="genders">
                        <SelectInput label="Sexo" isRequired validate={required()} />
                    </ReferenceInput>

                    <Box display="flex" gap={2} width="100%">
                        <ReferenceInput source="documentTypeId" reference="document-types">
                            <SelectInput label="Tipo de Documento" isRequired validate={required()} />
                        </ReferenceInput>
                        <TextInput source="idDocumentNumber" label="Número de Documento" isRequired validate={required()} />
                    </Box>

                    <ReferenceInput source="ethnicSelfIdentificationId" reference="ethnic-self-identifications">
                        <SelectInput label="Autoidentificación Étnica"  />
                    </ReferenceInput>
                    <Box display="flex" gap={2} width="100%" alignItems="flex-start">
                        <ReferenceInput source="nativeLanguageId" reference="languages">
                            <SelectInput label="Lengua Materna" isRequired validate={required()} />
                        </ReferenceInput>
                        <SecondLanguagesFormSelector />
                    </Box>

                    <ReferenceInput source="religionId" reference="religions">
                        <SelectInput label="Religión" />
                    </ReferenceInput>
                    <ReferenceInput source="civilStateId" reference="civil-states">
                        <SelectInput label="Estado Civil" />
                    </ReferenceInput>
                    <NumberInput source="siblings" label="Número de Hermanos" min={0} />

                    <Typography variant="caption" color="text.secondary">
                        Solo si el estudiante es mayor de edad:
                    </Typography>
                    <Box display="flex" gap={2} width="100%">
                        <TextInput source="cellphone" label="Celular" />
                        <TextInput source="landlinePhone" label="Teléfono fijo" />
                        <TextInput source="email" label="Correo electrónico" />
                    </Box>

                </TabbedForm.Tab>

                <TabbedForm.Tab label="Datos de Nacimiento">
                    <DateInput source="birthDate" label="Fecha de Nacimiento" isRequired validate={required()}/>
                    <ReferenceInput source="childbirthTypeId" reference="childbirth-types">
                        <SelectInput label="Tipo de Parto" />
                    </ReferenceInput>
                    <Box display="flex" gap={2} width="100%">
                        <LocationFormSelector sourcePrefix="birthLocation"/>
                    </Box>
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Domicilio">
                    <TextInput source="address" label="Dirección" isRequired validate={required()}/>
                    <Box display="flex" gap={2} width="100%">
                        <LocationFormSelector sourcePrefix="addressLocation"/>
                    </Box>
                    <BooleanInput
                        source="hasElectronicDevices"
                        label="Cuenta con dispositivos electrónicos"
                    />
                    <BooleanInput
                        source="hasInternetAccess"
                        label="Cuenta con acceso a internet"
                    />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Apoderados">
                    <MultipleFamiliarsForm />
                </TabbedForm.Tab>

                <TabbedForm.Tab label="Discapacidad">
                    <DisabilityForm />
                </TabbedForm.Tab>

                <DebugErrors/>
            </TabbedForm>
        </Create>
    );
}
