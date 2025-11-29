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

# Backlog

## 1. Core MVP (Ship This First)
- [x] Take picture  
- [x] Send image to model (OpenAI API)
- [x] Parse result + classify (edible / poisonous)
- [x] Display result screen (simple, not pretty)
- [x] Add intermediate classification screen
- [ ] Save result to history
    - Decide where to store: SQLite / MMKV / File system
- [ ] Resize sent image to save on costs
- [ ] Add OpenAI API mock (save money during dev)
- [ ] Show history on home screen (or placeholder if no history)

## 2. Developer Experience (DX) Improvements
- [ ] Add error boundaries and loading states  
- [ ] Add logging for API failures  
- [ ] Add environment variable handling for Expo  
- [ ] Add simple internal API wrapper for OpenAI requests  

## 3. Navigation & Architecture
- [ ] Finalize screen structure: Home → Camera → Result → History
- [ ] Standardize file/folder structure in Expo Router
- [ ] Add constants folder (paths, routes, keys, env vars)

## 4. UI / UX (Basic, Not Fancy)
- [ ] Add placeholder image to home screen
- [ ] Add simple styling to buttons and screens
- [ ] Add loading animation while sending to model
- [ ] Show "Try Again" button on result screen
- [ ] Use NativeWind consistently (decide utility classes)

## 5. Mushroom Dataset (Future Feature)
- [ ] Find publicly available mushroom dataset (JSON, CSV, API)  
- [ ] Build simple local JSON DB  
- [ ] Implement basic mushroom search (name, color, type)  
- [ ] Store image references:
  - Option A: Local assets
  - Option B: Remote URLs

## 6. Optional Online API
(Do this only after MVP is shipped.)
- [ ] Create small online API with same dataset  
- [ ] Provide `/search` and `/mushroom/:id` endpoints  
- [ ] Deploy to low-cost hosting (Railway / Vercel)  
- [ ] Build matching simple website
- [ ] Move OpenAI API with a key here

## 7. Stretch Ideas (Not Required for MVP)
- [ ] On-device offline classification
- [ ] Detect mushroom species (not just edible/poisonous)
- [ ] Add geolocation to history entries (whole user-base map)
- [ ] Add share/export result

## 8. Personal Workflow / Productivity
- [ ] Keep 1–2 small tasks ready for low-energy days  
- [ ] Each day choose ONE non-negotiable task  
- [ ] Track actual time spent per task  
- [ ] Reflect daily (Wins, Challenges, Focus, Lessons, Tomorrow)

## 9. Learning & Docs
- [x] Study Expo Router docs https://docs.expo.dev/router/basics/notation/
- [x] Study Expo API routes https://docs.expo.dev/router/web/api-routes/#deployment

## 10. Marketing
- [ ] Study each screen of top 3 competitors
- [ ] Create beautiful UI (hire designer?)
- [ ] Marketing: reddit, quora, x, tt, yt, pinterest, instagram
- [ ] Define positioning sentence
  "A simple AI-powered mushroom identifier that tells you if your find is edible or dangerous."

## 11. UI / UX (Fancy)
- [ ] Add animations, interactions, haptics https://youtu.be/jSWuepkuFrU