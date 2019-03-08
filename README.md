# qub engine + qub

Vanilla JS, PIXI-based 2D game engine, ready to be embedded as a React component.

![Logo](https://github.com/jgp1971/qub/blob/master/logo.png)

## Setup

1. Run 'create-react-app' to create your client folder.
2. Copy the 'engine' folder from root inside the 'src' folder of your client.
3. Import your Pixapp component into your default App component, and return it in its render.
4. Place your assets inside a new folder in public.
5. Follow the instructions in the StateDirector and SceneDirector to initialize states and scenes, and modify them directly to create your game logic.

## To do

0. Standarized createObject function in SceneDirector that takes 'destination' string and 'options' object.
1. StateDirector automatic load of all states in the state folder and addition of state functions.
2. StateDirector automatic load of all assets in the assets folder.
3. SceneDirector automatic load of external scene files from the scene folder.
4. Correct and complete colliding system.
5. Movable platform model.
6. Particles.
7. Adapt the managers to the react environment (event listeners not working, remnants from vanillajs)
8. Input manager.
9. JSON with ChangeScene conditions for each scene, with the events to listen to in each case, the scene to go and which objects to carry.
