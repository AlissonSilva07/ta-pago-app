import CardAcessoRapido from '@/components/cardAcessoRapido';
import { ThemedText } from '@/components/themedText';
import { useUserContext } from '@/contexts/user-context';
import { colors } from '@/styles/colors';
import { MainShadowStyle } from '@/styles/mainShadow';
import { CopyPlus, DollarSign, UserRound } from 'lucide-react-native';
import { StyleSheet, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { userState } = useUserContext()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopView}>
          <View style={styles.headerTopText}>
            <ThemedText type='smallSecondary'>Olá,</ThemedText>
            <ThemedText type='titleMedium'>{userState?.value.user?.username ?? 'Usuário(a)'}</ThemedText>
          </View>
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
        </View>
        <View style={styles.headerBottomView}>
          <ThemedText type='small'>Acesso Rápido</ThemedText>
          <View style={styles.headerBottomCardView}>
            <CardAcessoRapido>
              <DollarSign color={colors.primary} size={24} />
              <ThemedText type='defaultDarkMedium'>Pagar</ThemedText>
            </CardAcessoRapido>
            <CardAcessoRapido>
              <CopyPlus color={colors.primary} size={24} />
              <ThemedText type='defaultDarkMedium'>Adicionar</ThemedText>
            </CardAcessoRapido>
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <ThemedText type='default'>Home</ThemedText>
        <MainShadowStyle>
          <ThemedText type='titleSmallMedium'>Conteúdo</ThemedText>
        </MainShadowStyle>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: colors.primary
  },
  header: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.primary
  },
  headerTopView: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center'
  },
  headerTopText: {
    flex: 1,
    flexDirection: 'column',
    gap: 6
  },
  headerTopImg: {
    width: 40,
    height: 40,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  headerBottomView: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  headerBottomCardView: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
  },
  mainContent: {
    flex: 1,
    flexDirection: 'column',
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  userImg: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
    borderRadius: 100
  }
});
