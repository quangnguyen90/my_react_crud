# Work with redux by using hooks

- useSelector()
- useDispatch()

0. Create project

- Purpose: Using create-react-app: npx create-react-app your_app_name_here

1. Setup redux store

- Reducer & Root reducer: check folder 'reducers'
- Store: check file 'src/store.js'
- Action creators: check folder 'actions'

2. Setup redux provider

- Purpose: Allow redux store to be accessible from anywhere of the app: check file 'src/index.js'

3. Connect to redux store from components

- Using the two hooks
- Check files:
  * src/App.js: Be careful when connecting redux from App.js. Each time state is changed, it will auto re-render app --> make website run slow. Only connect to redux with smart components
  * pages/Homepage.jsx
  * components/Home/HobbyList/index.jsx
  * reducers/hobby