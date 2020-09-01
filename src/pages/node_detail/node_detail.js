import Taro, { getCurrentInstance } from "@tarojs/taro";
import React, { Component } from "react";
import { View } from "@tarojs/components";
import { ThreadList } from "../../components/thread_list";
import api from "../../utils/api";

import "./index.css";

class NodeDetail extends Component {
  state = {
    loading: true,
    threads: [],
  };

  componentWillMount() {
    const { full_name } = getCurrentInstance().router.params;
    Taro.setNavigationBarTitle({
      title: decodeURI(full_name),
    });
  }

  async componentDidMount() {
    const { short_name } = getCurrentInstance().router.params;
    try {
      const {
        data: { id },
      } = await Taro.request({
        url: api.getNodeInfo({
          name: short_name,
        }),
      });
      const res = await Taro.request({
        url: api.getTopics({
          node_id: id,
        }),
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

export default NodeDetail;
