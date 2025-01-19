import ChipComponent from '@/components/chip';
import { ThemedText } from '@/components/themedText';
import { chipTypes } from '@/mocks/chipTypes';
import { colors } from '@/styles/colors';
import { fonts } from '@/styles/fonts';
import { MainShadowStyle } from '@/styles/mainShadow';
import { DollarSign, Search } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PayScreen() {
    const [query, setQuery] = useState<string>('')
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [selectedChip, setSelectedChip] = useState<number | null>(0); // Track selected chip


    const onChangeQuery = (text: string) => {
        setQuery(text)
    }

    const handleChipPress = (chipKey: number) => {
        setSelectedChip(chipKey);
    };


    return (
        <SafeAreaView style={styles.container}>
            <ThemedText type='titleSmall' style={styles.title}>Histórico de gastos</ThemedText>
            <View style={styles.filterArea}>
                <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
                    <Search color={colors.textPrimary} />
                    <TextInput
                        onChangeText={onChangeQuery}
                        value={query}
                        placeholder={'Pesquisar por Gasto'}
                        placeholderTextColor={colors.textSecondary}
                        cursorColor={colors.cyan}
                        style={styles.input}
                        multiline={false}
                        numberOfLines={1}
                    />
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={chipTypes}
                    renderItem={(item) => <ChipComponent title={item.item.title} checked={item.item.key === selectedChip} onPress={() => handleChipPress(item.item.key)} />}
                    keyExtractor={item => item.key.toString()}
                    contentContainerStyle={styles.flatlist}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 16
    },
    title: {
        width: '100%',
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.evenLighterGray,
        backgroundColor: colors.bgGrayAlfa,
        borderStyle: 'solid',
        paddingVertical: 8,
        paddingHorizontal: 16,
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary,
        overflow: 'hidden'
    },
    inputContainerFocused: {
        borderColor: colors.accent,
    },
    input: {
        fontFamily: fonts.regular,
        fontSize: RFValue(16),
        color: colors.textPrimary,
    },
    filterArea: {
        width: '100%',
        flexDirection: 'column',
        gap: 16,
    },
    flatlist: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    }
});
