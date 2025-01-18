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

const CadastroScreen = () => {
    const router = useRouter()
    const { loading, signUp } = useLogin()

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState<string | null>(null);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const onChangeName = (text: string) => {
        setUsername(text);
    };

    const onChangeEmail = (text: string) => {
        setEmail(text);
    };

    const onChangePassword = (text: string) => {
        setPassword(text);
    };

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
        }
    };

    const handleSignup = async () => {
        if (username && email && password && profilePicture) {
            await signUp(email, password, username, profilePicture)
        } else {
            Alert.alert('Erro', 'Preencha todos os dados', [
                {
                    text: 'Ok',
                    style: 'cancel'
                }
            ])
        }
    }

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
                    <Input placeholder='Nome' value={username} onChangeText={onChangeName} />
                    <Input placeholder='E-mail' value={email} onChangeText={onChangeEmail} />
                    <View style={styles.passwordView}>
                        <Input placeholder='Senha' value={password} onChangeText={onChangePassword} secureTextEntry={!isPasswordVisible} />
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

                </View>
            </View>
            <View style={styles.buttonArea}>
                <View style={styles.buttonView}>
                    <CustomButton
                        title='Cadastrar'
                        onPress={handleSignup}
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
    }
});

export default CadastroScreen;