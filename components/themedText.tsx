import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { StyleSheet, Text, type TextProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export type ThemedTextProps = TextProps & {
    type?: 'default' |
    'defaultSecondary' |
    'defaultMedium' |
    'defaultDark' |
    'defaultDarkMedium' |
    'small' |
    'smallSecondary' |
    'smallMedium' |
    'title' |
    'titleSecondary' |
    'titleMedium',
    children: TextProps
};

export function ThemedText({
    style,
    type = 'default',
    children,
    ...rest
}: ThemedTextProps) {
    return (
        <Text
            style={[
                type === 'default' ? styles.default : undefined,
                type === 'defaultSecondary' ? styles.defaultSecondary : undefined,
                type === 'defaultMedium' ? styles.defaultMedium : undefined,
                type === 'defaultDark' ? styles.defaultDark : undefined,
                type === 'defaultDarkMedium' ? styles.defaultDarkMedium : undefined,
                type === 'small' ? styles.small : undefined,
                type === 'smallSecondary' ? styles.smallSecondary : undefined,
                type === 'smallMedium' ? styles.smallMedium : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'titleSecondary' ? styles.titleSecondary : undefined,
                type === 'titleMedium' ? styles.titleMedium : undefined,
                style,
            ]}
            {...rest}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    default: {
        fontSize: RFValue(16),
        fontFamily: fonts.regular,
        lineHeight: 24,
        color: colors.textPrimary
    },
    defaultSecondary: {
        fontSize: RFValue(16),
        fontFamily: fonts.regular,
        lineHeight: 24,
        color: colors.textSecondary
    },
    defaultMedium: {
        fontSize: RFValue(16),
        fontFamily: fonts.medium,
        lineHeight: 24,
        color: colors.textPrimary
    },
    defaultDark: {
        fontSize: RFValue(16),
        fontFamily: fonts.regular,
        lineHeight: 24,
        color: colors.primary
    },
    defaultDarkMedium: {
        fontSize: RFValue(16),
        fontFamily: fonts.medium,
        lineHeight: 24,
        color: colors.primary
    },
    small: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.textPrimary
    },
    smallSecondary: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.textSecondary
    },
    smallMedium: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.textPrimary
    },
    title: {
        fontSize: RFValue(24),
        fontFamily: fonts.regular,
        lineHeight: 36,
        color: colors.textPrimary
    },
    titleSecondary: {
        fontSize: RFValue(24),
        fontFamily: fonts.regular,
        lineHeight: 36,
        color: colors.textSecondary
    },
    titleMedium: {
        fontSize: RFValue(24),
        fontFamily: fonts.semibold,
        lineHeight: 36,
        color: colors.textPrimary
    },
})