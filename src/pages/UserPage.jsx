import { Flex, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";
import Post from "../components/Post";
import UserHeader from "../components/UserHeader";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from "../hooks/useShowToast";
import ErrorPage from "./ErrorPage";

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);
      if (!user) return;

      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
        // if (data.error) {
        //   showToast("Error", data.error, "error");
        //   return;
        // }
      } catch (error) {
        showToast("Error", error.message, "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast, setPosts, user]);
  // console.log("posts is here and it is recoil state", posts);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!user && !loading) {
    navigate("/error");
  }

  return (
    <>
      <UserHeader user={user} />

      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}

      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;

/* <UserPost
likes={1200}
replies={481}
postImg="/post1.png"
postTitle="Let's talk about threads."
/>
<UserPost
likes={451}
replies={12}
postImg="/post2.png"
postTitle="Nice tutorial"
/>
<UserPost
likes={321}
replies={21}
postImg="/post3.png"
postTitle="I love this guy."
/>
<UserPost
likes={212}
replies={56}
postTitle="This is my first threads."
/> */
