
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Navigation from './src/navigation/navigation';
import 'react-native-gesture-handler';
import image from './assets/images/soccer.png';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  store  from './redux/store'
import { Provider } from 'react-redux';
import './global.css'





export default function App() {
  return (
    <>

      <Provider store={store}>
        <SafeAreaProvider>
          <ImageBackground
            source={image}
            style={{
              flex: 1,
              justifyContent: 'center',

            }}

          >
            <Navigation />
          </ ImageBackground>
        </SafeAreaProvider>
      </Provider>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
