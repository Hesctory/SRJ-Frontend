import React from "react";
import { Box, Typography } from "@mui/material";
import { Title } from "react-admin";

interface HubLayoutProps {
    title: string;
    children?: React.ReactNode;
}

const getChildWrapperStyle = (index: number, count: number): object => {
    if (count === 2) return { gridColumn: "span 2" };
    if (count === 3 && index === 0) return { gridColumn: "span 2" };
    return {};
};

export const HubLayout = ({ title, children }: HubLayoutProps) => {
    const childArray = React.Children.toArray(children);
    const count = childArray.length;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "calc(100vh - 160px)" }}>
            <Title title={title} />
            <Typography variant="h5" gutterBottom>
                {title}
            </Typography>

            <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 0 }}>
                <Box sx={{ width: "100%", height: "50%" }}>
                    {count === 1 ? (
                        <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box sx={{ width: "100%", height: "100%" }}>
                                {childArray[0]}
                            </Box>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gridTemplateRows: "1fr 1fr",
                                gap: 5,
                                width: "100%",
                                height: "100%",
                                minHeight: 0,
                            }}
                        >
                            {childArray.map((child, index) => (
                                <Box key={index} sx={{ ...getChildWrapperStyle(index, count), minHeight: 0 }}>
                                    {child}
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
