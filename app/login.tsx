import { CustomButton } from "@/components/button"
import { Input } from "@/components/input"
import { ThemedText } from "@/components/themedText"
import { useLogin } from "@/hooks/useLogin"
import { colors } from "@/styles/colors"
import { useRouter } from "expo-router"
import { Eye, EyeOffIcon } from "lucide-react-native"
import { useState } from "react"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LoginScreen() {
    const router = useRouter()
    const { loading, logIn } = useLogin()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

    const onChangeEmail = (text: string) => {
        setEmail(text)
    }

    const onChangePassword = (text: string) => {
        setPassword(text)
    }

    const togglePasswordVisible = () => {
        setPasswordVisible(!isPasswordVisible)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContent}>
                <View style={styles.txtView}>
                    <ThemedText type='titleMedium'>Olá novamente! 😊</ThemedText>
                    <ThemedText type='default'>Entre com as suas credenciais de acesso:</ThemedText>
                </View>
                <View style={styles.inputView}>
                    <Input placeholder='E-mail' value={email} onChangeText={onChangeEmail} />
                    <View style={styles.passwordView}>
                        <Input placeholder='Senha' value={password} onChangeText={onChangePassword} secureTextEntry={!isPasswordVisible} />
                        {isPasswordVisible ?
                            <TouchableOpacity onPress={() => togglePasswordVisible()} style={{ position: 'absolute', right: 12 }}>
                                <EyeOffIcon color={colors.textSecondary} size={24} />
                            </TouchableOpacity> :
                            <TouchableOpacity onPress={() => togglePasswordVisible()} style={{ position: 'absolute', right: 12 }}>
                                <Eye color={colors.textSecondary} size={24} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <View style={styles.buttonView}>
                    <CustomButton 
                        title='Entrar' 
                        onPress={() => logIn(email, password)} 
                        variant={loading ? 'disabled' : 'default'}
                        disabled={loading}
                        icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
                    />
                </View>
                <TouchableOpacity onPress={() => router.navigate('/cadastro')}>
                    <ThemedText type='small' style={styles.txtLink}>Não possui login? Cadastre-se.</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 16,
        gap: 16
    },
    topContent: {
        width: '100%',
        flexDirection: 'column',
        gap: 32
    },
    txtView: {
        width: '100%',
        flexDirection: 'column',
        gap: 16
    },
    txtLink: {
        textAlign: 'center',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline'
    },
    inputView: {
        width: '100%',
        flexDirection: 'column',
        gap: 16
    },
    passwordView: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16
    },
    buttonArea: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16
    },
    buttonView: {
        width: '100%',
        flexDirection: 'column',
        height: 56,
    }
})