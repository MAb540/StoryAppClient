import React, { useState } from "react";
import Nav from "./Component/utilityComponents/Nav";
import Sidebar from "./Component/utilityComponents/Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import StoryScreen from "./Component/Screens/StoryScreen";
import StoryDetailScreen from "./Component/Screens/StoryDetailScreen";
import AuthorDetailScreen from "./Component/Screens/AuthorDetailScreen";
import AuthorsScreen from "./Component/Screens/AuthorsScreen";
import Login from "./Component/UserComponents/Login";
import Register from "./Component/UserComponents/Register";
import Profile from "./Component/UserComponents/Profile";
import PrivateRoute from "./Component/utilityComponents/PrivateRoute";
import MyStoriesScreen from "./Component/Screens/MyStoriesScreen";
import WriteStoryScreen from "./Component/Screens/WriteStoryScreen";
import StoryUpdateScreen from "./Component/Screens/StoryUpdateScreen";
import { signout } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";

function App() {
  // 1 . side bar with links
  //  2 . cards for stories

  const [toggleOn, setToggleOn] = useState(false);

  const handleToggleClick = (e) => {
    setToggleOn(!toggleOn);
  };

  const dispatch = useDispatch();

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <Router>
      <div className="grid-container">
        <header>
          <Nav
            handleToggleClick={handleToggleClick}
            signoutHandler={signoutHandler}
          />
        </header>

        <main>
          {toggleOn && <Sidebar signoutHandler={signoutHandler} />}

          <section>
            <Switch>
              <Route exact path="/story/:id" component={StoryDetailScreen} />
              <Route path="/author/:authorId" component={AuthorDetailScreen} />

              <Route path="/authors" component={AuthorsScreen} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />

              <PrivateRoute path="/profile" component={Profile} />

              <PrivateRoute path="/mystories" component={MyStoriesScreen} />

              <PrivateRoute path="/write" component={WriteStoryScreen} />

              <PrivateRoute
                path="/story/update/:storyId"
                component={StoryUpdateScreen}
              />

              <Route exact path="/" component={StoryScreen} />
              <Redirect to="/" />
            </Switch>
          </section>
        </main>
      </div>
    </Router>
  );
}

export default App;
