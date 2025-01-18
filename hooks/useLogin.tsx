import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebaseConfig"
import { useRouter } from "expo-router"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { ref, set } from 'firebase/database';
import { Alert } from "react-native";

function useLogin() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH
    const storage = FIREBASE_DB

    async function logIn(email: string, password: string) {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setLoading(false)
            router.navigate("/(auth)")
        } catch (error: unknown) {
            console.log(error)
            setLoading(false)
        }
    }

    async function signUp(email: string, password: string, username: string, profileImageUri: string) {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userC = userCredential.user;

            let base64Image = null;
            if (profileImageUri) {
                const response = await fetch(profileImageUri);
                const blob = await response.blob();
                base64Image = await blobToBase64(blob);
            }

            const userRef = ref(FIREBASE_DB, `users/${userC.uid}`);
            await set(userRef, {
                email: userC.email,
                username: username,
                profilePicture: base64Image,
            });

            setLoading(false)

            Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso', [
                {
                    text: 'Ok',
                    style: 'default',
                    onPress: () => router.navigate('/login')
                }
            ])
        } catch (error) {
            setLoading(false)
            console.error('Error registering user:', error);
            throw error;
        }
    }

    return {
        loading,
        logIn,
        signUp
    }
}

export { useLogin }

function blobToBase64(blob: Blob): any {
    throw new Error("Function not implemented.");
}
