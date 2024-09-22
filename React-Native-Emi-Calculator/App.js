import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [emi, setEmi] = useState(null);

  // EMI Calculation function
  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 12 / 100;
    const n = parseFloat(loanTenure) * 12;

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      alert("Please enter valid inputs");
      return;
    }

    const emiCalculated = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setEmi(emiCalculated.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>EMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Loan Amount"
        keyboardType="numeric"
        value={loanAmount}
        onChangeText={text => setLoanAmount(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Interest Rate (%)"
        keyboardType="numeric"
        value={interestRate}
        onChangeText={text => setInterestRate(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Loan Tenure (Years)"
        keyboardType="numeric"
        value={loanTenure}
        onChangeText={text => setLoanTenure(text)}
      />

      <Button title="Calculate EMI" onPress={calculateEMI} />

      {emi && (
        <Text style={styles.result}>
          Your EMI is: ₹ {emi}
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
