import { createContext, useContext } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";

type AuthContextType = {
    // remove ?
    user?: Models.User<Models.Preferences> | null;
    signup: (email: string, password: string, name: string) => Promise<string | null>;
    login: (email: string, password: string) => Promise<string | null>;
    logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const signup = async (email: string, password: string, name: string) => {
        try {
            const result = await account.create(
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

    const login = async (email: string, password: string) => {
        try {
            const result = await account.createEmailPasswordSession(
                email,
                password
            )
            return null;
        } catch (error) {
            if (error instanceof Error) {
                return error.message;
            }
            return "Login failed";
        }
    };
    return (
        <AuthContext.Provider value={{ signup, login }}>
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