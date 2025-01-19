import { colors } from "@/styles/colors";
import { X } from "lucide-react-native";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./themedText";

interface IModalLayout {
    isVisible: boolean
    children: React.ReactNode
    onClose: () => void
    title: string;
}

export default function ModalLayout({ children, isVisible, onClose, title }: IModalLayout) {
    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
            statusBarTranslucent
            style={{ position: 'relative' }}
            transparent={true}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBody}>
                    <View style={styles.top}>
                        <ThemedText type="titleMedium">{title}</ThemedText>
                        <TouchableOpacity style={styles.btnClose} onPress={onClose}>
                            <X size={24} color={colors.textPrimary} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.content}>
                        {children}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: colors.bgModal
    },
    modalBody: {
        width: '100%',
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 16,
        borderTopWidth: 1,
        borderTopColor: colors.bgGrayAlfa
    },
    top: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btnClose: {
        width: 36,
        height: 36,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        backgroundColor: colors.bgGrayAlfa
    },
    content: {
        flexDirection: 'column',
        gap: 16
    }

})
