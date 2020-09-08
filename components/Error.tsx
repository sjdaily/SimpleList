import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';

const Error: FC = () => {
  return (
    <View style={tailwind('flex-row items-center justify-center mt-16')}>
      <FontAwesomeIcon icon={faExclamationTriangle} size={32} color="#2d3748" />
      <Text style={tailwind('ml-2 text-gray-800 font-medium text-xl')}>
        Oops! Something went wrong...
      </Text>
    </View>
  );
};

export default Error;
