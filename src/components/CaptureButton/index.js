/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import {StyleSheet, Button, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  captureButton: {
    marginBottom: 30,
    width: 160,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});

export default function CaptureButton(props) {
  const {buttonDisabled, onClick} = props;
  return (
    <TouchableHighlight style={styles.captureButton} disabled={buttonDisabled}>
      <Button
        onPress={onClick}
        disabled={buttonDisabled}
        title="Capture"
        accessibilityLabel="Learn more about this button"
      />
    </TouchableHighlight>
  );
}
