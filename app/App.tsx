import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions } from 'react-native';
import { Svg, Path } from 'react-native-svg';

const evaluateFunction = (func: string, x: number): number => {
  // Replace 'x' in the function string with the actual value of x
  func = func.replace(/x/g, x.toString());

  func += ` + ${(Dimensions.get('window').height) / 2}`

  try {
    // Evaluate the function using JavaScript's built-in eval function
    // Note: Using eval here for simplicity; in production, consider alternatives
    const result = eval(func);
    if (typeof result === 'number' && !isNaN(result)) {
      return result;
    } else {
      throw new Error('Invalid function result');
    }
  } catch (error) {
    console.error('Error evaluating function:', error);
    throw error;
  }
};

const App: React.FC = () => {
  const [functionText, setFunctionText] = useState<string>(''); // State for the function text input
  const [graphPoints, setGraphPoints] = useState<{ x: number, y: number }[]>([]);

  const screenWidth = Dimensions.get('window').width;

  const handleGraphFunction = () => {
    const evaluatedPoints = [];
    const step = screenWidth / 100; // Adjust the step size based on screen width
    for (let pixelX = 0; pixelX <= screenWidth; pixelX += step) {
      const x = (pixelX / screenWidth) * 20 - 10; // Map pixelX to x-value in range -10 to 10
      try {
        functionText
        const y = evaluateFunction(functionText, x);
        evaluatedPoints.push({ x, y });
      } catch (error) {
        console.error('Error evaluating function:', error);
      }
    }
    setGraphPoints(evaluatedPoints);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Graphing App</Text>

      {/* Graph Area */}
      <View style={styles.graphContainer}>
        <Svg height="400" width={screenWidth}>
          {/* Render your graph using Path components */}
          {graphPoints.length > 1 && (
            <Path
              d={`M ${graphPoints.map(point => {
                const pixelX = (point.x + 10) / 20 * screenWidth; // Map x-value back to pixel coordinates
                const pixelY = (1 - (point.y / 10)) * 400; // Map y-value to pixel coordinates
                return `${pixelX},${pixelY}`;
              }).join(' L ')}`}
              stroke="blue"
              strokeWidth="2"
              fill="none"
            />
          )}
        </Svg>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a function (e.g., sin(x))"
          value={functionText}
          onChangeText={(text) => setFunctionText(text)}
        />
        <Button title="Graph Function" onPress={handleGraphFunction} />
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
