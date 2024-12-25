import { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "./colors";

interface MainShadowStyleProps {
    children: ReactNode,
    radius?: number
}

export function MainShadowStyle({ children }: MainShadowStyleProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.shadowLayer, styles.dropShadow1]} />
            <View style={[styles.shadowLayer, styles.dropShadow2]} />
            <View style={[styles.shadowLayer, styles.dropShadow3]} />
            <View style={[styles.shadowLayer, styles.dropShadow4]} />
            <View style={[styles.shadowLayer, styles.innerShadow1]} />
            <View style={[styles.shadowLayer, styles.innerShadow2]} />
            <View style={styles.customBox}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    shadowLayer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 16,
    },
    dropShadow4: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 10,
    },
    dropShadow3: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    dropShadow2: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    dropShadow1: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    innerShadow2: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    innerShadow1: {
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.03,
        shadowRadius: 1,
        elevation: 3,
    },
    customBox: {
        padding: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: 16,
        backgroundColor: colors.primaryLight,
    },
});