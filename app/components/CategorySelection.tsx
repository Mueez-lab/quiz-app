import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface CategorySelectionProps {
  onSelectCategory: (category: string) => void;
}

const categories = [
  'General Knowledge',
  'Science & Tech',
  'History',
  'Computer Science'
];

const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelectCategory }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Quiz Category</Text>
      {categories.map((category) => (
        <Button
          key={category}
          title={category}
          onPress={() => onSelectCategory(category)}
        />
      ))}
    </View>
  );
};

export default CategorySelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
