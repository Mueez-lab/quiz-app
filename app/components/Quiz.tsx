import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Question from './Question';

// Define the type of a question
interface QuestionType {
  question: string;
  options: string[];
  answer: number; // Index of the correct answer in the options array
}

// Define the type for the questionsByCategory object
interface QuestionsByCategoryType {
  [key: string]: QuestionType[];
}

// Quiz component props
interface QuizProps {
  category: string;
  onQuizFinish: (score: number) => void;
}

// Questions organized by category
const questionsByCategory: QuestionsByCategoryType = {
  'General Knowledge': [
    {
      question: "What is the capital of France?",
      options: ["Paris", "Berlin", "Madrid", "Rome"],
      answer: 0,
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Mark Twain", "Shakespeare", "Dickens", "Austen"],
      answer: 1,
    },
    {
      question: "Which is the largest ocean?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: 2,
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      options: ["China", "Brazil", "USA", "Russia"],
      answer: 1,
    },
  ],
  'Science & Tech': [
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: 1,
    },
    {
      question: "What is the speed of light?",
      options: [
        "299,792,458 meters per second",
        "150,000 kilometers per second",
        "300,000,000 meters per second",
        "100,000 miles per second"
      ],
      answer: 0,
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "H2", "CO2"],
      answer: 0,
    },
    {
      question: "Which gas is most abundant in Earth's atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
      answer: 2,
    },
    {
      question: "What is the atomic number of carbon?",
      options: ["6", "8", "12", "14"],
      answer: 0,
    },
  ],
  'History': [
    {
      question: "Who was the first President of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
      answer: 1,
    },
    {
      question: "In which year did World War II end?",
      options: ["1941", "1945", "1946", "1950"],
      answer: 1,
    },
    {
      question: "What was the name of the ship that brought the Pilgrims to America?",
      options: ["Santa Maria", "Mayflower", "Pinta", "Nina"],
      answer: 1,
    },
    {
      question: "Who discovered America?",
      options: ["Christopher Columbus", "Leif Erikson", "Marco Polo", "Vasco da Gama"],
      answer: 0,
    },
    {
      question: "Which empire was ruled by Julius Caesar?",
      options: ["Greek", "Roman", "Ottoman", "Byzantine"],
      answer: 1,
    },
  ],
  'Computer Science': [
    {
      question: "What does RAM stand for?",
      options: ["Random Access Memory", "Read Access Memory", "Random All Memory", "Read All Memory"],
      answer: 0,
    },
    {
      question: "Who is considered the father of computers?",
      options: ["Bill Gates", "Steve Jobs", "Charles Babbage", "Alan Turing"],
      answer: 2,
    },
    {
      question: "Which programming language is known for web development?",
      options: ["Python", "C++", "JavaScript", "Swift"],
      answer: 2,
    },
    {
      question: "What does HTTP stand for?",
      options: ["Hypertext Transfer Protocol", "Hyperlink Transfer Protocol", "Home Transfer Protocol", "Host Transfer Protocol"],
      answer: 0,
    },
    {
      question: "Which company developed the Java programming language?",
      options: ["Microsoft", "Apple", "Oracle", "Sun Microsystems"],
      answer: 3,
    },
  ],
};

const TOTAL_TIME = 10; // Time limit per question (in seconds)

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
      handleNextQuestion(); // Move to the next question when time runs out
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
    setTimeLeft(TOTAL_TIME); // Reset timer for the next question

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