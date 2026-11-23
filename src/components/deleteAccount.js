import { Alert, } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/configue';
import { useState } from 'react';
import { authFetch } from '../../firebase/authFetch';



export default function useDeleteAccount() {

    const [loading, setLoading] = useState(false);

    const deleteAccount = async () => {
        setLoading(true);

        try {
            const request = await authFetch('/profiles/me', { method: 'DELETE' });
            console.log('delete status:', request.status); 
            const data = await request.json();

            if(!request.ok &&!data.success){
                Alert.alert('Account cant be deleted:', data.message||'please try again  thanks ')
                return;     
            }
            await signOut(auth);


        } catch (e) {
            console.log('Delete account error:', e);

        }finally{
            setLoading(false)

        }


    };

      const confirmDeleteAccount = () => {
    if (loading) return;
    Alert.alert(
      'Delete your account?',
      'All your photos, videos and profile will be permanently deleted',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: deleteAccount },
      ]
    );
  };

  return { confirmDeleteAccount, loading };


}