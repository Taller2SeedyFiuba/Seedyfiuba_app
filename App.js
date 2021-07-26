import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import {Main} from './src/navigators/LoginNavigator';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {PreferencesContext} from './src/components/PreferencesContext.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary : '#668C4A',
    accent : '#A6BF4B'
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
  },
};

export default function App() {
  const [isThemeDark, setIsThemeDark] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (

    <PreferencesContext.Provider value={preferences}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <StatusBar hidden={true} />
          <Main theme={theme}/>
        </PaperProvider>
      </SafeAreaProvider>
    </PreferencesContext.Provider>
  ); 
}