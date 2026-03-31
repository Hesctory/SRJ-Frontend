import { Datagrid, List, TextField, TextInput } from "react-admin";

const UsersList = () => {
    const usersFilters = [
        <TextInput source="name" label="Search by name" alwaysOn />,
        <TextInput source="email" label="Search by email" alwaysOn />,
    ];

    return(
        <List filters = {usersFilters} >
            <Datagrid>
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="email"/>
                <TextField source="password"/>
                <TextField source="role"/>
            </Datagrid>
        </List>
    )
}

export default UsersList;