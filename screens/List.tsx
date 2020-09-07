import React, { FC } from 'react';
import { SafeAreaView, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';

type ListScreenNavigationProp = StackNavigationProp<RootStackParamList, 'List'>;

type Props = {
  navigation: ListScreenNavigationProp;
};

const ListScreen: FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={tailwind('h-full bg-gray-500')}>
      <Button title="Add An Entry" onPress={() => navigation.navigate('Add')} />
    </SafeAreaView>
  );
};

export default ListScreen;
