import { CustomButton } from '@/components/button';
import { ThemedText } from '@/components/themedText';
import { useLogin } from '@/modules/login';
import { useUserContext } from '@/shared/contexts/user-context';
import { colors } from '@/styles/colors';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { UserRound } from 'lucide-react-native';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
dayjs.extend(utc);
dayjs.extend(timezone);

export default function MenuScreen() {
  const { loading, handleLogout } = useLogin()
  const { userState } = useUserContext()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.headerTopImg}>
          {userState?.value.profilePicture ? (
            <Image
              source={{
                uri: `data:image/jpeg;base64,${userState.value.profilePicture}`, // Displaying the Base64 image
              }}
              style={styles.userImg}
            />
          ) : (
            <UserRound size={24} color={colors.accent} />
          )}
        </View>
        <View style={styles.headerTopText}>
          <ThemedText type='titleMedium'>{userState.value.name ?? 'Usuário(a)'}</ThemedText>
          <ThemedText type='smallSecondary'>{userState.value.email ?? 'Email'}</ThemedText>
          <ThemedText type='smallSecondary'>Ativo(a) desde: {dayjs.utc(userState.value.createdAt).format('DD/MM/YYYY')}</ThemedText>
        </View>
      </View>
      <View style={styles.buttonArea}>
        <CustomButton
          title='Apagar todos os dados'
          onPress={() => { }}
          variant={loading ? 'disabled' : 'destructive'}
          disabled={loading}
          icon={loading ? <ActivityIndicator size="small" color={colors.textPrimary} /> : null}
        />
        <CustomButton
          title='Sair do App'
          onPress={handleLogout}
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
    width: '100%',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  userImg: {
    width: 120,
    height: 120,
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