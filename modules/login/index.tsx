import { createLoginSchema, LoginSchema } from "@/modules/login/schemas/login.schema";
import { useAuthContext } from '@/shared/contexts/auth-context';
import { useUserContext } from "@/shared/contexts/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginInputInterface } from './interfaces/logIn.interface';
import { useLoginService } from './services/logIn.service';

function useLogin() {
    const router = useRouter()
    const { authState } = useAuthContext()
    const { userState, getUserState } = useUserContext()
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false)

    const loginForm = useForm<LoginSchema>({
        resolver: zodResolver(createLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const storeToken = async (token: string) => {
        const expirationTime = new Date().getTime() + 3600 * 1000;
        try {
            SecureStore.setItem('userToken', token);
            SecureStore.setItem('tokenExpiration', expirationTime.toString());
            router.replace('/(auth)');
        } catch (e) {
            console.error('Erro ao armazenar o token', e);
        }
    };

    async function handleLogin(data: LoginInputInterface) {
        setLoading(true)
        try {
            const result = await useLoginService.execute(data);
            authState?.setValue({
                token: result.token
            });
            getUserState()
            storeToken(result.token);
            setLoading(false)
        } catch (err: any) {
            console.error('Erro ao fazer login:', err);
            setLoading(false)
        }
    }

    async function handleLogout() {
        setIsOpenConfirmModal(true)
    }

    return {
        isOpenConfirmModal: {
            value: isOpenConfirmModal,
            set: setIsOpenConfirmModal
        },
        loginForm,
        loading,
        handleLogin,
        handleLogout
    }
}

export { useLogin };

