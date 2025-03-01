import { CustomButton } from '@/components/button';
import { Input } from '@/components/input';
import ModalLayout from '@/components/modal';
import { ThemedText } from '@/components/themedText';
import { useSignUp } from '@/modules/sign-up';
import { colors } from '@/styles/colors';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Camera, Eye, EyeOffIcon, ThumbsUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { ActivityIndicator, Image, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface Arquivo {
    uri: string,
    type: string,
    name: string,
}

const CadastroScreen = () => {
    const router = useRouter()
    const { handleSignUp, loading, signUpForm, isOpenConfirmModal } = useSignUp()

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

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const asset = result.assets[0];

            const arquivo: Arquivo = {
                uri: Platform.OS === 'android' ? asset.uri : asset.uri.replace('file://', ''),
                type: asset.mimeType || 'application/pdf',
                name: asset.fileName || `image_${Date.now()}.jpg`,
            }

            setProfilePicture(asset.uri);
            if (arquivo) signUpForm.setValue("profilePicture", arquivo);
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
                            <ThemedText type="smallSecondary">{signUpForm.formState.errors.name?.message!}</ThemedText>
                        </View>
                        <Controller
                            name="name"
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
                        onPress={signUpForm.handleSubmit(handleSignUp)}
                        variant={loading ? 'disabled' : 'default'}
                        disabled={loading}
                        icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
                    />
                </View>
                <TouchableOpacity onPress={() => router.navigate('/login')}>
                    <ThemedText type='small' style={styles.txtLink}>Já tem uma conta? Faça Login.</ThemedText>
                </TouchableOpacity>
            </View>
            <ModalLayout
                title="Sucesso!"
                isVisible={isOpenConfirmModal.value}
                onClose={() => {
                    isOpenConfirmModal.set(false)
                    router.replace('/login')
                }}
            >
                <View style={styles.modalBody}>
                    <View style={{
                        width: '100%',
                        alignItems: 'center'
                    }}>
                        <ThumbsUp size={42} color={colors.cyan} />
                    </View>
                    <ThemedText type="default">
                        Você se registrou com sucesso na nossa plataforma. Agora é hora de fazer login.
                    </ThemedText>
                    <View style={{
                        height: 56
                    }}>
                        <CustomButton
                            title='Ir para Login'
                            onPress={() => {
                                isOpenConfirmModal.set(false)
                                router.replace('/login')
                            }}
                            variant={'secondary'}
                            disabled={false}
                            icon={null}
                        />
                    </View>
                </View>
            </ModalLayout>
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
    },
    modalBody: {
        width: '100%',
        flexDirection: 'column',
        gap: 16
    },
});

export default CadastroScreen;