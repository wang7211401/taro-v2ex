import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View, Image } from "@tarojs/components";
import url from "../resource/spiner.gif";
import "./loading.css";

class Loading extends Component {
  render() {
    return (
      <View className="loading">
        <Image src={url} className="img" />
      </View>
    );
  }
}

export { Loading };
