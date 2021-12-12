import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {useDispatch} from 'react-redux';
import {quizActions} from '../store';

const difficultyLevels = ['easy', 'medium', 'hard'];

const UserChoice = () => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('https://opentdb.com/api_category.php');
      const loadedCategories = response.data.trivia_categories;
      const filteredCategories = loadedCategories.map(
        category => category.name,
      );
      setCategories(filteredCategories);
    };
    fetchCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  const categorySelectHandler = index => {
    dispatch(quizActions.setCategory(index + 8));
  };

  const difficultySelectHandler = index => {
    dispatch(quizActions.setDifficulty(String(difficultyLevels[index])));
  };

  return (
    <View style={styles.inputContainer}>
      {categories && categories.length > 0 && (
        <>
          <View style={styles.selectContainer}>
            <Text style={styles.label}>Select Category</Text>
            <ModalDropdown
              style={styles.selectInput}
              textStyle={styles.selectText}
              dropdownStyle={styles.selectDropDown}
              defaultValue="General"
              options={categories}
              onSelect={categorySelectHandler}
            />
          </View>
          <View style={styles.selectContainer}>
            <Text style={styles.label}>Select Difficulty</Text>
            <ModalDropdown
              style={styles.selectInput}
              textStyle={styles.selectText}
              dropdownStyle={styles.selectDropDown}
              defaultValue="easy"
              options={difficultyLevels}
              onSelect={difficultySelectHandler}
            />
          </View>
        </>
      )}
      {!categories ||
        (categories.length === 0 && (
          <ActivityIndicator color="#fff" size="large" />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#344cb7',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    marginTop: 40,
  },
  selectContainer: {
    marginVertical: 2,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectInput: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  selectText: {
    color: '#344cb7',
  },
  selectDropDown: {
    width: '60%',
  },
});

export default UserChoice;
