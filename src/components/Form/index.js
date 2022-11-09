import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import ResultIMC from '../ResultIMC';
import styles from './style';

export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState('Fill your weight and height');
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState('Calculate');
  const [errorMessage, setErrorMessage] = useState(null);

  const imcCalculator = () => {
    return setImc((weight / (height * height)).toFixed(2));
  };

  const imcVerify = () => {
    if (imc === null) {
      Vibration.vibrate();
      setErrorMessage('Please fill this field');
    }
  };

  const validateIMC = () => {
    if (height != null && weight != null) {
      imcCalculator();
      setHeight(null);
      setWeight(null);
      setMessageImc(`Your BMI equals to: `);
      setTextButton('Calculate again');
      setErrorMessage(null);
      return;
    }
    imcVerify();
    setImc(null);
    setTextButton('Calculate');
    setMessageImc('Fill your weight and height');
  };

  return (
    <View style={styles.formContext}>
      <View style={styles.form}>
        <Text style={styles.formLabel}>Height</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setHeight}
          value={height}
          placeholder="Ex: 1.75 (in meters)"
          keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Weight</Text>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          onChangeText={setWeight}
          value={weight}
          placeholder="Ex: 80.5kg (in kilos)"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.buttonCalculator}
          onPress={() => validateIMC()}
        >
          <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultIMC messageResultImc={messageImc} resultImc={imc} />
    </View>
  );
}
