import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ResultProps {
  score: number;
  onRetake: () => void;
}

const Result: React.FC<ResultProps> = ({ score, onRetake }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>Your Score: {score}</Text>
      <Button title="Retake Quiz" onPress={onRetake} />
    </View>
  );
};

export default Result;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultText: {
    fontSize: 24,
    marginBottom: 20
  }
});
