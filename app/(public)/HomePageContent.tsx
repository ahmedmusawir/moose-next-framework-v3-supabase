import Page from "@/components/common/Page";
import Row from "@/components/common/Row";
import Head from "next/head";
import React from "react";

const HomePageContent = () => {
  return (
    <>
      <Head>
        <title>HomePageContent</title>
        <meta name="description" content="This is the home page" />
      </Head>
      <Page className={""} FULL={false}>
        <Row className="prose max-w-3xl mx-auto">
          <h1 className="h1">Home Page (Public)</h1>
          <h2 className="h2">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h2>
          <h3 className="h3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit
          </h3>
          <p className="dark:text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            molestias pariatur earum praesentium tempore natus asperiores alias
            facere delectus ullam? At in ducimus et delectus, autem veniam quas
            natus quam?
          </p>
        </Row>
      </Page>
    </>
  );
};

export default HomePageContent;
