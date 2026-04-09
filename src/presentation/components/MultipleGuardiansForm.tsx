import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { RecordContextProvider, ReferenceField, useRecordContext } from "react-admin";
import GuardianForm from "./GuardianForm";

const RelationshipLabel = () => {
    const record = useRecordContext();
    return <>{record?.name ?? ""}</>;
};

interface GuardianAccordionSummaryProps {
    sourcePrefix: string;
}

const GuardianAccordionSummary = ({ sourcePrefix }: GuardianAccordionSummaryProps) => {
    const names = useWatch({ name: `${sourcePrefix}.names` });
    const paternalLastname = useWatch({ name: `${sourcePrefix}.paternalLastname` });
    const maternalLastname = useWatch({ name: `${sourcePrefix}.maternalLastname` });
    const relationshipId = useWatch({ name: `${sourcePrefix}.relationshipId` });

    const fullName = [names, paternalLastname, maternalLastname ].filter(Boolean).join(" ");

    return (
        <Typography>
            {relationshipId && (
                <Box component="span" sx={{ bgcolor: "primary.main", color: "primary.contrastText", px: 1, py: 0.25, borderRadius: 1, mr: 1 }}>
                    <RecordContextProvider value={{ id: relationshipId, relationshipId }}>
                        <ReferenceField source="relationshipId" reference="relationship-guardians" link={false}>
                            <RelationshipLabel />
                        </ReferenceField>
                    </RecordContextProvider>
                </Box>
            )}
            {fullName}
        </Typography>
    );
};

const MultipleGuardiansForm = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ 
                                                        control, 
                                                        name: "guardians",
                                                        rules: {
                                                            validate: (value) => 
                                                                (value && value.length > 0) || "Debe agregar al menos un apoderado"
                                                        }});

    return (
        <>
            {fields.map((field, index) => {
                const sourcePrefix = `guardians.${index}`;
                return (
                    <Accordion key={field.id} defaultExpanded={index === fields.length - 1}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <GuardianAccordionSummary sourcePrefix={sourcePrefix} />
                        </AccordionSummary>
                        <AccordionDetails>  
                            <GuardianForm sourcePrefix={sourcePrefix} />
                            <Box mt={1}>
                                <Button color="error" onClick={() => remove(index)}>
                                    Eliminar apoderado
                                </Button>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
            <Box mt={2}>
                <Button variant="outlined" onClick={() => append({})}>
                    Agregar apoderado
                </Button>
            </Box>
        </>
    );
};

export default MultipleGuardiansForm;
