import Head from "next/head";
import React, { Suspense } from "react";
import Loading from "./loading";
import Page from "@/components/common/Page";
import PostList from "./PostList";

const DemoPageContent = async () => {
  return (
    <>
      <Head>
        <title>Suspersion testing</title>
        <meta name="description" content="This is the demo page" />
      </Head>

      <Page className={""} FULL={false}>
        <h1 className="h1">The Moose is for Loading and Suspension Testing</h1>
        <h2 className="h2">POSTS:</h2>

        <Suspense fallback={<Loading />}>
          <PostList />
        </Suspense>
      </Page>
    </>
  );
};

export default DemoPageContent;
