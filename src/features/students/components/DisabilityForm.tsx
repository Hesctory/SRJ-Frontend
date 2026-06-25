import {
  BooleanInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from "react-admin";
import { useWatch } from "react-hook-form";

const DisabilityForm = () => {
  const hasDisability = useWatch({ name: "hasDisability" });
  const hasDisabilityCertificate = useWatch({
    name: "hasDisabilityCertificate",
  });

  return (
    <>
      <BooleanInput source="hasDisability" label="Tiene discapacidad" />
      <BooleanInput
        source="hasDisabilityCertificate"
        label="Tiene certificado de discapacidad"
        disabled={!hasDisability}
      />
      <ReferenceInput source="disabilityTypeId" reference="disability-types">
        <SelectInput
          label="Tipo de discapacidad"
          disabled={!hasDisability}
          optionText="type"
        />
      </ReferenceInput>
      <ReferenceInput
        source="disabilityDegreeId"
        reference="disability-degrees"
      >
        <SelectInput
          label="Grado de discapacidad"
          disabled={!hasDisability}
          optionText="degree"
        />
      </ReferenceInput>
      <TextInput
        source="disabilityCertificateNumber"
        label="Número de certificado de discapacidad"
        disabled={!hasDisability || !hasDisabilityCertificate}
      />
    </>
  );
};

export default DisabilityForm;
