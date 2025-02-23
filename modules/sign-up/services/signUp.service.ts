import { baseURL } from '@/shared/api/path';
import * as SecureStore from 'expo-secure-store';

// Este serviço foi criado com fetch api exclusivamente para o envio de arquivos

async function useSignUpService(formData: FormData) {
    const token = SecureStore.getItem('userToken');
    try {
        await fetch(baseURL + "/register", {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`
            },
        });

        return;
    } catch (error) {
        console.error("Error ao registrar usuário(a).", error);
    }
}

export { useSignUpService }