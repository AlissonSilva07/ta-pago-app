import { FIREBASE_AUTH } from "@/firebaseConfig"
import { useRouter } from "expo-router"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"

function useLogin() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)
    const auth = FIREBASE_AUTH
    
    async function logIn(email: string, password: string) {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            console.log(response)
            setLoading(false) 
            router.navigate("/(auth)")                       
        } catch (error: unknown) {
            console.log(error)
            setLoading(false)            
        }
    }

    async function signUp(email: string, password: string) {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log(response)
            setLoading(false)            
        } catch (error: unknown) {
            console.log(error)
            setLoading(false)            
        }
    }

    return {
        loading,
        logIn,
        signUp
    }
}

export { useLogin }