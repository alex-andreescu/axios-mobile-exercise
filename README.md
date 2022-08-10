# Personal Notes
I made sure that this didn't take over the specified time limit

To run this on an iOS simulator or iOS device:
1. Run `npm install`
2. Run `cd ios && pod install && cd ..`
3. Run `react-native run-ios` or run it through xcode by opening up the .xcworkspace file

To run this on an Android device:
1. Run `npm install`
2. Make sure your device is registered through `adb devices`
3. Run `react-native run-android`

## Things I couldn't get to or lacked the time for
- I'm not too familiar with typescript so some of the time was spent doing realtime troubleshooting of errors
- Jest tests are currently only snapshots. Ideally i'd want to test the pressables/touchables and other side effects

## Things I did different than the instructions
- I tweaked the layout and background color to be more friendly to my eyes
- i didn't include the hamburger menu icon on the wireframe since there was no mention of a menu and i just opted not to mock a list of account options (this could be done in the future though)
- I moved the back button and Axios website links to the header of the individual story view rather than the bottom of the page - this one is just my preference since both of those are going to be sticky to the top of the page

## Things that I would improve on given more time and resources
- I would've liked to add better styling to the draftjs blocks to make them look better, but I opted to just leave it as the default styles
- Update jest test to not only include side effects but also empty/non-empty render examples for each applicable component or screen
- Adding in state management to store previously visited stories via mobx or redux (up to a certain limit i.e. 40 stories)
- expanding a bit on the above point, also adding in pagination via infinite scroll
- Lazyloading for the images that are not currently in view
- Better error handling and possibly filtering out stories that do not include images/headlines (currently only have a placeholder image in the event it is missing)




# Axios Mobile Excerise
Axios has a lot of award-winning journalism, and sometimes it doesn't all fit on one page, so we have to help readers easily find and read the stories they want. Your challenge is to build a mobile listicle view that displays various stories and navigates to the full view of the story.

## Before you start
We're not trying to get you to work for us for free, so please don't spend than more than 4 hours on this. You can write a `TODO` doc that explains how you'd complete any tasks you don't get to.

## What You're Building
Using Axios' own public API, build a mobile view that lists the latest 20 stories, along with an additional view to show the entirety of the story.

## Getting started
1. Fork this repo to begin the exercise.
2. Use React Native and rebuild the mocks in the PDF wireframe (`assets/wireframe.pdf`).
3. First make a call to the stream endpoint to retrieve an array of the 20 lastest story ids for Axios.com.
4. For each story id, make another call to the content endpoint to retrieve the data for each story.
5. For each story in the listicle view, display the following:
- The `headline` of the story.
- The `primary_image` of the story.
6. For each list item, link to a separate view that shows the full story and display the following:
- The `headline` of the story.
- The `display name` of the author.
- The `section label` of the story.
- The `primary_image` of the story.
- The `published date` of the story.
- The `body text` of the story. Note we store our body text as [DraftJS](https://draftjs.org). At a minimum, return the body as text.
### Bonus:
- Parse out the DraftJS to render the body text with HTML markup.
- Link out to Axios.com from the story view.
- Link back to the listicle view from the full story view.

## API Details

### Stream endpoint
https://api.axios.com/api/render/stream/content

This returns by default the UUIDs of about 10 stories, but the page size can be altered.

### Content endpoint
https://api.axios.com/api/render/content/c13dbda5-893d-46ba-ae6a-87ff8e34c74e

This returns the content and detail of one story, from its UUID.

## Suggestions
We tend to prefer functional components over classes, and hooks where necessary.

You can use any data fetching library you like. Fetch, Axios (heh) or SWR will all do just fine.

We care about accessibility. Please make your page as accessible as possible.

Building software is a collaborative process, so if you're feeling adventurous, feel free to diverge from the designs somewhat and apply your own creativity. Let us know about the choices you made, and why.

We like to us Jest already here for our unit tests. Add the amount of test coverage you feel is appropriate.

We use TypeScript at Axios. Bonus points if you define types and use them effectively to increase the reliability of your code.




