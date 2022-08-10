import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, Text, Pressable } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useContent, useStream } from './hooks';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center',
  },
  listItem: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
  },
  listImage: {
    height: 105,
    width: 140,
  },
  headline: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: 'black',
  },
  headerButton: {
    fontSize: 11,
  },
});

interface StoryListItemProps {
  navigation: NativeStackNavigationProp<any>;
  uuid: string
}

interface StoryListProps {
  navigation: NativeStackNavigationProp<any>;
}

export const StoryListItem = ({ navigation, uuid }: StoryListItemProps) => {
  const { data } = useContent(uuid)

  const onPress = () => {
    navigation.navigate('ContentView', { uuid })
  }

  // I noticed some of the images were missing so i went ahead and added a default "no image available" image
  const uri: string = data?.['primary_image']?.['base_image_url'] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'

  return (
    <Pressable
      style={({ pressed }) => [
        // nice QoL for users to know that their press is happening
        { backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'lightgray' },
        styles.listItem,
      ]}
      onPress={onPress}
    >
      <Image
        style={styles.listImage}
        source={{ uri }}
        accessible
        accessibilityLabel={data?.['primary_image']?.['alt_text']}
      />
      <Text style={styles.headline} allowFontScaling>{data?.['headline']}</Text>
    </Pressable>
  )
}

export const StoryList = ({ navigation }: StoryListProps) => {
  const { data } = useStream()

  const renderItem = ({ item }) => {
    return <StoryListItem uuid={item} navigation={navigation} />
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={data?.['results']}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        // if no news stories are returned, let the user know via message
        ListEmptyComponent={<Text>No news stories returned</Text>}
      />
    </SafeAreaView>
  )
}
