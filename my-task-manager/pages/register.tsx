import Footer from "@/components/Footer";
import { Typography, TextField, Card, CardContent, Button } from "@mui/material";
import router from "next/router";
import { useEffect, useState } from "react";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmationError, setPasswordConfirmationError] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [isNameDirty, setIsNameDirty] = useState(false);
    const [isEmailDirty, setIsEmailDirty] = useState(false);
    const [isPasswordDirty, setIsPasswordDirty] = useState(false);
    const [isPasswordConfirmationDirty, setIsPasswordConfirmationDirty] = useState(false);


    const isNameValid = (name: string) => {
        return name.length >= 2;
    }

    const checkName = (name: string) => {
        if (!isNameValid(name)) {
            setNameError("Name must be at least 2 characters");
            return false;
        } else {
            setNameError("");
            return true;
        }
    }

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@][^\s@]+$/.test(email);
    };

    const checkEmail = (email: string) => {
        if (!isValidEmail(email)) {
            setEmailError("Please Enter a Valid Email");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    }

    const isValidPassword = (password: string) => {
        return password.length >= 6;
    };

    const checkPassword = (password: string) => {
        if (!isValidPassword(password)) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        } else {
            setPasswordError("");
            return true;
        }
    }

    const isValidPasswordConfirmation = (password: string, passwordConfirmation: string) => {
        return password === passwordConfirmation;
    };

    const checkPasswordConfirmation = (password: string, passwordConfirmation: string) => {
        if (!isValidPasswordConfirmation(password, passwordConfirmation)) {
            setPasswordConfirmationError("Confirm Password must match password");
            return false;
        } else {
            setPasswordConfirmationError("");
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
        console.log(name, value);
        // setName(prevState => ({ value }));

        switch (name) {
            case "name":
                setName(value);
                if (isNameDirty) {
                    checkName(value);
                }
                break;
            case "email":
                setEmail(value);
                if (isEmailDirty) {
                    checkEmail(value);
                }
                break;
            case "password":
                setPassword(value);
                if (isPasswordDirty) {
                    checkPassword(value);
                }
                break;
            case "passwordConfirmation":
                setPasswordConfirmation(value);
                if (isPasswordConfirmationDirty) {
                    checkPasswordConfirmation(password, value);
                }
                break;
            default:
                break;
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        console.log(name, value);
        // setName(prevState => ({ value }));

        switch (name) {
            case "name":
                checkName(value);
                setIsNameDirty(true);
                break;
            case "email":
                checkEmail(value);
                setIsEmailDirty(true);
                break;
            case "password":
                checkPassword(value);
                setIsPasswordDirty(true);
                break;
            case "passwordConfirmation":
                checkPasswordConfirmation(password, value);
                setIsPasswordConfirmationDirty(true);
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
                            error={Boolean(nameError)}
                            helperText={nameError}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            error={Boolean(emailError)}
                            helperText={emailError}
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
                            error={Boolean(passwordError)}
                            helperText={passwordError}
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
                            error={Boolean(passwordConfirmationError)}
                            helperText={passwordConfirmationError}
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