import { Create, SimpleForm } from "react-admin";
import { SectionFormFields, sectionTransform } from "./SectionFormFields";

export const SectionsCreate = () => (
    <Create redirect="list" transform={sectionTransform}>
        <SimpleForm>
            <SectionFormFields />
        </SimpleForm>
    </Create>
);
