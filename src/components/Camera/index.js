import React, {useState, useRef, useEffect} from 'react';
import {Dimensions, Alert, StyleSheet, ActivityIndicator} from 'react-native';

import {RNCamera} from 'react-native-camera';

import CaptureButton from '../CaptureButton';

// import { Container } from './styles';

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Camera() {
  const [identifedAs, setIdentifedAs] = useState('');

  const [camera, setCamera] = useState(null);

  // const camera = useRef(null);

  const [loading, setLoading] = useState(false);

  /**
   * useEffect(() => {
    if (loading && camera) {
      camera.pausePreview();
    } else {
      camera.resumePreview();
    }
  }, [camera, loading]);
   */

  function displayAnswer(identifiedImage) {
    // Dismiss the acitivty indicator
    setIdentifedAs(identifiedImage);
    setLoading(false);

    // Show an alert with the answer on
    Alert.alert(identifedAs);

    // Resume the preview
    // camera.resumePreview();

    //
  }

  function identifyImage(imageData) {
    // Initialize Clarifai api
    const Clarifai = require('clarifai');
    const app = new Clarifai.App({
      apiKey: 'd3c7771612144fa38ab236268fb0be46',
    });

    // Identify the image

    app.models
      .predict(Clarifai.GENERAL_MODEL, {base64: imageData})
      .then(response =>
        displayAnswer(
          JSON.stringify(response.outputs[0].data.concepts[0].name),
        ).catch(err => Alert.alert(err)),
      );
  }

  async function takePicture() {
    if (camera) {
      // Pause the camera preview

      // camera.pausePreview();

      // Update the state to indicate loading
      setLoading(true);

      // Set the options for the camera
      const options = {
        base64: true,
      };

      // Get the base64 version of the image
      const data = await camera.takePictureAsync(options);

      // Call the identify function
      identifyImage(data.base64);
    }
  }

  return (
    <RNCamera ref={ref => setCamera(ref)} style={styles.preview}>
      <ActivityIndicator
        size="large"
        style={styles.loadingIndicator}
        color="#fff"
        animating={loading}
      />
      <CaptureButton buttonDisabled={loading} onClick={takePicture} />
    </RNCamera>
  );
}
