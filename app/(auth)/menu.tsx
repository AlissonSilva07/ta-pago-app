import { CustomButton } from '@/components/button';
import { ThemedText } from '@/components/themedText';
import { useUserContext } from '@/contexts/user-context';
import { useLogin } from '@/hooks/useLogin';
import { colors } from '@/styles/colors';
import { UserRound } from 'lucide-react-native';
import { ActivityIndicator, StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MenuScreen() {
  const { loading, logOut } = useLogin()
  const { userState } = useUserContext()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.headerTopImg}>
          {userState?.value.user?.profilePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${userState?.value.user?.profilePicture}`, // Displaying the Base64 image
              }}
              style={styles.userImg}
            />
          ) : (
            <UserRound size={24} color={colors.accent} />
          )}
        </View>
        <View style={styles.headerTopText}>
          <ThemedText type='titleMedium'>{userState?.value.user?.username ?? 'Usuário(a)'}</ThemedText>
          <ThemedText type='smallSecondary'>Ativo(a) desde: 12/04/2024</ThemedText>
        </View>
      </View>
      <View style={styles.buttonArea}>
        <CustomButton
          title='Apagar todos os dados'
          onPress={() => {}}
          variant={loading ? 'disabled' : 'destructive'}
          disabled={loading}
          icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
        />
        <CustomButton
          title='Sair do App'
          onPress={logOut}
          variant={loading ? 'disabled' : 'secondary'}
          disabled={loading}
          icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
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
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 32
  },
  headerTop: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTopImg: {
    width: 80,
    height: 80,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  userImg: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 100
  },
  headerTopText: {
    width: '100%',
    flexDirection: 'column',
    gap: 6,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonArea: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'flex-start',
  }
});