import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";
import { ToastAndroid } from "react-native";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isNewUser: boolean;
    setIsNewUser: (value: boolean) => void;
    signup: (email: string, password: string, name: string) => Promise<string | null>;
    login: (email: string, password: string) => Promise<string | null>;
    logout: () => Promise<void>;
    deleteAccount: (userPassword: string) => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isNewUser, setIsNewUser] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const getUser = async () => {
        try {
            setLoading(true);
            const user = await account.get();
            setLoading(false);
            setUser(user);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setUser(null);
        }
    }

    useEffect(() => {
        getUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            setLoading(true);
            try {
                await account.deleteSession("current");
            } catch (e) {
                console.log(e);
            }
            await account.createEmailPasswordSession(
                email,
                password
            )
            setLoading(false);
            await getUser();
            return null;
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
                console.log(error.message)
                return error.message;
            }
            console.log(error)
            return "Login failed";
        }
    };

    const signup = async (email: string, password: string, name: string) => {
        try {
            setLoading(true);
            console.log("account creating")
            await account.create(
                ID.unique(),
                email,
                password,
                name
            );
            console.log("account created, logging in")
            setLoading(false);
            await login(email, password);
            console.log("login successful")
            return null;
        } catch (error) {
            setLoading(false);
            if (error instanceof Error) {
                ToastAndroid.show(error.message, ToastAndroid.LONG);
                console.log(error.message);
                return error.message;
            }
            console.log("Signup failed")
            return "Signup failed";
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await account.deleteSession("current");
            setLoading(false);
            setUser(null);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    const deleteAccount = async (userPassword: string) => {
        try {
            const newMail = `${user?.$id}.${user?.email}`;
            await account.updateEmail(newMail, userPassword);
            await account.updateStatus();
            setUser(null);
        } catch (error) {
            ToastAndroid.show("Account deletion failed", ToastAndroid.LONG);
            console.log(error);
        }
    }

    return (
        <AuthContext.Provider value={{ loading, user, isNewUser, setIsNewUser, signup, login, logout, deleteAccount }}>
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
