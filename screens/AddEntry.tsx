import React, { FC, useCallback, useState } from 'react';
import { SafeAreaView, Button, View, TextInput, Text, TouchableHighlight } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCookieBite,
  faBeer,
  faPizzaSlice,
  faCheese,
  faMeh,
  faSadTear,
  faGrinHearts,
  faSmile
} from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';

type AddEntryScreenRouteProp = RouteProp<RootStackParamList, 'Add'>;
type AddEntryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Add'
>;

type Props = {
  route: AddEntryScreenRouteProp;
  navigation: AddEntryScreenNavigationProp;
};

const AddEntryScreen: FC<Props> = ({ route, navigation }) => {
  const [label, setLabel] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [note, setNote] = useState(null);
  // const [ingredients, setIngredients] = useState([]);

  const { addEntry } = route.params;

  const handleSubmit = useCallback(() => {
    const entry = {
      label: label,
      type: type,
      rating: rating,
      note: note
      // ingredients: ingredients
    };

    addEntry(entry);
    navigation.navigate('List');
  }, [label, type, rating, note, addEntry, navigation]);

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-500')}>
      <form onSubmit={handleSubmit}>
        <View>
          <Text>Label:</Text>
          <TextInput
            onChangeText={(text: string) => setLabel(text)}
            value={label}
          />
        </View>

        <View>
          <Text>Type:</Text>
          <View>
            <TouchableHighlight onPress={() => setType('appetizer')}>
              <FontAwesomeIcon icon={faCheese} />
              <Text>Appetizer</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('main')}>
              <FontAwesomeIcon icon={faPizzaSlice} />
              <Text>Main</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('dessert')}>
              <FontAwesomeIcon icon={faCookieBite} />
              <Text>Dessert</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('drink')}>
              <FontAwesomeIcon icon={faBeer} />
              <Text>Drink</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View>
          <Text>Notes:</Text>
          <TextInput
            onChangeText={(text: string) => setNote(text)}
            value={note}
          />
        </View>

        <View>
          <Text>Rating:</Text>
          <View>
            <TouchableHighlight onPress={() => setRating('awful')}>
              <FontAwesomeIcon icon={faSadTear} />
              <Text>Awful</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('meh')}>
              <FontAwesomeIcon icon={faMeh} />
              <Text>Meh</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('decent')}>
              <FontAwesomeIcon icon={faSmile} />
              <Text>Decent</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('amazing')}>
              <FontAwesomeIcon icon={faGrinHearts} />
              <Text>Amazing</Text>
            </TouchableHighlight>
          </View>
        </View>
        <Button title="Add Entry" onPress={handleSubmit} />
      </form>
    </SafeAreaView>
  );
};

export default AddEntryScreen;
