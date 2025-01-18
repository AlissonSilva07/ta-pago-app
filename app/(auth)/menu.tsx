import { CustomButton } from '@/components/button';
import { useLogin } from '@/hooks/useLogin';
import { colors } from '@/styles/colors';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const { loading, logOut } = useLogin()
  return (
    <SafeAreaView style={styles.container}>
      <CustomButton
        title='Sair do App'
        onPress={logOut}
        variant={loading ? 'disabled' : 'default'}
        disabled={loading}
        icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});