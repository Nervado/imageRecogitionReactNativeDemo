import React from 'react';

import {StyleSheet, View} from 'react-native';

import Camera from './components/Camera';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const App = () => {
  return (
    <View style={styles.container}>
      <Camera />
    </View>
  );
};
export default App;
