import { useQuery } from "@tanstack/react-query";

import styles from "./styles/PostList.module.css";

import { getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/numbers";

function PostList() {
  const { data, isLoading } = useQuery(["get-post-list"], getPosts);

  console.log(data);
  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>اگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
