import * as React from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Card, CardContent, CardActionArea, Typography, Grid, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Route = createFileRoute('/')({
    component: HomeComponent,
});

function HomeComponent() {
    return (
        <Box className="p-4 flex flex-col items-center justify-center">
            <Typography variant="h4" component="h1" gutterBottom>
                Welcome To Customer and Orders Management System
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid>
                    <Card>
                        <CardActionArea component={Link} to="/customers" sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <PeopleIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                                <Typography variant="h5" component="div">
                                    Customers
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid>
                    <Card>
                        <CardActionArea component={Link} to="/orders" sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center', py: 4 }}>
                                <ShoppingCartIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
                                <Typography variant="h5" component="div">
                                    Orders
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
