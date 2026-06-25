import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonSearch from "@/features/lunches/components/PersonSearch";

export const LunchesQueries = () => {
  const navigate = useNavigate();

  return (
    <Box p={2} sx={{ height: "calc(100vh - 64px)", boxSizing: "border-box" }}>
      <PersonSearch
        onSelect={(person) =>
          navigate(`/lunches/queries/${person.id}?type=${person.kind}`)
        }
      />
    </Box>
  );
};
