import React from 'react';
import {
  View,
  Text
} from 'react-native'

const Component = ({
  login,
  avatar_url,
  name,
  public_repos,
  public_gists,
  followers
}) => (
  <View>
    <Text>{login} {avatar_url} {name} {public_repos} {public_gists} {followers}</Text>
  </View>
);

export default Component;
