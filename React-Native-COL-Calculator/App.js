import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Updated import for Picker

const cities = [{'id':'Mumbai', 'title': 'Mumbai', 'colIndex':0.744},
  {'id':'Delhi', 'title': 'Delhi', 'colIndex':0.682},
  {'id':'Bengaluru', 'title': 'Bengaluru', 'colIndex':0.632},
  {'id':'Chennai', 'title': 'Chennai', 'colIndex':0.594},
  {'id':'Hyderabad', 'title': 'Hyderabad', 'colIndex':0.573},
  {'id':'Pune', 'title': 'Pune', 'colIndex':0.556},
  {'id':'Kolkata', 'title': 'Kolkata', 'colIndex':0.534},
  {'id':'Ahmedabad', 'title': 'Ahmedabad', 'colIndex':0.522},
  {'id':'Surat', 'title': 'Surat', 'colIndex':0.495},
  {'id':'Jaipur', 'title': 'Jaipur', 'colIndex':0.468},
  {'id':'Ahmedabad', 'title': 'Ahmedabad', 'colIndex':0.632},
  {'id':'Surat', 'title': 'Surat', 'colIndex':0.624},
  {'id':'Jaipur', 'title': 'Jaipur', 'colIndex':0.619},
  {'id':'Lucknow', 'title': 'Lucknow', 'colIndex':0.614},
  {'id':'Nagpur', 'title': 'Nagpur', 'colIndex':0.608},
  {'id':'Coimbatore', 'title': 'Coimbatore', 'colIndex':0.605},
  {'id':'Vadodara', 'title': 'Vadodara', 'colIndex':0.603},
  {'id':'Visakhapatnam', 'title': 'Visakhapatnam', 'colIndex':0.598},
  {'id':'Madurai', 'title': 'Madurai', 'colIndex':0.595},
  {'id':'Nashik', 'title': 'Nashik', 'colIndex':0.592},
  {'id':'Patiala', 'title': 'Patiala', 'colIndex':0.588},
  {'id':'Gurgaon', 'title': 'Gurgaon', 'colIndex':0.781},
  {'id':'Noida ', 'title': 'Noida ', 'colIndex':0.748},
  {'id':'Faridabad', 'title': 'Faridabad', 'colIndex':0.732},
  {'id':'Pimpri-Chinchwad ', 'title': 'Pimpri-Chinchwad ', 'colIndex':0.659},
  {'id':'Chandigarh', 'title': 'Chandigarh', 'colIndex':0.735},
  {'id':'Indore', 'title': 'Indore', 'colIndex':0.585},
  {'id':'Bhopal', 'title': 'Bhopal', 'colIndex':0.578},
  {'id':'Ludhiana', 'title': 'Ludhiana', 'colIndex':0.575},
  {'id':'Kanpur', 'title': 'Kanpur', 'colIndex':0.573},
  {'id':'Meerut', 'title': 'Meerut', 'colIndex':0.569},
  {'id':'Agra', 'title': 'Agra', 'colIndex':0.567},
  {'id':'Varanasi', 'title': 'Varanasi', 'colIndex':0.565},
  {'id':'Dehradun', 'title': 'Dehradun', 'colIndex':0.563},
  {'id':'Jalandhar', 'title': 'Jalandhar', 'colIndex':0.562},
  {'id':'Amritsar', 'title': 'Amritsar', 'colIndex':0.559},
  {'id':'Allahabad', 'title': 'Allahabad', 'colIndex':0.558},
  {'id':'Rajkot', 'title': 'Rajkot', 'colIndex':0.556},
  {'id':'Jodhpur', 'title': 'Jodhpur', 'colIndex':0.554},
  {'id':'Bhubaneswar', 'title': 'Bhubaneswar', 'colIndex':0.553},
  {'id':'Mysuru', 'title': 'Mysuru', 'colIndex':0.552},
  {'id':'Mangaluru', 'title': 'Mangaluru', 'colIndex':0.549},
  {'id':'Kochi', 'title': 'Kochi', 'colIndex':0.548},
  {'id':'Trivandrum', 'title': 'Trivandrum', 'colIndex':0.546},
  {'id':'Goa', 'title': 'Goa', 'colIndex':0.545}];

export default function App() {

  const [currentCity, setCurrentCity] = useState('Bengaluru');
  const [newCity, setNewCity] = useState('Pune');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  const [colMessage, setColMessage] = useState('');

  // Cost of living Calculation function
  const calculateCol = () => {
    const cCity = cities.find(c => c.id == currentCity);
    const nCity = cities.find(c => c.id == newCity);
    const curColi = cCity.colIndex;
    const newColi = nCity.colIndex;

    if(cCity.id == nCity.id) {
      setColMessage('');
      alert("Please select different cities!!");
      return;
    }
    var mI = 0;
    if(!isNaN(monthlyIncome)) {
      mI = monthlyIncome;
    }
    var mE = 0;
    if(!isNaN(monthlyExpenses)) {
      mE = monthlyExpenses;
    }
    if(mI <0 || mE<0){
      setColMessage('');
      alert("Please enter valid inputs");
      return;
    }
    if(mE>0 && mI==0) {
      setColMessage('');
      alert("Please enter monthly income along with expenses");
      return;
    }
    if(monthlyIncome == 0 && monthlyExpenses==0) {
      const res = ((newColi/curColi)*100).toFixed(2);
      setColMessage(`You will have to spend ${res}% of you current expense in ${cCity.title} when you move to ${nCity.title}`);
      return;
    }
    if(mI>0 && mE==0) {      
      const res = ((newColi/curColi)*mI).toFixed(2);
      setColMessage(`You will be able to maintain same lifetyle as ${cCity.title} if you earn ₹${res} in ${nCity.title}`);
      return;
    }
    const currentExpRate = mE/mI;
    const delta = currentExpRate/curColi;
    
    const newExpRate =  delta * newColi;
    setColMessage(`You will spend ${(newExpRate*mI).toFixed(2)} rupees in ${nCity.title} based on your current spending pattern in ${cCity.title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cost of living Calculator</Text>
    
      <Text style={styles.label}>Current City</Text>
      <Picker
        selectedValue={currentCity}
        style={styles.picker}
        onValueChange={(itemValue) => setCurrentCity(itemValue)}
      > 
      {cities.map(city => <Picker.Item key={city.id} label={city.title} value={city.id} />)}
      </Picker>

      <Text style={styles.label}>New City</Text>
      <Picker
        selectedValue={newCity}
        style={styles.picker}
        onValueChange={(itemValue) => setNewCity(itemValue)}
      > 
       {cities.map(city => <Picker.Item key={city.id} label={city.title} value={city.id} />)}
      </Picker>

      <Text style={styles.label}>Monthly Income</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Income"
        keyboardType="numeric"
        value={monthlyIncome}
        onChangeText={text => setMonthlyIncome(text)}
      />

      <Text style={styles.label}>Monthly Expenses</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Expenses"
        keyboardType="numeric"
        value={monthlyExpenses}
        onChangeText={text => setMonthlyExpenses(text)}
      />
      <Button title="Calculate Cost of Living" onPress={calculateCol} />

      {colMessage && (
        <Text style={styles.result}>{colMessage}</Text>
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
