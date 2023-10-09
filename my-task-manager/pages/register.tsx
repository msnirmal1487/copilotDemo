import Footer from "@/components/Footer";
import { Typography, TextField, Card, CardContent, Button } from "@mui/material";
import router from "next/router";
import { useEffect, useState } from "react";

interface ErrorData {
    error: string;
    isDirty: boolean;
}
export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const [nameErrorData, setNameErrorData] = useState<ErrorData>({ error: "", isDirty: false });
    const [emailErrorData, setEmailErrorData] = useState<ErrorData>({ error: "", isDirty: false });
    const [passwordErrorData, setPasswordErrorData] = useState<ErrorData>({ error: "", isDirty: false });
    const [passwordConfirmationErrorData, setPasswordConfirmationErrorData] = useState<ErrorData>({ error: "", isDirty: false });

    const [isFormValid, setIsFormValid] = useState(false);


    const isNameValid = (name: string) => {
        return name.length >= 2;
    }

    const checkName = (name: string) => {
        if (!isNameValid(name)) {
            setNameErrorData(prevState => ({ ...prevState, error: "Name must be at least 2 characters"}));
            return false;
        } else {
            setNameErrorData(prevState => ({ ...prevState, error: ""}));
            return true;
        }
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(email);
    };

    const checkEmail = (email: string) => {
        if (!isValidEmail(email)) {
            setEmailErrorData(prevState => ({ ...prevState, error: "Please Enter a Valid Email"}));
            return false;
        } else {
            setEmailErrorData(prevState => ({ ...prevState, error: ""}));
            return true;
        }
    }

    const isValidPassword = (password: string) => {
        return password.length >= 6;
    };

    const checkPassword = (password: string) => {
        if (!isValidPassword(password)) {
            setPasswordErrorData(prevState => ({ ...prevState, error: "Password must be at least 6 characters"}));
            return false;
        } else {
            setPasswordErrorData(prevState => ({ ...prevState, error: ""}));
            return true;
        }
    }

    const isValidPasswordConfirmation = (password: string, passwordConfirmation: string) => {
        return password === passwordConfirmation;
    };

    const checkPasswordConfirmation = (password: string, passwordConfirmation: string) => {
        if (!isValidPasswordConfirmation(password, passwordConfirmation)) {
            setPasswordConfirmationErrorData(prevState => ({ ...prevState, error: "Confirm Password must match password"}));
            return false;
        } else {
            setPasswordConfirmationErrorData(prevState => ({ ...prevState, error: ""}));
            return true;
        }
    }

    useEffect(() => {
        console.log('Register mount');
        setIsFormValid(isNameValid(name) && isValidEmail(email) && isValidPassword(password) && isValidPasswordConfirmation(password, passwordConfirmation));
        return () => {
            console.log('Register unmount');
        }
    }
        , [name, email, password, passwordConfirmation]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;


        switch (name) {
            case "name":
                setName(value);
                if (nameErrorData.isDirty) {
                    checkName(value);
                }
                break;
            case "email":
                setEmail(value);
                if (emailErrorData.isDirty) {
                    checkEmail(value);
                }
                break;
            case "password":
                setPassword(value);
                if (passwordErrorData.isDirty) {
                    checkPassword(value);
                }
                break;
            case "passwordConfirmation":
                setPasswordConfirmation(value);
                if (passwordConfirmationErrorData.isDirty) {
                    checkPasswordConfirmation(password, value);
                }
                break;
            default:
                break;
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        switch (name) {
            case "name":
                checkName(value);
                setNameErrorData(prevState => ({ ...prevState, isDirty: true }));
                break;
            case "email":
                checkEmail(value);
                setEmailErrorData(prevState => ({ ...prevState, isDirty: true }));
                break;
            case "password":
                checkPassword(value);
                setPasswordErrorData(prevState => ({ ...prevState, isDirty: true }));
                break;
            case "passwordConfirmation":
                checkPasswordConfirmation(password, value);
                setPasswordConfirmationErrorData(prevState => ({ ...prevState, isDirty: true }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('submit');
    }

    const handleGoBackClick = () => {
        router.push('/');
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} variant="outlined">

                <form onSubmit={handleSubmit}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>

                        <Typography variant="h4" align="center" gutterBottom>
                            Register
                        </Typography>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            name="name"
                            value={name}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={Boolean(nameErrorData.error)}
                            helperText={nameErrorData.error}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={Boolean(emailErrorData.error)}
                            helperText={emailErrorData.error}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            name="password"
                            value={password}
                            type="password"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={Boolean(passwordErrorData.error)}
                            helperText={passwordErrorData.error}
                        />
                        <TextField
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            name="passwordConfirmation"
                            value={passwordConfirmation}
                            type="password"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={Boolean(passwordConfirmationErrorData.error)}
                            helperText={passwordConfirmationErrorData.error}
                        />
                        <Button variant="contained" color="primary" type="submit" disabled={!isFormValid}>
                            Register
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
}