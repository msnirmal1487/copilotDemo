
export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    uniqueIdString: string;
    createdAt: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
}

export class AuthService {
  
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

  async register(registerData: RegisterData): Promise<User | undefined> {
    // make API call to register
    try {
        const response = await fetch('http://localhost:3001/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registerData),
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

}