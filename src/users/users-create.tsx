import { Create, ReferenceInput, SimpleForm, TextInput } from "react-admin";

const UsersCreate = () => {
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput source = "id" reference="users"/>
                <TextInput source="name"/>
                <TextInput source="email"/>
                <TextInput source="password"/>
                
            </SimpleForm>
        </Create>
    )
}

export default UsersCreate;