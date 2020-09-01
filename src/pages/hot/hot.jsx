import Taro from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import { ThreadList } from "../../components/thread_list";
import api from "../../utils/api";

import "./index.css";

class Hot extends Component {
  config = {
    navigationBarTitleText: "热门",
  };

  state = {
    loading: true,
    threads: [],
  };

  async componentDidMount() {
    try {
      const res = await Taro.request({
        url: api.getHotNodes(),
      });
      this.setState({
        threads: res.data,
        loading: false,
      });
    } catch (error) {
      Taro.showToast({
        title: "载入远程数据错误",
      });
    }
  }

  render() {
    const { loading, threads } = this.state;
    return (
      <View className="index">
        <ThreadList threads={threads} loading={loading} />
      </View>
    );
  }
}

export default Hot;
