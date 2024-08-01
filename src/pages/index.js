import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "@/store";
import Head from "next/head";

export default function Home({ dataBlog }) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  useEffect(() => {
    if (!data) {
      dispatch(fetchData());
    }
  }, [data, dispatch]);

  const pageTitle = dataBlog.length > 0 ? dataBlog[0].title : "Default Title";
  const pageDescription =
    dataBlog.length > 0
      ? `Read more about ${dataBlog[0].description}`
      : "Default description";
  const baseImgUrl = dataBlog.length > 0 ? dataBlog[0].image : "Default Image";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Head>
        {/* <!-- Primary Meta Tags --> */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageTitle} />

        {/* <!-- Open Graph / Facebook --> */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={baseImgUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={baseImgUrl} />
        {/* 
      <!-- Twitter --> */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={baseImgUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={baseImgUrl} />

        {/* <!-- Meta Tags Generated with https://metatags.io --> */}

        <meta name="description" content={pageDescription} />
      </Head>
      <h1>Data from API lagi testing</h1>
      {dataBlog.map((item, index) => (
        <h2 key={index}>{item.title}</h2>
      ))}
    </>
  );
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/course`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
  });

  const dataBlog = await response.json();
  return {
    props: { dataBlog },
  };
}
