import {
  faChartLine,
  faSpinner,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuContext from "context/MenuContext";
import useIsMobile from "hooks/useIsMobile";
import { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { PostType } from "services/types/Posts";
import { AppState } from "store/types";
import chunkArray from "utils/chunkArray";
import styled from "styled-components";
import Button from "components/Button";
import Pagination from "components/Pagination";
import { Dispatch } from "redux";
import { updatePosts, updateSelectedPost } from "store/actions";
import { StyledMenu } from "components/Navbar";
import PostCard from "components/PostCard";
import useWindowSize from "hooks/useWindowSize";

const ITEMS_PER_PAGE = 10;

declare type PostProps = {
  posts?: PostType[];
  handleUpdateSelecetdPost: (post: PostType) => void;
  handleDeletePost: (posts: PostType[]) => void;
};

const mapStateToProps = (state: AppState) => {
  return {
    posts: state?.app?.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, state: AppState) => {
  return {
    handleUpdateSelecetdPost: (post: PostType) => {
      dispatch(updateSelectedPost(post));
    },
    handleDeletePost: (posts: PostType[]) => {
      dispatch(updatePosts(posts));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(function Posts({
  posts,
  handleUpdateSelecetdPost,
  handleDeletePost,
}: PostProps) {
  const [activePage, setActivePage] = useState(0);
  const { setIsOpen, isOpen } = useContext(MenuContext);
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const isMobile = useIsMobile();
  const { height } = useWindowSize();

  const getItems = () => {
    const chunks = posts ? chunkArray(posts, ITEMS_PER_PAGE) : [];
    return chunks[activePage] as PostType[];
  };

  useEffect(() => {
    const handleClickOutside = (ev: MouseEvent) => {
      if (ref.current && !ref.current?.contains(ev.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setIsOpen]);

  const handleDelete = (post: PostType) => {
    const newPosts = posts
      ? posts.filter(
          (postData) => postData.data.subreddit_id !== post.data.subreddit_id
        )
      : [];
    handleDeletePost(newPosts);
  };

  return (
    <SideNavContainer isMobile={isMobile} height={height} ref={ref}>
      <Header>
        <Trending>
          <FontAwesomeIcon icon={faChartLine} size="lg" /> TRENDING ON REDDIT
        </Trending>
        {isMobile && (
          <StyledMenu
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </StyledMenu>
        )}
      </Header>
      <NavContent isMobile={isMobile} height={height}>
        {posts && posts.length > 0 ? (
          <div>
            {getItems().map((post: PostType, index) => (
              <PostCard
                post={post}
                key={index}
                onClick={() => {
                  handleUpdateSelecetdPost(post);
                  setIsOpen(false);
                }}
                onDelete={() => handleDelete(post)}
              />
            ))}
            <Pagination
              amountPerPage={ITEMS_PER_PAGE}
              totalItems={posts.length}
              onChange={(active) => setActivePage(active)}
            />
          </div>
        ) : (
          <FontAwesomeIcon icon={faSpinner} pulse size="lg" />
        )}
      </NavContent>
      <ButtonContainer>
        <FullButton variant="primary">Dismiss all</FullButton>
      </ButtonContainer>
    </SideNavContainer>
  );
});

const SideNavContainer = styled.div<{ isMobile: boolean, height: number}>`
  width: 300px;
  min-width: 300px;
  position: relative;
  max-height: ${({ theme, isMobile, height }) =>
    isMobile ? `${height}px` : `calc(${height}px - ${theme.sizes.homeTitle})`};
`;

const Trending = styled.h6`
  margin: 0px;
`;

const NavContent = styled.div<{ isMobile: boolean, height: number }>`
  overflow: auto;
  height: ${({ theme, isMobile, height }) =>
    isMobile
      ? `calc(${height}px - ${theme.sizes.trending} - ${theme.sizes.sm} - ${theme.sizes.sm})`
      : `calc(${height}px - ${theme.sizes.homeTitle} - ${theme.sizes.trending} - ${theme.sizes.sm} - ${theme.sizes.sm})`};
  padding-bottom: 40px;
`;

const FullButton = styled(Button)`
  width: 100%;
`;
const ButtonContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0px;
  padding: 2px;
  background-color: ${({ theme }) => theme.colors.dark};
`;

const Header = styled.div`
  padding: ${({ theme }) => `0px ${theme.sizes.sm}`};
  height: ${({ theme }) => theme.sizes.trending};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    margin-right: 0px;
  }
`;
