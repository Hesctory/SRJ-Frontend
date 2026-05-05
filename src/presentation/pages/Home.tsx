import React from "react";
import { Container, Typography, Box, Button, Grid } from "@mui/material";
import { User } from "../../domain/entities/User";
import { modules, type Module } from "../../modules";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const userData: any = JSON.parse(localStorage.getItem("user") || "null");
  const user = User.fromJSON(userData);

  const handleModuleClick = (module: Module) => {
    // Save the selected module to localStorage
    localStorage.setItem("selectedModule", JSON.stringify(module));
    console.log(localStorage.getItem("token"));
    // Navigate to the module path
    navigate(module.path);
  };

  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ¡Bienvenido, {user.getName()}!
        </Typography>
        <Typography variant="body1">
          Has iniciado sesión correctamente.
        </Typography>
      </Box>

      <Grid
        container
        spacing={3}
        sx={{ maxWidth: "800px", mx: "auto", width: "100%" }}
      >
        {modules.map((module, index) => (
          <Grid size={{ xs: 12, sm: 6 }} key={index}>
            <Button
              onClick={() => handleModuleClick(module)}
              color="primary"
              variant="contained"
              fullWidth
              sx={{
                py: 3,
                fontSize: "1.25rem",
                fontWeight: "bold",
              }}
            >
              {module.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
