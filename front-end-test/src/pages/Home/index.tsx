import styled from "styled-components";
import Button from "components/Button";
import { useEffect, useState } from "react";
import getPosts from "services/getPosts";
import { Post } from "services/types/Posts";
import PostsNav from "components/PostsNav";

export default function Home(): JSX.Element {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getPosts().then((res) => {
      if (res) {
        console.log(res)
        setPosts(res.data.children);
      }
    });
  }, []);

  return (
    <Section>
      <h1>Home page</h1>
      <Button>Button</Button>
      <PostsNav posts={posts} />
    </Section>
  );
}

const Section = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  padding: 12px;
  margin: auto;
`;
