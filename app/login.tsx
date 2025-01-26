import { CustomButton } from "@/components/button"
import { Input } from "@/components/input"
import { ThemedText } from "@/components/themedText"
import { useLogin } from "@/hooks/useLogin"
import { colors } from "@/styles/colors"
import { useRouter } from "expo-router"
import { Eye, EyeOffIcon } from "lucide-react-native"
import { useState } from "react"
import { Controller } from "react-hook-form"
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function LoginScreen() {
    const router = useRouter()
    const { loading, loginForm, logIn } = useLogin()

    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false)

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
                    <View style={styles.inputFieldTop}>
                        <ThemedText type="smallMedium">Usuário:</ThemedText>
                        <ThemedText type="smallSecondary">{loginForm.formState.errors.email?.message!}</ThemedText>
                    </View>
                    <Controller
                        name="email"
                        control={loginForm.control}
                        render={({ field: { value, onChange } }) => (
                            <Input placeholder='E-mail' autoCapitalize="none" multiline={false} numberOfLines={1} value={value} onChangeText={onChange} />
                        )}
                    />
                </View>
                <View style={styles.inputView}>
                    <View style={styles.inputFieldTop}>
                        <ThemedText type="smallMedium">Senha:</ThemedText>
                        <ThemedText type="smallSecondary">{loginForm.formState.errors.password?.message!}</ThemedText>
                    </View>
                    <View style={styles.passwordView}>
                        <Controller
                            name="password"
                            control={loginForm.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='Senha' autoCapitalize="none" multiline={false} numberOfLines={1} value={value} onChangeText={onChange} secureTextEntry={!isPasswordVisible} />
                            )}
                        />
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
                        onPress={loginForm.handleSubmit(logIn)}
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
        gap: 16
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
    },
    inputFieldTop: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})