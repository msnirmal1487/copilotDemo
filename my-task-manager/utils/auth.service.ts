
export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export class AuthService {
  // ...
  async login(loginData: LoginData): Promise<User | undefined> {
    // make API call to login
    try {
        const response = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
        });
        
        if(!response.ok) {
            return undefined;
        } else {
            const user = await response.json();
            return user;
        }

    } catch (error) {
        return undefined;
    }
  }
  // ...
}