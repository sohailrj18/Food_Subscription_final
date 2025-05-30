import { AuthPage, AuthProps } from "@refinedev/antd";

interface LoginFormValues {
    email: string;
    password: string;
}

export const Login: React.FC = () => {
    return (
        <AuthPage
            type="login"
            formProps={{
                initialValues: { email: "demo@refine.dev", password: "demodemo" } as LoginFormValues,
            }}
        />
    );
};