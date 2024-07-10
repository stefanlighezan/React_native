// App.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import math from 'mathjs';

const App: React.FC = () => {
  const [functions, setFunctions] = useState<string[]>([]);
  const [graphPoints, setGraphPoints] = useState<{ x: number, y: number }[]>([]);

  const handleAddFunction = () => {
    setFunctions([...functions, '']);
  };

  const handleFunctionChange = (text: string, index: number) => {
    const updatedFunctions = [...functions];
    updatedFunctions[index] = text;
    setFunctions(updatedFunctions);
  };

  const evaluateFunctions = () => {
    const evaluatedPoints = [];
    if (functions.length > 0) {
      for (let x = -10; x <= 10; x += 0.1) {
        try {
          const y = math.evaluate(functions[0], { x }); // Evaluate only the first function for now
          evaluatedPoints.push({ x, y });
        } catch (error) {
          console.error('Error evaluating function:', error);
        }
      }
      setGraphPoints(evaluatedPoints);
    } else {
      console.warn('No functions to evaluate.');
    }
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Graphing App</Text>

      {/* Graph Area */}
      <View style={styles.graphContainer}>
        <Svg height="400" width="100%">
          {/* Render your graph using Path components */}
          {graphPoints.length > 1 && (
            <Path
              d={`M ${graphPoints.map(point => `${point.x},${point.y}`).join(' L ')}`}
              stroke="blue"
              strokeWidth="2"
              fill="none"
            />
          )}
        </Svg>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        {functions.map((func, index) => (
          <TextInput
            key={index}
            style={styles.input}
            placeholder={`Function ${index + 1}`}
            value={func}
            onChangeText={(text) => handleFunctionChange(text, index)}
          />
        ))}
        <Button title="Add Function" onPress={handleAddFunction} />
        <Button title="Graph Functions" onPress={evaluateFunctions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  graphContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default App;
