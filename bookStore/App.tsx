import 'react-native-gesture-handler';

import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { AppProviders } from './store/AppProviders';
import { COLORS } from './lib/constants';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AppProviders>
          <NavigationContainer>
            <SafeAreaView style={styles.safeArea}>
              <StatusBar barStyle="light-content" backgroundColor={COLORS.navy} />
              <RootNavigator />
            </SafeAreaView>
          </NavigationContainer>
        </AppProviders>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: COLORS.background },
});
