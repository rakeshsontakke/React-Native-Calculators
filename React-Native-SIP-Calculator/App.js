import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('');
  const [lumpsumInvestment, setLumpsumInvestment] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [years, setYears] = useState('');
  const [futureSIPValue, setFutureSIPValue] = useState(null);
  const [futureLumpsumValue, setFutureLumpsumValue] = useState(null);

  // Calculation function
  const calculateInvestment = () => {
    const monthlySIP = parseFloat(monthlyInvestment);
    const lumpsum = parseFloat(lumpsumInvestment);
    const annualRateOfReturn = parseFloat(annualRate);
    const tenureYears = parseFloat(years);

    if (isNaN(annualRateOfReturn) || isNaN(tenureYears) || annualRateOfReturn <= 0 || tenureYears <= 0) {
      alert("Please enter valid inputs");
      return;
    }

    const r = annualRateOfReturn / 12 / 100; // Monthly interest rate
    const n = tenureYears * 12; // Number of months

    // SIP Calculation: FV = P * [ (1 + r)^n - 1 ] / r * (1 + r)
    if (!isNaN(monthlySIP) && monthlySIP > 0) {
      const futureValueSIP = monthlySIP * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      setFutureSIPValue(futureValueSIP.toFixed(2));
    } else {
      setFutureSIPValue(null);
    }

    // Lumpsum Calculation: FV = P * (1 + r)^n
    if (!isNaN(lumpsum) && lumpsum > 0) {
      const futureValueLumpsum = lumpsum * Math.pow(1 + r, n);
      setFutureLumpsumValue(futureValueLumpsum.toFixed(2));
    } else {
      setFutureLumpsumValue(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SIP & Lumpsum Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Monthly Investment (₹)"
        keyboardType="numeric"
        value={monthlyInvestment}
        onChangeText={text => setMonthlyInvestment(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Lumpsum Investment (₹)"
        keyboardType="numeric"
        value={lumpsumInvestment}
        onChangeText={text => setLumpsumInvestment(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Expected Annual Rate of Return (%)"
        keyboardType="numeric"
        value={annualRate}
        onChangeText={text => setAnnualRate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Investment Tenure (Years)"
        keyboardType="numeric"
        value={years}
        onChangeText={text => setYears(text)}
      />

      <Button title="Calculate Future Value" onPress={calculateInvestment} />

      {futureSIPValue && (
        <Text style={styles.result}>
          Future Value of SIP: ₹ {futureSIPValue}
        </Text>
      )}

      {futureLumpsumValue && (
        <Text style={styles.result}>
          Future Value of Lumpsum: ₹ {futureLumpsumValue}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#2E8B57',
  },
});
