import Taro, { eventCenter } from "@tarojs/taro";
import React from "react";
import { View, Text, Navigator, Image } from "@tarojs/components";
import { connect } from "react-redux";

import api from "../utils/api";
import { timeagoInst } from "../utils";

class Thread extends React.Component {
  handleNavigate = (id) => {
    const { tid, not_navi } = this.props;
    if (not_navi) {
      return;
    }
    // eventCenter.trigger(Thread_DETAL_NAVIGATE, this.props);
    this.props.setThread(this.props);

    Taro.navigateTo({
      url: "/pages/thread_detail/thread_detail",
    });
  };
  render() {
    console.log("props", this.props);
    const {
      title,
      member,
      last_modified,
      replies,
      node,
      not_navi,
    } = this.props;
    const time = timeagoInst.format(last_modified * 1000, "zh");
    const usernameCls = `author ${not_navi ? "bold" : ""}`;
    return (
      <View className="thread" onClick={this.handleNavigate}>
        <View className="info">
          <View>
            <Image src={member.avatar_large} className="avatar" />
          </View>
          <View className="middle">
            <View className={usernameCls}>{member.username}</View>
            <View className="replies">
              <Text className="mr10">{time}</Text>
              <Text>评论 {replies}</Text>
            </View>
          </View>
          <View className="node">
            <Text className="tag">{node.title}</Text>
          </View>
        </View>
        <Text className="title">{title}</Text>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setThread: (thread) => dispatch({ type: "SET_CURRENT_THREAD", thread }),
  };
};
export default connect(null, mapDispatchToProps)(Thread);
