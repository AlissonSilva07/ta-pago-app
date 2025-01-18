import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebaseConfig"
import { useRouter } from "expo-router"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { ref, set, get } from 'firebase/database';
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useUserContext } from "@/contexts/user-context";

function useLogin() {
    const router = useRouter()
    const { userState } = useUserContext()
    const [loading, setLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH
    const database = FIREBASE_DB

    async function logIn(email: string, password: string) {
        setLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password)
            await getUserData()
            
            setLoading(false)
            router.navigate("/(auth)")
        } catch (error: unknown) {
            console.error('Login failed:', error)
            setLoading(false)
            Alert.alert('Erro', 'Email ou senha inválidos.')
        }
    }

    async function signUp(email: string, password: string, username: string, profileImageUri: string) {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const userC = userCredential.user;

            let base64Image = null;
            if (profileImageUri) {
                base64Image = await FileSystem.readAsStringAsync(profileImageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            }

            const userRef = ref(FIREBASE_DB, `users/${userC.uid}`);
            await set(userRef, {
                email: userC.email,
                username: username,
                profilePicture: base64Image,
            });

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
            console.error('Error registering user:', error);
            Alert.alert('Registration Error', 'An error occurred during registration')
        }
    }

    const getUserData = async () => {
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;            

            const userRef = ref(database, 'users/' + uid);
            try {
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    userState?.setValue({
                        user: {
                            username: userData.username,
                            email: userData.email,
                            profilePicture: userData.profilePicture,
                        }
                    });

                    return userData;                    
                } else {
                    Alert.alert('Data Error', 'No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                Alert.alert('Data Fetch Error', 'An error occurred while fetching user data');
            }
        }
    };

    return {
        loading,
        logIn,
        signUp
    }
}

export { useLogin }
