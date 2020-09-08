import React, { FC, useCallback, useState } from 'react';
import {
  SafeAreaView,
  Button,
  View,
  TextInput,
  Text,
  TouchableHighlight
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faCookieBite,
  faBeer,
  faPizzaSlice,
  faCheese,
  faMeh,
  faSadTear,
  faGrinHearts,
  faSmile,
  faSpinner,
  faExclamationTriangle
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form Values
  const [label, setLabel] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [note, setNote] = useState(null);
  // const [ingredients, setIngredients] = useState([]);

  const entries = route.params?.entries ? route.params?.entries : [];
  const displayForm = !loading && !error;

  const storeEntries = useCallback(async (updatedEntries) => {
    try {
      const jsonEntries = JSON.stringify(updatedEntries);
      await AsyncStorage.setItem('entries', jsonEntries);
    } catch (e) {
      setError(e);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    setLoading(true);

    const entry = {
      label: label,
      type: type,
      rating: rating,
      note: note
      // ingredients: ingredients
    };

    const updatedEntries = [...entries, entry];
    storeEntries(updatedEntries).then(() => {
      navigation.navigate('List', {
        newEntry: true
      });
    });
  }, [label, type, rating, note, entries, storeEntries, navigation]);

  const addEntryForm = () => {
    return (
      <>
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
              <>
                <FontAwesomeIcon icon={faCheese} />
                <Text>Appetizer</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('main')}>
              <>
                <FontAwesomeIcon icon={faPizzaSlice} />
                <Text>Main</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('dessert')}>
              <>
                <FontAwesomeIcon icon={faCookieBite} />
                <Text>Dessert</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('drink')}>
              <>
                <FontAwesomeIcon icon={faBeer} />
                <Text>Drink</Text>
              </>
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
              <>
                <FontAwesomeIcon icon={faSadTear} />
                <Text>Awful</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('meh')}>
              <>
                <FontAwesomeIcon icon={faMeh} />
                <Text>Meh</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('decent')}>
              <>
                <FontAwesomeIcon icon={faSmile} />
                <Text>Decent</Text>
              </>
            </TouchableHighlight>
            <TouchableHighlight onPress={() => setType('amazing')}>
              <>
                <FontAwesomeIcon icon={faGrinHearts} />
                <Text>Amazing</Text>
              </>
            </TouchableHighlight>
          </View>
        </View>
        <Button title="Add Entry" onPress={handleSubmit} />
      </>
    );
  };

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-500')}>
      {loading && (
        <View style={tailwind('items-center')}>
          <FontAwesomeIcon icon={faSpinner} />
        </View>
      )}

      {error && (
        <View style={tailwind('items-center')}>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <Text>Oops! Something went wrong...</Text>
        </View>
      )}

      {displayForm && addEntryForm()}
    </SafeAreaView>
  );
};

export default AddEntryScreen;
