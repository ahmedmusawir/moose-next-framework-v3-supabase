import Page from "@/components/common/Page";
import Row from "@/components/common/Row";
import { Post } from "@/types/posts";
import Head from "next/head";
import React from "react";
// services/jsonsrvPostServices.ts
const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`;

export const getItems = async () => {
  //Fake delay to show page loading spinner
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 0,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
};

const DemoPageContent_full_page_loading = async () => {
  const posts: Post[] = await getItems();

  return (
    <>
      <Head>
        <title>Suspersion testing</title>
        <meta name="description" content="This is the demo page" />
      </Head>
      <Page className={""} FULL={false}>
        <Row className="prose max-w-3xl mx-auto">
          <h1 className="h1">This is for Loading and Suspension Testing</h1>
          <h2 className="h2">PRODUCTS:</h2>

          {posts?.map((post) => (
            <li className="dark:text-white">{post.title}</li>
          ))}
        </Row>
      </Page>
    </>
  );
};

export default DemoPageContent_full_page_loading;
