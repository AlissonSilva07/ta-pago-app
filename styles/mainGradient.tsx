import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

interface MainGradientStyleProps {
    children: ReactNode,
    radius?: number
}

export function MainGradientStyle({ children, radius }: MainGradientStyleProps) {
    return (
        <LinearGradient
            colors={[
                '#FED766',
                '#98E2F5',
            ]}
            locations={[0.2, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
                overflow: 'hidden',
                borderRadius: radius ?? 100
            }}
        >
            {children}
        </LinearGradient >
    )
}