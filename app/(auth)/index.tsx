import CardAcessoRapido from '@/components/cardAcessoRapido';
import { ThemedText } from '@/components/themedText';
import { useHome } from '@/modules/home';
import { CardResumoContas } from '@/modules/home/components/cardResumoContas';
import { CardTotalGastos } from '@/modules/home/components/cardTotalGastos';
import { useUserContext } from '@/shared/contexts/user-context';
import { colors } from '@/styles/colors';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { CopyPlus, DollarSign, UserRound } from 'lucide-react-native';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter()
  const { userState } = useUserContext()
  const { expensesSummaryList, loading } = useHome()

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopView}>
          <View style={styles.headerTopText}>
            <ThemedText type='smallSecondary'>Olá,</ThemedText>
            <ThemedText type='titleMedium'>{userState.value.name ?? 'Usuário(a)'}</ThemedText>
          </View>
          <View style={styles.headerTopImg}>
            {userState.value.profilePicture ? (
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
        </View>
        <View style={styles.headerBottomView}>
          <ThemedText type='small'>Acesso Rápido</ThemedText>
          <View style={styles.headerBottomCardView}>
            <CardAcessoRapido onPress={() => router.navigate("/(auth)/pay")}>
              <DollarSign color={colors.primary} size={24} />
              <ThemedText type='defaultDarkMedium'>Pagar</ThemedText>
            </CardAcessoRapido>
            <CardAcessoRapido onPress={() => router.navigate("/(auth)/pay/create")}>
              <CopyPlus color={colors.primary} size={24} />
              <ThemedText type='defaultDarkMedium'>Adicionar</ThemedText>
            </CardAcessoRapido>
          </View>
        </View>
      </View>
      <View style={styles.mainContent}>
        <CardResumoContas data={expensesSummaryList.value} />
        <CardTotalGastos data={{
          id: "ede8a032-d4c8-4810-af76-b2ecd0dc8ada",
          title: "Conta de Luz",
          description: "Fatura mensal de eletricidade",
          amount: String(120),
          category: "Moradia",
          isPaid: false,
          dueDate: dayjs.utc("2025-02-28T00:00:00.000Z").toDate(),
        }} />
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
