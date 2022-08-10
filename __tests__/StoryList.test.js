import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow';
import { StoryList, StoryListItem } from '../src/StoryList'

jest.mock('../src/hooks', () => ({
  useStream: jest.fn(() => ({
    data: {
      results: [ '1234', '2345', '3456' ],
    },
    error: '',
    done: true,
  })),
  useContent: jest.fn(() => ({
    data: {
      primary_image: {
        base_image_url: 'www.google.com',
        alt_text: 'google',
      },
      headline: 'a headline',
    },
    error: '',
    done: true,
  })),
}))

describe('StoryListItem', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const uuid = '1234'
  const renderer = new ShallowRenderer();
  renderer.render(<StoryListItem navigation={navigation} uuid={uuid} />);
  const result = renderer.getRenderOutput();

  test('snapshot', () => {
    expect(result).toMatchSnapshot()
  })
})

describe('StoryList', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const renderer = new ShallowRenderer();
  renderer.render(<StoryList navigation={navigation} />);
  const result = renderer.getRenderOutput();

  test('snapshot', () => {
    expect(result).toMatchSnapshot()
  })
})
