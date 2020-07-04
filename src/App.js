import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import SignInAndSignUpPage from "./components/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsuscribeFromAuth = null;

  componentDidMount() {
    console.log(this.props);
    const { setCurrentUser } = this.props;
    // This give us a function that when we call, it closes the suscription(componentWillUnmount).
    // auth.onAuthStateChanged is like a listener, when the user log in or log out it's triggered.
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      console.log(userAuth);
      if (userAuth) {
        // When we call the function create...(only for googleSignUp), if it's the first time the user sign up, we store the data of the user.
        // Remember that this function returns userRef, and we need to wait beacuase it's assynchronus
        const userRef = await createUserProfileDocument(userAuth);
        // We obtain the snapshot object, where it's conatin the data of the user
        userRef.onSnapshot((snapShot) => {
          // This will be the payload(all the object)
          setCurrentUser({
            id: snapShot.id,
            // We pass the other properties, like email,etc
            ...snapShot.data(),
          });
        });
      } else {
        // if we dont have a signup user.
        setCurrentUser(userAuth);
      }
    });
  }

  componentWillUnmount() {
    // This closes the suscription
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          {/* if we want to make an if statement to know what component render, we can use render */}
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

// We want to give to our component the value of currentUser from the store.(it will be in the props of the component)
// We deconstruc user from the store object
const mapStateProps = ({ user }) => ({
  currentUser: user.currentUser,
});

// if we wan to change things in he store,we need to do this.
// !!The only way to trigger a state change is with dispatch,dispatch need a object as an argument, that contains the action.
// !We can define a function that returns an object with proerties that are functions, each one is going to change a part of the state(store).
const mapDispatchProps = (dispatch) => ({
  // whaterever you pass to dispatch is going to be an actional object in every reducer.
  // setCurrentUser, returns a object with an action and a payload, we need to pass a user.
  // dispatch is a function of the Redux store. You call store.dispatch to dispatch an action. This is the only way to trigger a state change.
  // https://react-redux.js.org/using-react-redux/connect-mapdispatch
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// Your mapDispatchToProps function should return a plain object:

// Each field in the object will become a separate prop for your own component, and the value should normally be a function that dispatches an action when called.
// The connect() function connects a React component to a Redux store
export default connect(mapStateProps, mapDispatchProps)(App);
// This will let us access to our methods to change the state, like setCurrentUser(), this will be in the props object
