import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import SignInAndSignUpPage from "./components/sign-in-sign-up/sign-in-sign-up.component";
import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }
  unsuscribeFromAuth = null;

  componentDidMount() {
    // This give us a function that when we call, it closes the suscription(componentWillUnmount)
    this.unsuscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        // When we call the function crete...(only for googleSignUp), if it's the first time the user sign up, we store the data of the user.
        // Remember that this function returns userRef, and we need to wait beacuase it's assynchronus
        const userRef = await createUserProfileDocument(userAuth);
        // We obtain the snapshot object, where it's conatin the data of the user
        userRef.onSnapshot((snapShot) => {
          this.setState({
            currentUser: snapShot.id,
            // We pass the other properties, like email,etc
            ...snapShot.data(),
          });
        });
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }

  componentWillUnmount() {
    console.log("desmonte");
    // This closes the suscription
    this.unsuscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
