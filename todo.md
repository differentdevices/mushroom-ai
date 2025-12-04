**Date: 2025-11-19**
Task Done: Create a brand-new Expo app and commit the empty project
Next Step: Add button and open camera
Energy (1-10): 4
Reward / Reflection: Got cold, hard to concentrate; did one simple task

**Date: 2025-11-20**
Task Done: Add button and open camera
Next Step: Take a picture using camera and store it
Energy (1-10): 6
Reward / Reflection: Tired, exhausted, but did it

**Date: 2025-11-21**
Task Done: Implement take a picture and add nativewind
Next Step: Rearrange screens: main, camera, result
Energy (1-10): 7
Reward / Reflection: Implemented task fast, so added nativewind (was hard)

**Date: 2025-11-23**
Task Done: Rearrange screens: main, camera, result
Next Step: Review RN documentation, pick and implement proper navigator
Energy (1-10): 7
Reward / Reflection: Skipped one day, but got back on track

**Date: 2025-11-24**
Task Done: 
- Review React Native documentation (navigation)
- Implement navigation based on Expo Router
- Add button to pick image from gallery
- Replace deprecated TouchableOpacity with Pressable
Next Step: Add OpenAI API integration (install lib, add env variable)
Energy (1-10): 9
Reward / Reflection: Understood diff between React Navigation and Expo Router

**Date: 2025-11-25**
Task Done: Add OpenAI API integration (install lib, add env variable)
Next Step: Add zod, switch to structured responses (see brainderot openai.ts)
Energy (1-10): 8
Reward / Reflection: Understood Expo API routes, connected to OpenAI

**Date: 2025-11-26**
Task Done:
- Add zod
- Add expo file lib
- Switch to structured responses
- Send image to OpenAI and get basic classification
Next Step: Get classification and show it on UI
Energy (1-10): 7
Reward / Reflection: Had a bit of struggle uploding images to OpenAI, but did it!

**Date: 2025-11-27**
Task Done: Get classification and show it on UI
Next Step: Add intermediate classification screen
Energy (1-10): 6
Reward / Reflection: Solid progress, readjusted MVP steps, progressing nicely

**Date: 2025-11-29**
Task Done:
- Study Expo Router docs
- Study Expo API routes
- Add intermediate classification screen
Next Step: Save result to history (image and classification json)
Energy (1-10): 7
Reward / Reflection: Took a break yesterday, today did 2 sessions (one off PC reading)

**Date: 2025-11-30**
Task Done:
- Skipped OpenAI API mock as API is cheap
- Decide which storage to use (MMKV vs AsynStorage)
- Define data types
- Save result to history
Next Step: Skip classification if image is already in history
Energy (1-10): 9
Reward / Reflection: Went to gym, feel refreshed

**Date: 2025-12-01**
Task Done: 
- Skip classification if image is already in history (ignore: too hard, need hashing)
- Persist image as picker saves to cache only
Next Step: Show limited history (last 10 items is fine or placeholder)
Energy (1-10): 7
Reward / Reflection: Felt distracted, did small 'filler' task

**Date: 2025-12-02**
Task Done: Show history of classifications
Next Step: Delete history item
Energy (1-10): 6
Reward / Reflection: Quite tired, but still did one item, proud of myself

**Date: 2025-12-03**
Task Done:
- Delete history item
- Resize sent image to save on costs
Next Step: Add error handling and loading states
Energy (1-10): 7
Reflection: Bit scared, did all MVP tasks. What is next?

**Date: 2025-12-04**
Task Done:
- [x] Add error handling and loading states
- [x] Add logging for API failures
- [x] Add environment variable handling for Expo
- [x] Add simple internal API wrapper for OpenAI requests
- [x] Finalize screen structure: Home → Camera → Result → History
- [x] Standardize file/folder structure in Expo Router
- [x] Add constants folder (paths, routes, keys, env vars)
Next Step: Find and download apps from 2–3 competitors
Energy (1-10): 8
Reflection: Cleaned up, polished code a bit; not sure what's next

# Backlog

## 1. [x] Core MVP (Ship This First)
## 2. [x] Learning & Docs
## 3. [x] Developer Experience (DX) Improvements
## 4. [x] Navigation & Architecture

## 5. Study Competitors (Flow and Design)
- [ ] Find and download apps from 2–3 competitors
- [ ] Take screenshots of their flow (screens, navigation)
- [ ] What actions users can take (save, share, retry...)

## 6. UI / UX
- [x] Add simple styling to buttons and screens
- [ ] Add placeholder image to home screen
- [ ] Add loading animation while sending to model
- [ ] Show "Try Again" button on result screen
- [ ] Add animations, interactions, haptics https://youtu.be/jSWuepkuFrU

## 7. Mushroom Dataset (Future Feature)
- [ ] Find publicly available mushroom dataset (JSON, CSV, API)  
- [ ] Build simple local JSON DB  
- [ ] Implement basic mushroom search (name, color, type)  
- [ ] Store image references:
  - Option A: Local assets
  - Option B: Remote URLs

## 8. Optional Online API
(Do this only after MVP is shipped.)
- [ ] Create small online API with same dataset  
- [ ] Provide `/search` and `/mushroom/:id` endpoints  
- [ ] Deploy to low-cost hosting (Railway / Vercel)  
- [ ] Build matching simple website
- [ ] Move OpenAI API with a key here

## 9. Stretch Ideas (Not Required for MVP)
- [ ] Add geolocation to history entries (whole user-base map)
- [ ] Add share result feature

## 10. Marketing
- [ ] How competitors are promoting on each platform: reddit, fb, li, tt, yt, insta, quora, x, google, etc.?
- [ ] What terms and language competitors are using?
- [ ] Do marketing myself: reddit, quora, x, tt, yt, pinterest, instagram
- [ ] Define positioning sentence
  "A simple AI-powered mushroom identifier that tells you if your find is edible or dangerous."

## 11. Deploy to Prod
- [ ] Deploy API to Expo
- [ ] Publish app to AppStore