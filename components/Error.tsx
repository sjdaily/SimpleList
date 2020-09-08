import React, { FC } from 'react';
import { View, Text } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';

const Error: FC = () => {
  return (
    <View style={tailwind('flex-row')}>
      <FontAwesomeIcon icon={faExclamationTriangle} />
      <Text style={tailwind('ml-2')}>Oops! Something went wrong...</Text>
    </View>
  );
};

export default Error;
