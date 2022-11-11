import { GetServerSideProps } from "next";
import Head from "next/head";
import { getPrismicClient } from "../../services/Prismic";
import P from "@prismicio/client";
import { RichText } from "prismic-dom";
import styles from "./Style.module.scss";

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
};

interface IPostsProps {
  posts: Post[]
};

export default function Posts({ posts }: IPostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map(post => (
            <a key={post.slug} href="#">
              <time>{post.updatedAt}</time>
              <strong>{post.title}.</strong>
              <p>
                {post.excerpt}
              </p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetServerSideProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    P.predicates.at("document.type", "post")
  ], {
    fetch: ["post.title", "post.content"],
    pageSize: 100,
  });

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      excerpt: post.data.content.find(content => content.type === "paragraph")?.text ?? "",
      updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      })
    }
  });

  return {
    props: {
      posts
    }
  }
};