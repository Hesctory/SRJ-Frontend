import { Edit, SimpleForm } from "react-admin";
import { BackToListButton } from "../../../CustomButtons/BackToListButton";
import { SectionFormFields, sectionTransform } from "./SectionFormFields";

export const SectionsEdit = () => (
    <Edit actions={<BackToListButton />} transform={sectionTransform}>
        <SimpleForm>
            <SectionFormFields isEdit />
        </SimpleForm>
    </Edit>
);
