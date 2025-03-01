import * as SecureStore from 'expo-secure-store';


const validateToken = async () => {
	try {
		const token = SecureStore.getItem('userToken');
		const expirationTime = SecureStore.getItem('tokenExpiration');

		if (token && expirationTime) {
			const currentTime = new Date().getTime();
			if (currentTime < parseInt(expirationTime)) {
				return true;
			} else {
				SecureStore.setItem('userToken', "");
				SecureStore.setItem('tokenExpiration', "");
				return false;
			}
		}
	} catch (e) {
		console.error("Não foi possível validar o token", e);
	}
	return false;
};

export { validateToken };