import { colors } from '@/styles/colors'
import { ButtonProps, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemedText } from './themedText'

interface ICustomButtonProps extends ButtonProps {
    title: string
    onPress: () => void
    icon?: JSX.Element | null
    variant: 'default' | 'secondary' | 'disabled'
}

export function CustomButton({ title, onPress, icon, variant, ...rest }: ICustomButtonProps) {
    return (
        <TouchableOpacity style={
            variant === 'default' ? styles.buttonDefault :
                variant === 'secondary' ? styles.buttonSecondary :
                    variant === 'disabled' ? styles.buttonDisabled : null
        } {...rest} onPress={onPress}>
            <ThemedText type={
                variant === 'default'
                    ? 'defaultDarkMedium'
                    : 'defaultMedium'
            }>{title}</ThemedText>
            {icon}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonDefault: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: colors.accent,
        borderRadius: 16,
    },
    buttonSecondary: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 16,
    },
    buttonDisabled: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: colors.textSecondary,
        borderRadius: 16,
    },
});