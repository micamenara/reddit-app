import styled from "styled-components";
import { useEffect, useState } from "react";
import getPosts from "services/getPosts";
import { PostType } from "services/types/Posts";
import SideNav from "components/SideNav";
import { connect } from "react-redux";
import { updatePosts, updateSelectedPost } from "store/actions";
import { Dispatch } from "redux";
import Post from "components/Post";
import MenuContext from "context/MenuContext";

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
)(function Home({
  handleUpdatePosts,
  handleUpdateSelecetdPost,
}: HomeProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const value = { isOpen, setIsOpen };

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        handleUpdatePosts(res.data.children);
        handleUpdateSelecetdPost(res.data.children[0]);
      }
    });
  }, [handleUpdatePosts, handleUpdateSelecetdPost]);

  return (
    <Section>
      <MenuContext.Provider value={value}>
        <HomeContent>
          <SideNav />
          <Post />
        </HomeContent>
      </MenuContext.Provider>
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
  
  @media (max-width: ${({theme}) => theme.breakpoints.tablet}) {
    flex-direction: column;
  }
`;
