import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker

export default function App() {
  const [basicSalary, setBasicSalary] = useState('');
  const [hraReceived, setHraReceived] = useState('');
  const [rentPaid, setRentPaid] = useState('');
  const [cityType, setCityType] = useState('Non-Metro');
  const [hraExemption, setHraExemption] = useState(null);

  // HRA Calculation function
  const calculateHRA = () => {
    const basic = parseFloat(basicSalary);
    const hra = parseFloat(hraReceived);
    const rent = parseFloat(rentPaid);
    const percentage = cityType === 'Metro' ? 0.5 : 0.4;

    if (isNaN(basic) || isNaN(hra) || isNaN(rent) || basic <= 0 || hra <= 0 || rent <= 0) {
      alert("Please enter valid inputs");
      return;
    }

    const hraExemption1 = hra;  // Actual HRA received
    const hraExemption2 = percentage * basic;  // 50% or 40% of basic salary
    const hraExemption3 = rent - 0.1 * basic;  // Rent paid minus 10% of basic salary

    const finalHRAExemption = Math.min(hraExemption1, hraExemption2, hraExemption3);
    setHraExemption(finalHRAExemption.toFixed(2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HRA Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Basic Salary"
        keyboardType="numeric"
        value={basicSalary}
        onChangeText={text => setBasicSalary(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="HRA Received"
        keyboardType="numeric"
        value={hraReceived}
        onChangeText={text => setHraReceived(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Rent Paid"
        keyboardType="numeric"
        value={rentPaid}
        onChangeText={text => setRentPaid(text)}
      />

      <Text style={styles.label}>Select City Type</Text>
      <Picker
        selectedValue={cityType}
        style={styles.picker}
        onValueChange={(itemValue) => setCityType(itemValue)}
      >
        <Picker.Item label="Metro" value="Metro" />
        <Picker.Item label="Non-Metro" value="Non-Metro" />
      </Picker>

      <Button title="Calculate HRA Exemption" onPress={calculateHRA} />

      {hraExemption && (
        <Text style={styles.result}>
          HRA Exemption: ₹ {hraExemption}
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
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  result: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: '#2E8B57',
  },
});
