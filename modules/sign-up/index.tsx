import { createSignupSchema, SignupSchema } from "@/modules/sign-up/schemas/signUp.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useSignUpService } from "./services/signUp.service";

function useSignUp() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const signUpForm = useForm<SignupSchema>({
        resolver: zodResolver(createSignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
    });

    async function handleSignUp(data: SignupSchema) {
        setLoading(true)

        const formData = new FormData();
        data.profilePicture && formData.append('profilePicture', data.profilePicture);
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            await useSignUpService(formData)
            
            setLoading(false)

            Alert.alert('Sucesso!', 'Registro concluído com sucesso.', [
                {
                    text: 'Ok',
                    style: 'default',
                    onPress: () => router.navigate('/login')
                }
            ])
        } catch (error) {
            setLoading(false)
            console.error('Erro ao registrar usuário(a):', error);
            Alert.alert('Erro', 'Erro ao registrar usuário(a)')
        }
    }

    return {
        signUpForm,
        loading,
        handleSignUp,
    }
}

export { useSignUp };

