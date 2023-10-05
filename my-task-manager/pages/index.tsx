// import button and Typograpgy from mateiral ui
import { Button, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";


const home = () => {
    const router = useRouter();

    const handleLoginClick = () => {
        router.push('/login');
    }

    const handleRegisterClick = () => {
        router.push('/register');
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ minWidth: 400, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} variant="outlined">
                <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography align="center" sx={{ fontSize: 24 }} color="secondary" gutterBottom>
                        Welcome to Task Manager
                    </Typography>
                    <Button variant="contained" onClick={handleLoginClick}>Login</Button>
                    <Button variant="outlined" onClick={handleRegisterClick}>Register</Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default home;