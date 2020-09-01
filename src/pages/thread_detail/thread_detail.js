import Taro from "@tarojs/taro";
import React from "react";
import { connect } from "react-redux";
import { View, RichText, Image } from "@tarojs/components";
import Thread from "../../components/thread";
import { Loading } from "../../components/loading";
import api from "../../utils/api";
import { timeagoInst } from "../../utils";

import "./index.css";

function prettyHTML(str) {
  const lines = ["p", "h1", "h2", "h3", "h4", "h5", "h6"];
  lines.forEach((line) => {
    const regex = new RegExp(`<${line}`, "gi");
    str = str.replace(regex, `<${line} class="line"`);
  });

  return str.replace(/<img/gi, '<img class="img"');
}

class ThreadDetail extends React.Component {
  state = {
    loading: true,
    replies: [],
    content: "",
    thread: {},
  };

  config = {
    navigationBarTitleText: "话题",
  };

  async componentDidMount() {
    try {
      const id = this.props.thread.tid;
      console.log("id", id);

      const { data } = await Taro.request({
        url: api.getReplies({
          topic_id: id,
        }),
      });
      console.log(data);

      const content = await Taro.request({
        url: api.getTopics({
          id,
        }),
      });

      console.log(content);
      this.setState(
        {
          loading: false,
          replies: data,
          content: prettyHTML(content.data[0].content_rendered),
        },
        () => {
          console.log("replies", this.state.replies);
          console.log("content", this.state.content);
        }
      );
    } catch (error) {
      Taro.showToast({
        title: "载入远程数据错误",
      });
    }
  }

  render() {
    const { loading, replies, content } = this.state;
    const { thread } = this.props;
    const replieEl = replies.map((reply, index) => {
      const time = timeagoInst.format(reply.last_modified * 1000, "zh");
      return (
        <View className="reply" key={reply.id}>
          <Image src={reply.member.avatar_large} className="avatar" />
          <View className="main">
            <View className="author">{reply.member.username}</View>
            <View className="time">{time}</View>
            {/* <RichText nodes={reply.content} className='content' /> */}
            <View
              dangerouslySetInnerHTML={{ __html: reply.content }}
              className="content"
            ></View>
            <View className="floor">{index + 1} 楼</View>
          </View>
        </View>
      );
    });

    const contentEl = loading ? (
      <Loading />
    ) : (
      <View>
        <View className="main-content">
          <RichText nodes={content} />
        </View>
        <View className="replies">{replieEl}</View>
      </View>
    );

    return (
      <View className="detail">
        <Thread
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
          not_navi={true}
        />
        {contentEl}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { thread: state.thread };
}
export default connect(mapStateToProps)(ThreadDetail);
