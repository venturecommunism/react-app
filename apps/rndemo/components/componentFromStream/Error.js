import React from 'react';
import {
  View,
  Text
} from 'react-native'

const Error = ({ response, status }) => (
  <View>
    <Text>Oops!</Text>
    <Text style={{fontWeight: "bold"}}>
      {status}: {response.message}
    </Text>
    <Text>Please try searching again.</Text>
  </View>
);

export default Error;
