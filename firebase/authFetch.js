import { auth } from './configue';


const API_URL = process.env.EXPO_PUBLIC_API_URL

export async function authFetch(path, options = {}) {

    const token = await auth.currentUser?.getIdToken();
    console.log('authFetch URL:', `${API_URL}${path}`);
    return fetch(`${API_URL}${path}`,{

              
           ...options,
           headers:{

             ...options.headers,
              Authorization: `Bearer ${ token }`,
              'ngrok-skip-browser-warning': 'true',


           }


        })

}


