
const fs = require('fs');

export interface UserFile {
    users: User[];
};

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface LoginData {
    email: string;
    password: string;
}

interface AuthService { 
    register(user: User): void;
    login(email: string, password: string): User | undefined;
}

export const authService: AuthService = {
    register,
    login
};

function readUsers(): UserFile {
    const data = fs.readFileSync('./server/users.json', 'utf8');
    const users = JSON.parse(data);
    return users;
};

function register(user: User): User | undefined {
    const userFile = readUsers();
    if (!userFile) {
        return undefined;
    }
    const users = userFile.users;
    // 
    const index = users.findIndex((u: User) => { return u.email === user.email; });
    if(index !== -1) {
        return undefined;
    }
    user.id = users.length + 1; 
    users.push(user);
    const data = JSON.stringify(userFile);
    fs.writeFileSync('./server/users.json', data);
    return user;
};

function login(email: string, password: string): User | undefined {
    const userFile = readUsers();
    console.log(userFile);
    if (!userFile) {
        return undefined;
    }
    const users = userFile.users;
    return users.find((user: User) => {
        return user.email === email && user.password === password;
    });
};