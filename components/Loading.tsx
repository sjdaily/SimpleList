import React, { FC } from 'react';
import { View, ActivityIndicator } from 'react-native';
import tailwind from 'tailwind-rn';

const Loading: FC = () => {
  return (
    <View style={tailwind('items-center mt-16')}>
      <ActivityIndicator size="large" color="#2d3748" />
    </View>
  );
};

export default Loading;
