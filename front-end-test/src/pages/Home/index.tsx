import styled from "styled-components";
import { useEffect, useState } from "react";
import getPosts from "services/getPosts";
import { PostType } from "services/types/Posts";
import PostsNav from "components/PostsNav";
import { connect } from "react-redux";
import { updatePost } from "store/actions";
import { Dispatch } from "redux";
import Post from "components/Post";
import Logo from "components/Logo";

declare type HomeProps = {
  onChange: (post: PostType) => void;
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onChange: (post: PostType) => {
      dispatch(updatePost(post));
    },
  };
};

export default connect(
  null,
  mapDispatchToProps
)(function Home({ onChange }: HomeProps): JSX.Element {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        onChange(res.data.children[0]);
        setPosts(res.data.children);
      }
    });
  }, [onChange]);

  return (
    <Section>
      <Title>
        <Logo width="32px" height="32px" />
        <h1>Reddit</h1>
      </Title>
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

const Title = styled.div`
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.sizes.homeTitle};
  > svg {
    margin-right: ${({ theme }) => theme.sizes.sm};
  }
`;
