import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonSearch from "../../../../presentation/components/PersonSearch";

export const PersonSelectionPage = () => {
  const navigate = useNavigate();

  return (
    <Box p={2} sx={{ height: "calc(100vh - 64px)", boxSizing: "border-box" }}>
      <PersonSearch
        onSelect={(person) =>
          navigate(`/lunches/assignment/${person.id}?type=${person.kind}`)
        }
      />
    </Box>
  );
};
