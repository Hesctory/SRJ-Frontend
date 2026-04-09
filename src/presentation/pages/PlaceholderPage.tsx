import { Card, CardContent, Typography } from "@mui/material";
import { Title } from "react-admin";

interface PlaceholderPageProps {
    title: string;
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
    <Card>
        <Title title={title} />
        <CardContent>
            <Typography variant="h5">{title}</Typography>
            <Typography color="text.secondary">En construcción</Typography>
        </CardContent>
    </Card>
);
