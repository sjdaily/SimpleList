import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  Button,
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
    return (
      <View
        style={tailwind(
          'flex-row justify-between m-2 py-3 px-2 border-2 border-gray-400 rounded'
        )}>
        <Text>{item.label}</Text>
        <Text>{item.type}</Text>
        <Text>{item.note}</Text>
        <Text>{item.rating}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={tailwind('h-full bg-gray-500')}>
      {loading && <Loading />}
      {error && <Error />}

      {displayWelcome && (
        <View style={tailwind('items-center pt-20')}>
          <Text style={tailwind('text-xl text-gray-700 font-medium')}>
            Hello! Add your first entry to get started.
          </Text>
          <Button
            title="Add An Entry"
            onPress={() =>
              navigation.navigate('Add', {
                entries: entries
              })
            }
          />
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
              <View style={tailwind('bg-gray-400 mr-2 p-1 rounded')}>
                <FontAwesomeIcon icon={faPlusSquare} size={32} />
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
