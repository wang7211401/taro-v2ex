import React from "react";
import { View, Text } from "@tarojs/components";
import Thread from "./thread";
import { Loading } from "./loading";
import VirtualList from "@tarojs/components/virtual-list";
import "./thread.css";

const Row = React.memo(({ thread }) => {
  console.log(thread);
  return (
    <Thread
      key={thread.id}
      node={thread.node}
      title={thread.title}
      last_modified={thread.last_modified}
      replies={thread.replies}
      tid={thread.id}
      member={thread.member}
    />
  );
});

class ThreadList extends React.Component {
  static defaultProps = {
    threads: [],
    loading: true,
  };

  render() {
    const { loading, threads } = this.props;

    if (loading) {
      return <Loading />;
    }

    const element = threads.map((thread, index) => {
      return (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
        />
      );
    });

    // const element = (
    //   <VirtualList
    //     height={800} /* 列表的高度 */
    //     width="100%" /* 列表的宽度 */
    //     itemData={threads} /* 渲染列表的数据 */
    //     itemCount={threads.length} /*  渲染列表的长度 */
    //     itemSize={100} /* 列表单项的高度  */
    //   >
    //     {Row}
    //   </VirtualList>
    // );

    return <View className="thread-list">{element}</View>;
  }
}

export { ThreadList };
