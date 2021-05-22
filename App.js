import 'react-native-gesture-handler';
import * as React from 'react';
import {DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme,  Provider as PaperProvider } from 'react-native-paper';
import {Main} from './src/navigators/LoginNavigator';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {PreferencesContext} from './src/components/PreferencesContext.js';

const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
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

  return (
    <PreferencesContext.Provider value={preferences}>
      <PaperProvider theme={theme}>
        <Main theme={theme}/>
      </PaperProvider>
    </PreferencesContext.Provider>
  ); 
}