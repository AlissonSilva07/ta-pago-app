import { FIREBASE_AUTH, FIREBASE_DB } from "@/firebaseConfig"
import { useRouter } from "expo-router"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { useState } from "react"
import { ref, set, get } from 'firebase/database';
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useUserContext } from "@/contexts/user-context";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLoginSchema, LoginSchema } from "@/schemas/login.schema";
import { createSignupSchema, SignupSchema } from "@/schemas/signUp.schema";

function useLogin() {
    const router = useRouter()
    const { userState } = useUserContext()
    const [loading, setLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH
    const database = FIREBASE_DB

    const loginForm = useForm<LoginSchema>({
        resolver: zodResolver(createLoginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const signUpForm = useForm<SignupSchema>({
        resolver: zodResolver(createSignupSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            profilePicture: ''
        },
    });

    async function logIn(data: LoginSchema) {
        setLoading(true)        
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            await getUserData()
            
            setLoading(false)
            router.navigate("/(auth)")
        } catch (error: unknown) {
            setLoading(false)
            Alert.alert('Erro', 'Email ou senha inválidos.')
        }
    }

    async function signUp(data: SignupSchema) {
        setLoading(true)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const userC = userCredential.user;

            let base64Image = null;
            if (data.profilePicture) {
                base64Image = await FileSystem.readAsStringAsync(data.profilePicture, {
                    encoding: FileSystem.EncodingType.Base64,
                });
            }

            const userRef = ref(FIREBASE_DB, `users/${userC.uid}`);
            await set(userRef, {
                email: userC.email,
                username: data.username,
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

    async function getUserData() {
        const user = auth.currentUser;

        if (user) {
            const uid = user.uid;
            const creationTime = user.metadata.creationTime;            

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
                            createdAt: creationTime
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

    async function logOut() {
        setLoading(true)
        try {
            await signOut(auth)
            setLoading(false)
            router.navigate("/login")
        } catch (error: unknown) {
            console.log(error)
            setLoading(false)
        }
    }

    return {
        loginForm,
        signUpForm,
        loading,
        logIn,
        signUp,
        logOut
    }
}

export { useLogin }
