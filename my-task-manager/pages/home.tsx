import { useUser } from "@/contexts/UserContext";

const home = () => {
    const { user, setUser } = useUser();
    return (
        <div>
            <h1>Home</h1>
            {user && <p>Welcome {user.name}</p>}
            {user && <p>{user.id}</p>}
            {user && <p>{user.email}</p>}
        </div>
    );
};

export default home;