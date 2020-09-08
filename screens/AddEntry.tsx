import React, { FC, useCallback, useState } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  TouchableHighlight
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { typeOptions, ratingOptions } from '../content/EntryOptions';

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

  const [label, setLabel] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(null);
  const [note, setNote] = useState(null);

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
    };

    const updatedEntries = [...entries, entry];
    storeEntries(updatedEntries).then(() => {
      navigation.navigate('List', {
        newEntry: true
      });
    });
  }, [label, type, rating, note, entries, storeEntries, navigation]);

  const TypeButton = (
    typeLabel: string,
    icon: IconDefinition,
    index: number
  ) => {
    return (
      <TouchableHighlight onPress={() => setType(typeLabel)} key={index}>
        <View
          style={tailwind(
            'items-center border border-gray-400 rounded mx-2 mb-2 py-8 bg-gray-100'
          )}>
          <FontAwesomeIcon icon={icon} color="#2d3748" size={40} />
          <Text style={tailwind('text-lg font-medium pt-3 text-gray-800')}>
            {typeLabel}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  const RatingButton = (
    ratingLabel: string,
    icon: IconDefinition,
    index: number
  ) => {
    return (
      <TouchableHighlight onPress={() => setRating(ratingLabel)} key={index}>
        <View
          style={tailwind(
            'items-center border border-gray-400 rounded mx-2 mb-2 py-8 bg-gray-100'
          )}>
          <FontAwesomeIcon icon={icon} color="#2d3748" size={40} />
          <Text style={tailwind('text-lg font-medium pt-3 text-gray-800')}>
            {ratingLabel}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-200')}>
      {loading && <Loading />}
      {error && <Error />}

      {displayForm && (
        <View style={tailwind('pt-10')}>
          {!type && (
            <>
              <Text
                style={tailwind('text-xl pl-2 pb-3 text-gray-800 font-medium')}>
                What did you have?
              </Text>
              <View style={tailwind('')}>
                {typeOptions.map((option, index) => {
                  return TypeButton(option.typeLabel, option.icon, index);
                })}
              </View>
            </>
          )}

          {type && !rating && (
            <>
              <Text
                style={tailwind('text-xl pl-2 pb-3 text-gray-800 font-medium')}>
                How was it?
              </Text>
              <View>
                {ratingOptions.map((option, index) => {
                  return RatingButton(option.ratingLabel, option.icon, index);
                })}
              </View>
            </>
          )}

          {type && rating && (
            <>
              <Text
                style={tailwind('text-xl pl-2 pb-3 text-gray-800 font-medium')}>
                Add a name for your{' '}
                <Text style={tailwind('lowercase')}>{type}:</Text>
              </Text>
              <TextInput
                onChangeText={(text: string) => {
                  if (text.length === 0) {
                    text = null;
                  }
                  return setLabel(text);
                }}
                value={label}
                maxLength={25}
                style={tailwind(
                  'bg-white border mx-2 py-8 px-2 text-xl rounded text-gray-800'
                )}
              />
            </>
          )}

          {type && label && rating && (
            <>
              <View style={tailwind('mx-2 my-10')}>
                <Text style={tailwind('text-xl text-gray-800 font-medium')}>
                  Would you like to add any notes?
                </Text>
                <TextInput
                  onChangeText={(text: string) => {
                    if (text.length === 0) {
                      text = null;
                    }
                    return setNote(text);
                  }}
                  value={note}
                  maxLength={30}
                  style={tailwind(
                    'bg-white border py-8 px-2 mt-3 text-xl rounded text-gray-800'
                  )}
                />
              </View>
              <TouchableHighlight onPress={handleSubmit}>
                <View
                  style={tailwind(
                    'bg-gray-800 mx-2 py-8 items-center rounded'
                  )}>
                  <Text style={tailwind('text-gray-300 text-xl')}>
                    Add Entry
                  </Text>
                </View>
              </TouchableHighlight>
            </>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default AddEntryScreen;
