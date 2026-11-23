
import {  Alert,  } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/configue';
import{useState} from 'react'

export default function useLogout() {
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth); // listener → clearAuth() → <Auth /> shows
    } catch (e) {
      console.log('Logout error:', e);
      Alert.alert('Logout failed', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const confirmLogout = () => {
    if (loading) return; // ignore taps while logging out
    Alert.alert('Log out?', 'You will need to sign in again.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Log out', style: 'destructive', onPress: logout },
    ]);
  };

  return { confirmLogout, loading };
}