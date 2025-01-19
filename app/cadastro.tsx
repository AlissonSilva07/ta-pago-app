import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from 'react-native';
import { colors } from '@/styles/colors';
import * as ImagePicker from 'expo-image-picker';
import { Camera, Eye, EyeOffIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { CustomButton } from '@/components/button';
import { Input } from '@/components/input';
import { ThemedText } from '@/components/themedText';
import { useLogin } from '@/hooks/useLogin';
import { Controller } from 'react-hook-form';

const CadastroScreen = () => {
    const router = useRouter()
    const { signUpForm, loading, signUp } = useLogin()

    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisible = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePicture(result.assets[0].uri);
            signUpForm.setValue("profilePicture", result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContent}>
                <View style={styles.txtView}>
                    <ThemedText type='titleMedium'>Boas-Vindas! 🥳</ThemedText>
                    <ThemedText type='default'>Crie sua conta para começar:</ThemedText>
                </View>
                <View style={styles.inputView}>
                    <TouchableOpacity onPress={pickImage} style={styles.profilePictureView}>
                        {profilePicture ? (
                            <View style={styles.profilePictureView}>
                                <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
                                <ThemedText type='smallSecondary' style={{ textAlign: 'center' }}>Essa é sua foto de perfil. {'\n'}Clique novamente para mudar.</ThemedText>
                            </View>
                        ) : (
                            <View style={styles.profilePictureView}>
                                <View style={styles.profilePictureExample}>
                                    <Camera color={colors.primary} size={32} />
                                </View>
                                <ThemedText type='smallSecondary'>Escolha uma foto de perfil</ThemedText>
                            </View>
                        )}
                    </TouchableOpacity>
                    <View style={styles.inputView}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Nome:</ThemedText>
                            <ThemedText type="smallSecondary">{signUpForm.formState.errors.username?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="username"
                            control={signUpForm.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='Nome' value={value} onChangeText={onChange} />
                            )}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Email:</ThemedText>
                            <ThemedText type="smallSecondary">{signUpForm.formState.errors.email?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="email"
                            control={signUpForm.control}
                            render={({ field: { value, onChange } }) => (
                                <Input placeholder='E-mail' value={value} onChangeText={onChange} />
                            )}
                        />
                    </View>

                    <View style={styles.inputView}>
                        <View style={styles.inputFieldTop}>
                            <ThemedText type="smallMedium">Senha:</ThemedText>
                            <ThemedText type="smallSecondary">{signUpForm.formState.errors.password?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="password"
                            control={signUpForm.control}
                            render={({ field: { value, onChange } }) => (
                                <View style={styles.passwordView}>
                                    <Input placeholder='Senha' value={value} onChangeText={onChange} secureTextEntry={!isPasswordVisible} />
                                    {isPasswordVisible ? (
                                        <TouchableOpacity onPress={togglePasswordVisible} style={{ position: 'absolute', right: 12 }}>
                                            <EyeOffIcon color={colors.textSecondary} size={24} />
                                        </TouchableOpacity>
                                    ) : (
                                        <TouchableOpacity onPress={togglePasswordVisible} style={{ position: 'absolute', right: 12 }}>
                                            <Eye color={colors.textSecondary} size={24} />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonArea}>
                <View style={styles.buttonView}>
                    <CustomButton
                        title='Cadastrar'
                        onPress={signUpForm.handleSubmit(signUp)}
                        variant={loading ? 'disabled' : 'default'}
                        disabled={loading}
                        icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
                    />
                </View>
                <TouchableOpacity onPress={() => router.navigate('/login')}>
                    <ThemedText type='small' style={styles.txtLink}>Já tem uma conta? Faça Login.</ThemedText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

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
    profilePictureView: {
        width: '100%',
        alignItems: 'center',
        gap: 16
    },
    profilePicture: {
        height: 80,
        width: 80,
        borderRadius: 12,
    },
    profilePictureExample: {
        height: 80,
        width: 80,
        borderRadius: 12,
        backgroundColor: colors.textSecondary,
        justifyContent: 'center',
        alignItems: 'center'
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
});

export default CadastroScreen;