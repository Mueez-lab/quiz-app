import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface QuestionProps {
  question: string;
  options: string[];
  onSelectAnswer: (index: number) => void;
  selectedAnswer: number | null;
  showAnswer: boolean;
  correctAnswer: number;
}

const Question: React.FC<QuestionProps> = ({
  question,
  options,
  onSelectAnswer,
  selectedAnswer,
  showAnswer,
  correctAnswer
}) => {
  return (
    <View>
      <Text style={styles.questionText}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelectAnswer(index)}
          disabled={showAnswer}
          style={[
            styles.option,
            selectedAnswer === index
              ? showAnswer
                ? correctAnswer === index
                  ? styles.correct
                  : styles.wrong
                : styles.selected
              : null
          ]}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  questionText: {
    fontSize: 20,
    marginBottom: 20
  },
  option: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  optionText: {
    fontSize: 16
  },
  selected: {
    backgroundColor: '#ddd'
  },
  correct: {
    backgroundColor: 'green'
  },
  wrong: {
    backgroundColor: 'red'
  }
});
