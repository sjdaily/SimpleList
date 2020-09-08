import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  ListRenderItem,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { typeOptions, ratingOptions } from '../content/EntryOptions';

type ListScreenRouteProp = RouteProp<RootStackParamList, 'List'>;
type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type Props = {
  route: ListScreenRouteProp;
  navigation: ListScreenNavigationProp;
};

type Entry = {
  label: string;
  type: string | undefined;
  note: string | undefined;
  rating: string | undefined;
};

const ListScreen: FC<Props> = ({ route, navigation }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async () => {
    try {
      return await AsyncStorage.getItem('entries');
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchEntries().then((results) => {
      if (results !== null) {
        setEntries(JSON.parse(results));
      }
      setLoading(false);
    });
  }, [fetchEntries, route.params]);

  const displayWelcome = !loading && entries?.length === 0;
  const hasEntries = !loading && entries?.length > 0;

  const renderItem: ListRenderItem<Entry> = ({ item }) => {
    const matchingType = typeOptions.find((option) => {
      return option.typeLabel === item.type;
    });

    const matchingRating = ratingOptions.find((option) => {
      return option.ratingLabel === item.rating;
    });

    return (
      <View
        style={tailwind(
          'flex-row mx-2 mb-2 py-3 px-2 bg-gray-100 border-2 border-gray-400 rounded'
        )}>
        <View style={tailwind('mr-3')}>
          <FontAwesomeIcon
            icon={matchingRating.icon}
            color="#2d3748"
            size={36}
          />
        </View>
        <View style={tailwind('mr-3')}>
          <FontAwesomeIcon icon={matchingType.icon} color="#2d3748" size={36} />
        </View>
        <View style={tailwind('pr-2')}>
          <Text style={tailwind('font-medium text-xl')}>{item.label}</Text>
          <Text>{item.note}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-200')}>
      {loading && <Loading />}
      {error && <Error />}

      {displayWelcome && (
        <View style={tailwind('items-center pt-20')}>
          <Text style={tailwind('text-xl text-gray-800 font-medium')}>
            Hello! Add your first entry to get started.
          </Text>
          <TouchableHighlight
            onPress={() =>
              navigation.navigate('Add', {
                entries: entries
              })
            }>
            <View
              style={tailwind(
                'flex-row items-center mt-4 py-8 px-20 bg-gray-100 border border-2 border-gray-600 mr-2 rounded'
              )}>
              <FontAwesomeIcon icon={faPlusSquare} size={36} color="#718096" />
              <Text style={tailwind('text-gray-600 font-medium text-2xl ml-2')}>
                Add An Entry
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}

      {hasEntries && (
        <>
          <View style={tailwind('items-end pt-4 pb-2')}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('Add', {
                  entries: entries
                })
              }>
              <View style={tailwind('mr-2 p-1 rounded')}>
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  size={36}
                  color="#718096"
                />
              </View>
            </TouchableHighlight>
          </View>
          <FlatList
            data={entries}
            renderItem={renderItem}
            keyExtractor={(item) => item.label}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ListScreen;
