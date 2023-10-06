import { useState } from 'react';
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { LoginData, AuthService } from '@/utils/auth.service';
import { useUser } from '@/contexts/UserContext';
import Footer from '@/components/Footer';

const authService = new AuthService();

const Login = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
    const [error, setError] = useState<string>('');
    const { user, setUser } = useUser();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setLoginData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!loginData.email || !loginData.password) {
            setError('Email and password are required');
            return;
        }

        // if success, redirect to home page
        const user = await authService.login(loginData);
        if (user) {
            setUser(user);
            router.push('/home');
        } else {
            setError('Login failed');
        }

    };

    const handleGoBackClick = () => {
        router.push('/');
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
                        {error && <Typography color="error">{error}</Typography>}
                        <Button variant="contained" color="primary" type="submit">
                            Login
                        </Button>
                        <Button variant="outlined" onClick={handleGoBackClick}>
                            Go Back
                        </Button>
                    </CardContent>
                </form>

            </Card>
            <Footer />
        </div>
    );
};

export default Login;