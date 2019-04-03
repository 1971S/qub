<p align="center">
  <img src="https://github.com/jgp1971/qub/blob/master/logo.png" width="500px" />
</p>

> A PixiJS-powered, Vanilla JS 2D game engine, for creating interactive content exportable as React components.

## Getting started

1. Clone the repo

```
$ git clone https://github.com/1971S/qub.git
```

2. Install dependencies

```
$ npm install
```

3. Create your react application

```
$ create-react-app my-game-app
```

4. Copy the 'engine' folder from qub's root to the 'src' folder of your react app.

5. Import and use your Pixapp component into your default App component.

6. Place your assets inside a new folder in public.

7. Follow the instructions in the StateDirector and SceneDirector to initialize states and scenes, and modify them directly to create your game logic.

## FAQ

### Is there a roadmap of tasks to do next?

1. Standarized createObject function in SceneDirector that takes 'destination' string and 'options' object.
2. StateDirector automatic load of all states in the state folder and addition of state functions.
3. StateDirector automatic load of all assets in the assets folder.
4. SceneDirector automatic load of external scene files from the scene folder.
5. Correct and complete colliding system.
6. Movable platform model.
7. Particles.
8. Adapt the managers to the react environment (event listeners not working, remnants from vanillajs)
9. Input manager.
10. JSON with ChangeScene conditions for each scene, with the events to listen to in each case, the scene to go and which objects to carry.

## Contributing

Any contribution is welcome, just fork the repository and do your thing. Then submit a pull request pointing to this repo.

## Authors

- Julián González - [GitHub](https://github.com/1971S) [LinkedIn](https://www.linkedin.com/in/jgpicatoste/)

## License

This project is licensed under the MIT License.