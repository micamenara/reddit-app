import {
  faChartLine,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MenuContext from "context/MenuContext";
import useIsMobile from "hooks/useIsMobile";
import { useContext, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { PostStatusType, PostType } from "services/types/Posts";
import { AppState } from "store/types";
import chunkArray from "utils/chunkArray";
import styled, { css } from "styled-components";
import Button from "components/Button";
import Pagination from "components/Pagination";
import { Dispatch } from "redux";
import { updatePosts, updateSelectedPost } from "store/actions";
import { StyledMenu } from "components/Navbar";
import PostCard from "components/PostCard";
import useWindowSize from "hooks/useWindowSize";
import fadeOut from "styles/Animations/fade-out";

const ITEMS_PER_PAGE = 10;

declare type PostProps = {
  posts?: PostType[];
  handleUpdateSelecetdPost: (post: PostType) => void;
  handleUpdatePosts: (posts: PostType[]) => void;
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
    handleUpdatePosts: (posts: PostType[]) => {
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
  handleUpdatePosts,
}: PostProps) {
  const [activePage, setActivePage] = useState(0);
  const [chunks, setChunks] = useState<PostType[][]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setIsOpen, isOpen } = useContext(MenuContext);
  const { height } = useWindowSize();
  const ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  const isMobile = useIsMobile();

  useEffect(() => {
    const getFilteredPosts = () =>
      posts ? posts.filter((item) => item.data.status !== "dismissed") : [];

    if (posts) {
      const filtered = getFilteredPosts();
      const newChunks = posts ? chunkArray(filtered, ITEMS_PER_PAGE) : [];
      const page =
        activePage > newChunks.length - 1 ? newChunks.length - 1 : activePage;

      setFilteredPosts(filtered);
      setChunks(newChunks);
      setActivePage(page);
    }
  }, [posts, activePage]);

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

  const getPostData = (p: PostType, status: PostStatusType) => {
    return {
      ...p,
      data: {
        ...p.data,
        status: status,
      },
    };
  };

  const handleDelete = (post: PostType) => {
    const newPosts = posts
      ? posts.map((p) => {
          if (p.data.id === post.data.id) {
            return getPostData(p, "dismissed");
          }
          return p;
        })
      : [];
    handleUpdatePosts(newPosts);
  };

  const handleSelectedPost = (post: PostType) => {
    const newPosts = posts
      ? posts.map((p) => {
          if (p.data.id === post.data.id) {
            return getPostData(p, "readed");
          }
          return p;
        })
      : [];

    handleUpdateSelecetdPost(post);
    newPosts && handleUpdatePosts(newPosts);
    setIsOpen(false);
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
        {chunks && chunks.length > 0 ? (
          <PostsContent isDeleted={isDeleted}>
            {chunks[activePage] &&
              chunks[activePage].map((post: PostType, index) => (
                <PostCard
                  post={post}
                  key={index}
                  onClick={() => handleSelectedPost(post)}
                  onDelete={() => {
                    handleDelete(post);
                  }}
                />
              ))}
            <Pagination
              amountPerPage={ITEMS_PER_PAGE}
              totalItems={filteredPosts.length}
              activePage={activePage}
              onChange={(active) => setActivePage(active)}
            />
          </PostsContent>
        ) : (
          <NoContent>
            <FontAwesomeIcon icon={faExclamationCircle} size="lg" />
            No posts.
          </NoContent>
        )}
      </NavContent>
      {filteredPosts.length > 0 && (
        <ButtonContainer>
          <FullButton
            variant="primary"
            onClick={() => {
              setIsDeleted(true);
              setTimeout(() => {
                posts &&
                  handleUpdatePosts(
                    posts.map((post) => getPostData(post, "dismissed"))
                  );
              }, 300);
            }}
          >
            Dismiss all
          </FullButton>
        </ButtonContainer>
      )}
    </SideNavContainer>
  );
});

const SideNavContainer = styled.div<{ isMobile: boolean; height: number }>`
  width: 300px;
  min-width: 300px;
  position: relative;
  max-height: ${({ theme, isMobile, height }) =>
    isMobile ? `${height}px` : `calc(${height}px - ${theme.sizes.homeTitle})`};
`;

const PostsContent = styled.div<{ isDeleted: boolean }>`
  ${({ isDeleted }) =>
    isDeleted &&
    css`
      animation: ${fadeOut} 1s ease-out both;
    `}
`;

const Trending = styled.h6`
  margin: 0px;
`;

const NavContent = styled.div<{ isMobile: boolean; height: number }>`
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
  height: ${({ theme }) => theme.sizes.trending};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    margin-right: 0px;
  }
`;

const NoContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.gray1};
`;
