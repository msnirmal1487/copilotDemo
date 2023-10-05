import { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { LoginData, AuthService } from '@/utils/auth.service';

const Login = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(loginData);

        
        // if success, redirect to home page
        const authService = new AuthService();
        const user = await authService.login(loginData);
        if (user) {
            router.push('/home');
        } else {
            alert('Login failed');
        }

    };

    const handleGoBackClick = () => {
        router.back();
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} variant="outlined">

                <form onSubmit={handleSubmit} >
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>

                        <Typography variant="h4" align="center" gutterBottom>
                            Login
                        </Typography>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="email"
                            value={loginData.email}
                            onChange={handleInputChange}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            name="password"
                            type="password"
                            value={loginData.password}
                            onChange={handleInputChange}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                        <Button variant="outlined" onClick={handleGoBackClick}>
                            Go Back
                        </Button>
                    </CardContent>
                </form>

            </Card>
        </div>
    );
};

export default Login;