jest.mock('react-native-draftjs-render', () => jest.fn())

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow';
import { ContentView } from '../src/ContentView'

jest.mock('../src/hooks', () => ({
  useContent: jest.fn(() => ({
    data: {
      primary_image: {
        base_image_url: 'www.google.com',
        alt_text: 'google',
      },
      authors: [
        {
          display_name: 'Alex Andreescu',
        },
      ],
      topics: [
        {
          name: 'Technology',
        },
      ],
      published_date: new Date(0),
      headline: 'a headline',
      blocks: {},
    },
    error: '',
    done: true,
  })),
}))

describe('StoryList', () => {
  const route = {
    params: {
      uuid: '1234',
    },
  }
  const renderer = new ShallowRenderer();
  renderer.render(<ContentView route={route} />);
  const result = renderer.getRenderOutput();

  test('snapshot', () => {
    expect(result).toMatchSnapshot()
  })
})
