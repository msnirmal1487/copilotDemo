import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/router";
import { useEffect } from "react";


const home = () => {
    const router = useRouter();
    const { user, setUser } = useUser();
    
    return (
        <div>
            <Header />
            <h1>Home</h1>
            {user && <p>Welcome {user.name}</p>}
            {user && <p>{user.id}</p>}
            {user && <p>{user.email}</p>}
            <Footer />
        </div>
    );
};

export default home;