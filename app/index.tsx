import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Quiz from './components/Quiz';
import Result from './components/Result';
import CategorySelection from './components/CategorySelection';

export default function App() {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleQuizFinish = (finalScore: number) => {
    setScore(finalScore);
    setIsQuizFinished(true);
  };

  const retakeQuiz = () => {
    setScore(0);
    setIsQuizFinished(false);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      {selectedCategory === null ? (
        <CategorySelection onSelectCategory={setSelectedCategory} />
      ) : isQuizFinished ? (
        <Result score={score} onRetake={retakeQuiz} />
      ) : (
        <Quiz category={selectedCategory} onQuizFinish={handleQuizFinish} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
