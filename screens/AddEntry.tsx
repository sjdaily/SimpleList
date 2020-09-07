import React, { FC } from 'react';
import { SafeAreaView, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import tailwind from 'tailwind-rn';

import { RootStackParamList } from '../App';

type AddEntryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Add'
>;

type Props = {
  navigation: AddEntryScreenNavigationProp;
};

const AddEntryScreen: FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={tailwind('h-full bg-gray-500')}>
      <Button
        title="Back to List"
        onPress={() => navigation.navigate('List')}
      />
    </SafeAreaView>
  );
};

export default AddEntryScreen;
