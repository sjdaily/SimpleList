import React, { FC, useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Button, FlatList, View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faSpinner,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';
import AsyncStorage from '@react-native-community/async-storage';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type Props = {
  navigation: ListScreenNavigationProp;
};

const ListScreen: FC<Props> = ({ navigation }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = useCallback(async () => {
    try {
      const value = await AsyncStorage.getItem('entries');
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      setError(e);
    }
  }, []);

  const storeEntries = useCallback(async (updatedEntries) => {
    try {
      const jsonEntries = JSON.stringify(updatedEntries);
      await AsyncStorage.setItem('entries', jsonEntries);
    } catch (e) {
      setError(e);
    }
  }, []);

  const addEntry = useCallback(
    (entry) => {
      setLoading(true);
      setEntries([...entries, entry]);
      storeEntries(entries).then(() => {
        setLoading(false);
      });
    },
    [entries, storeEntries]
  );

  useEffect(() => {
    setLoading(true);
    fetchEntries().then((results) => {
      setEntries(results);
      setLoading(false);
    });
  }, [fetchEntries]);

  const displayWelcome = !loading && entries?.length === 0;
  const hasEntries = !loading && entries?.length > 0;

  const renderEntry = ({ entry }) => (
    <View>
      <Text>{entry.label}</Text>
      <Text>{entry.type}</Text>
      <Text>{entry.note}</Text>
      <Text>{entry.rating}</Text>
    </View>
  );

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

      {displayWelcome && (
        <View style={tailwind('items-center pt-20')}>
          <Text style={tailwind('text-xl text-gray-700 font-medium')}>
            Hello! Add your first entry to get started.
          </Text>
          <Button
            title="Add An Entry"
            onPress={() => navigation.navigate('Add')}
          />
        </View>
      )}

      {hasEntries && (
        <>
          <View style={tailwind('items-end pt-20')}>
            <Button
              title="Add An Entry"
              onPress={() =>
                navigation.navigate('Add', {
                  addEntry: addEntry
                })
              }
            />
          </View>
          <FlatList
            data={entries}
            renderItem={renderEntry}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default ListScreen;
