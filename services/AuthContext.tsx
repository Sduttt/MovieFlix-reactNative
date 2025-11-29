import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isNewUser: boolean;
    setIsNewUser: (value: boolean) => void;
    signup: (email: string, password: string, name: string) => Promise<string | null>;
    login: (email: string, password: string) => Promise<string | null>;
    logout: () => Promise<void>;
    deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);

    const getUser = async () => {
        try {
            const user = await account.get();
            setUser(user);
        } catch (error) {
            console.log(error);
            setUser(null);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            try {
                await account.deleteSession("current");

            } catch (e) {
                console.log(e);
            }
            await account.createEmailPasswordSession(
                email,
                password
            )
            await getUser();
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "Login failed";
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            await login(email, password);
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "Signup failed";
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession("current");
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteAccount = async () => {
        try {
            await account.updateStatus();
            setUser(null);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ user, isNewUser, setIsNewUser, signup, login, logout, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
