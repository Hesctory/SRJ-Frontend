import { ListGuesser, Resource } from "react-admin";

const EnrollStudent = () => {
    return (
        <>
            <Resource name="students" list={ListGuesser} />
        </>
    )
}

export default EnrollStudent;