import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Question from './Question';

interface QuizProps {
  category: string;
  onQuizFinish: (score: number) => void;
}

const questionsByCategory = {
  'General Knowledge': [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: 0
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Mark Twain", "Shakespeare", "Dickens", "Austen"],
      answer: 1
    },
    {
      question: "Which country is the largest by land area?",
      options: ["Russia", "Canada", "USA", "China"],
      answer: 0
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: 2
    },
    {
      question: "In which city is the famous 'Big Ben' located?",
      options: ["New York", "Paris", "London", "Berlin"],
      answer: 2
    }
  ],
  'Science & Tech': [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1
    },
    {
      question: "What is the speed of light?",
      options: [
        "299,792,458 meters per second",
        "150,000 kilometers per second",
        "300,000,000 meters per second",
        "100,000 miles per second"
      ],
      answer: 0
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H", "H2O", "O2", "HO"],
      answer: 1
    },
    {
      question: "Who invented the telephone?",
      options: ["Thomas Edison", "Nikola Tesla", "Alexander Graham Bell", "Guglielmo Marconi"],
      answer: 2
    },
    {
      question: "What is the powerhouse of the cell?",
      options: ["Nucleus", "Mitochondria", "Ribosome", "Cell Membrane"],
      answer: 1
    }
  ],
  'History': [
    {
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
      answer: 1
    },
    {
      question: "What year did World War II end?",
      options: ["1941", "1945", "1946", "1950"],
      answer: 1
    },
    {
      question: "In which year was the Berlin Wall torn down?",
      options: ["1961", "1972", "1989", "1991"],
      answer: 2
    },
    {
      question: "Who discovered America?",
      options: ["Christopher Columbus", "Amerigo Vespucci", "Ferdinand Magellan", "Leif Erikson"],
      answer: 0
    },
    {
      question: "Which Egyptian queen was known for her beauty and her role in politics?",
      options: ["Nefertiti", "Cleopatra", "Hatshepsut", "Ankhesenamun"],
      answer: 1
    }
  ],
  'Computer Science': [
    {
      question: "What does RAM stand for?",
      options: ["Random Access Memory", "Read Access Memory", "Random All Memory", "Read All Memory"],
      answer: 0
    },
    {
      question: "Who is considered the father of computers?",
      options: ["Bill Gates", "Steve Jobs", "Charles Babbage", "Alan Turing"],
      answer: 2
    },
    {
      question: "What is the main function of an operating system?",
      options: ["Manage hardware resources", "Run programs", "Store files", "Connect to the internet"],
      answer: 0
    },
    {
      question: "Which programming language is primarily used for Android app development?",
      options: ["Swift", "Java", "Kotlin", "Python"],
      answer: 2
    },
    {
      question: "What does HTML stand for?",
      options: ["HyperText Markup Language", "HyperTest Machine Language", "HighText Machine Language", "HyperTest Markup Language"],
      answer: 0
    }
  ]
};


const TOTAL_TIME = 10; // Set time limit per question (in seconds)

const Quiz: React.FC<QuizProps> = ({ category, onQuizFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME); // Timer state

  const currentQuestion = questionsByCategory[category][currentQuestionIndex];

  // Timer Effect
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion(); // Move to next question when time runs out
    }

    const timerId = setTimeout(() => {
      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId); // Cleanup on unmount
  }, [timeLeft]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
    if (index === currentQuestion.answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    setTimeLeft(TOTAL_TIME); // Reset timer for next question

    if (currentQuestionIndex < questionsByCategory[category].length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onQuizFinish(score);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>Time Left: {timeLeft} seconds</Text>
      <Question
        question={currentQuestion.question}
        options={currentQuestion.options}
        onSelectAnswer={handleAnswerSelect}
        selectedAnswer={selectedAnswer}
        showAnswer={showAnswer}
        correctAnswer={currentQuestion.answer}
      />
      {showAnswer && (
        <Button title="Next" onPress={handleNextQuestion} />
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: 'red',
  },
});
