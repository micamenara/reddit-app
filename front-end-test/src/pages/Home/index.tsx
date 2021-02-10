import styled from "styled-components";
import { useEffect, useState } from "react";
import getPosts from "services/getPosts";
import { PostType } from "services/types/Posts";
import PostsNav from "components/PostsNav";
import { connect } from "react-redux";
import { updatePosts, updateSelectedPost } from "store/actions";
import { Dispatch } from "redux";
import Post from "components/Post";
import Navbar from "components/Navbar";

declare type HomeProps = {
  handleUpdatePosts: (post: PostType[]) => void;
  handleUpdateSelecetdPost: (post: PostType) => void;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleUpdatePosts: (posts: PostType[]) => {
      dispatch(updatePosts(posts));
    },
    handleUpdateSelecetdPost: (post: PostType) => {
      dispatch(updateSelectedPost(post));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(function Home({ handleUpdatePosts, handleUpdateSelecetdPost }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        handleUpdatePosts(res.data.children);
        handleUpdateSelecetdPost(res.data.children[0]);
        setPosts(res.data.children);
      }
    });
  }, [handleUpdatePosts, handleUpdateSelecetdPost]);

  return (
    <Section>
      <Navbar />
      <HomeContent>
        <PostsNav posts={posts} />
        <Post />
      </HomeContent>
    </Section>
  );
});

const Section = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 1200px;
  padding: ${({ theme }) => theme.sizes.sm};
  margin: auto;
`;

const HomeContent = styled.div`
  display: flex;
  flex-direction: row;
`;