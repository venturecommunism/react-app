import React, { Component } from 'react';

// import AutoComponents from '../../rncore/components/index'
// import RCTWebRTCDemo from '../../rndemo/components/RCTWebRTCDemo'
// import Demo from '../../rndemo/components/index'
// import TwitterPlus from '../../rntwitterplus/components/index'
// import WebRTCVideo from '../../webrtcvideo/components/index'

// import Module from '../../rncore/containers/module'
// const CreateTaskModule = Module('createtaskactions')

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import ScrollableTabContainer from 'react-native-scrollable-tab-view';
import ScrollableTabCard from './ScrollableTabCard';
import TopPad from './TopPad';
import TestMeteor from '../containers/TestMeteor';

import {
  MKTextField,
} from 'react-native-material-kit';

const Textfield = MKTextField.textfield()
  .withPlaceholder('Text...')
  .build();

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  card: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.1)',
    margin: 5,
    padding: 15,
    shadowColor: '#ccc',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
/*
  footer: {
    position: 'absolute',
    width: 200,
    right: 10,
    bottom: 10,
    backgroundColor:'#f5f5dc',
    height: 80
  },
*/
});

class MainPage extends Component {
  render() {
    return (
      <TopPad>
        <ScrollableTabContainer>
         <ScrollableTabCard tabLabel="Kickstarters">
{/* <AutoComponents />
<RCTWebRTCDemo />
<Demo /> */}
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Textfield />
            <TestMeteor />
          </ScrollableTabCard>
          <ScrollableTabCard tabLabel="Open Source">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollableTabCard>
          <ScrollableTabCard tabLabel="Learning">
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollableTabCard>
          <ScrollableTabCard tabLabel="Twitter Stream">
            {/* <TwitterPlus /> */}
          </ScrollableTabCard>
        </ScrollableTabContainer>
        <View style={styles.footer}>
          {/* <CreateTaskModule moduleid="createtask" /> */}
        </View>
      </TopPad>
    );
  }
}

export default MainPage;
