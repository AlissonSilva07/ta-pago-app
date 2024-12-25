import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

interface InputProps extends TextInputProps {
    onChangeText: (text: string) => void;
}

export function Input({ onChangeText, value, placeholder, ...rest }: InputProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false);
    return (
        <TextInput
            style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colors.textSecondary}
            cursorColor={colors.cyan}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.textSecondary,
        borderStyle: 'solid',
        padding: 12,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary
    },
    inputContainerFocused: {
        borderColor: colors.accent,
    },
    input: {
        padding: 12,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary,
    },
});