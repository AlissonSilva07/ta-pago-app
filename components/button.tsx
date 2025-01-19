import { colors } from '@/styles/colors';
import { ButtonProps, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from './themedText';

interface ICustomButtonProps extends ButtonProps {
    title: string;
    onPress: () => void;
    icon?: JSX.Element | null;
    variant?: 'default' | 'secondary' | 'disabled' | 'destructive';
}

export function CustomButton({
    title,
    onPress,
    icon,
    variant = 'default',
    ...rest
}: ICustomButtonProps) {
    return (
        <TouchableOpacity
            style={
                variant === 'default'
                    ? styles.buttonDefault
                    : variant === 'secondary'
                    ? styles.buttonSecondary
                    : variant === 'disabled'
                    ? styles.buttonDisabled
                    : variant === 'destructive'
                    ? styles.buttonDestructive :
                    styles.buttonDefault
            }
            disabled={variant === 'disabled'}
            {...rest}
            onPress={onPress}
        >
            <View style={styles.content}>
                {icon}
                <ThemedText
                    type={
                        variant === 'default' ? 'defaultDarkMedium' :
                        variant === 'secondary' ? 'defaultMedium' :
                        variant === 'destructive' ? 'defaultMedium' :
                        variant === 'disabled' ? 'defaultMedium' : 'defaultMedium'
                    }
                >
                    {title}
                </ThemedText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonDefault: {
        flex: 1,
        width: '100%',
        maxHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.accent,
        borderRadius: 16,
    },
    buttonSecondary: {
        flex: 1,
        width: '100%',
        maxHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.primaryLight,
        borderRadius: 16,
    },
    buttonDisabled: {
        flex: 1,
        width: '100%',
        maxHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.textSecondary,
        borderRadius: 16,
    },
    buttonDestructive: {
        flex: 1,
        width: '100%',
        maxHeight: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: colors.destructive,
        borderRadius: 16,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
});
