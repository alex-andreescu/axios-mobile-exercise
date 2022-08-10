import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Linking, Text, TouchableOpacity } from 'react-native';
import { ContentView } from './ContentView';
import { StoryList } from './StoryList';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StoryList">
        <Stack.Screen
          name="StoryList"
          component={StoryList}
          options={{ headerTitle: 'Stories' }}
        />
        <Stack.Screen
          name="ContentView"
          component={ContentView}
          options={{
            headerTitle: '',
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  const url: string = 'https://axios.com'

                  return Linking.openURL(url)
                }}
              >
                <Text style={{ color: 'blue' }}>Visit Axios.com</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
