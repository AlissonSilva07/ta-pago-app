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
    'smallSecondaryDark' |
    'smallMedium' |
    'title' |
    'titleSecondary' |
    'titleMedium' |
    'titleMediumDark'|
    'titleSmall' |
    'titleSmallSecondary' |
    'titleSmallMedium' |
    'titleSmallMediumDark' |
    'displayDark',
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
                type === 'smallSecondaryDark' ? styles.smallSecondaryDark : undefined,
                type === 'smallSecondary' ? styles.smallSecondary : undefined,
                type === 'smallMedium' ? styles.smallMedium : undefined,
                type === 'title' ? styles.title : undefined,
                type === 'titleSecondary' ? styles.titleSecondary : undefined,
                type === 'titleMedium' ? styles.titleMedium : undefined,
                type === 'titleMediumDark' ? styles.titleMediumDark : undefined,
                type === 'titleSmall' ? styles.titleSmall : undefined,
                type === 'titleSmallSecondary' ? styles.titleSmallSecondary : undefined,
                type === 'titleSmallMedium' ? styles.titleSmallMedium : undefined,
                type === 'titleSmallMediumDark' ? styles.titleSmallMediumDark : undefined,
                type === 'displayDark' ? styles.displayDark : undefined,
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
    smallSecondaryDark: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.regular,
        color: colors.primaryLight
    },
    smallMedium: {
        lineHeight: 18,
        fontSize: RFValue(12),
        fontFamily: fonts.medium,
        color: colors.textPrimary
    },
    title: {
        fontSize: RFValue(24),
        fontFamily: fonts.semibold,
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
    titleMediumDark: {
        fontSize: RFValue(24),
        fontFamily: fonts.semibold,
        lineHeight: 36,
        color: colors.primary
    },
    titleSmall: {
        fontSize: RFValue(18),
        fontFamily: fonts.regular,
        lineHeight: 30,
        color: colors.textPrimary
    },
    titleSmallSecondary: {
        fontSize: RFValue(18),
        fontFamily: fonts.regular,
        lineHeight: 30,
        color: colors.textSecondary
    },
    titleSmallMedium: {
        fontSize: RFValue(18),
        fontFamily: fonts.semibold,
        lineHeight: 30,
        color: colors.textPrimary
    },
    titleSmallMediumDark: {
        fontSize: RFValue(18),
        fontFamily: fonts.semibold,
        lineHeight: 30,
        color: colors.primary
    },
    displayDark: {
        fontSize: RFValue(28),
        fontFamily: fonts.semibold,
        lineHeight: 38,
        color: colors.primary
    },
})