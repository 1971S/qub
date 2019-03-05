# qub

A platforming game created with pixi.js

## Setup

1. Run create-react-app to create your client folder.
2. Copy the root engine folder inside the src folder of your client.
3. Import your pixapp component into your default App component, and render it.
4. Place your assets inside a new folder in public.
5. Follow the instructions in the StateDirector and SceneDirector to initialize states and scenes, and modify them directly to create your game logic.

## To do

1. StateDirector automatic load of all states in the state folder and addition of state functions.
2. StateDirector automatic load of all assets in the assets folder.
3. Scenes division in files and SceneDirector automatic load of all files in the scene folder.
4. Correct and complete colliding system.
5. Movable platform model.
6. Particles.
7. Adapt the managers to the react environment (event listeners not working, remnants from vanillajs)
8. Input manager.
9. JSON with ChangeScene conditions for each scene, with the events to listen to in each case, the scene to go and which objects to carry.