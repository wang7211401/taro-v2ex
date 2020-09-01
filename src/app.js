import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import "./app.scss";

const reducers = combineReducers({
  thread: (state = {}, action) => {
    if (action.type === "SET_CURRENT_THREAD") {
      return {
        ...state,
        ...action.thread,
      };
    }
    return state;
  },
});

const store = createStore(reducers);

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default App;
