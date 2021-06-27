import 'react-native-gesture-handler';
import * as React from 'react';
import {StatusBar} from 'react-native';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import {Main} from './src/navigators/LoginNavigator';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {PreferencesContext} from './src/components/PreferencesContext.js';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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

  console.log(CombinedDarkTheme)
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