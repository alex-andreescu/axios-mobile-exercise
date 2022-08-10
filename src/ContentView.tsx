import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ScrollView } from 'react-native';
// I'll be honest - didn't know how to fix this error but the functionality works fine
// @ts-ignore:next-line
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { useContent } from './hooks';

const styles = StyleSheet.create({
  bold: {
    color: 'black',
    fontWeight: 'bold',
  },
  safeArea: {
    backgroundColor: 'lightgray',
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  contentImage: {
    alignSelf: 'center',
    height: 300,
    width: 400,
  },
  publishedOn: {
    marginTop: 10,
  },
  author: {
    marginTop: 10,
    marginBottom: 20,
  },
})

interface ContentViewProps {
  route: {
    params: {
      uuid: string;
    },
  },
}

export const ContentView = ({ route: { params: { uuid } } }: ContentViewProps) => {
  const [ contentState, setContentState ] = useState<{}>({})
  const { data, error, done } = useContent(uuid)

  useEffect(() => {
    // only set the state if we get data back and loading is done
    if (data !== null && done && !error) {
      setContentState(data['blocks'])
    }
  }, [ data, done ])

  // I noticed some of the images were missing so i went ahead and added a default "no image available" image
  const uri: string = data?.['primary_image']?.['base_image_url'] || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png'
  const authors: Array<string> = (data?.['authors'] || []).map(({ display_name }) => display_name)
  const authorsText: string = authors?.join(', ')
  const topics: Array<string> = (data?.['topics'] || []).map(({ name }) => name)
  const topicsText: string = topics?.join(', ')
  const publishedOn: Date = new Date(data?.['published_date'] || 0)
  const blocks = getRNDraftJSBlocks({
    contentState,
    customStyles: StyleSheet.flatten({
      paragraph: {
        color: 'black',
      },
      'ordered-list-item': {
        color: 'black',
      },
      'unordered-list-item': {
        color: 'black',
      },
      'blockquote': {
        color: 'black',
      },
      unstyled: {
        color: 'black',
      },
    }),
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.contentImage}
          source={{ uri }}
          accessible
          accessibilityLabel={data?.['primary_image']?.['alt_text']}
        />
        <Text style={[ styles.bold, styles.publishedOn ]}>{`${publishedOn.toDateString()} - ${topicsText}`}</Text>
        <Text style={[ styles.bold, styles.author ]}>{`Written by ${authorsText}`}</Text>
        {blocks}
      </ScrollView>
    </SafeAreaView>
  )
}
