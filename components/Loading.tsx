import React, { FC } from 'react';
import { View } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import tailwind from 'tailwind-rn';

const Loading: FC = () => {
  return (
    <View style={tailwind('items-center')}>
      <FontAwesomeIcon icon={faSpinner} />
    </View>
  );
};

export default Loading;
