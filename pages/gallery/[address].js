import Error from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Collections from "../../components/collections";
import getOpenSeaData from "../../lib/getOpenSeaData";
import { ADDRESS } from "../../utils";
import { Fragment } from "react";

const Spinner = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83">
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 12 12"
        to="360 12 12"
        dur="1s"
        repeatCount="indefinite"
      />
    </path>
    <style jsx>{`
      svg {
        vertical-align: middle;
        margin: 0 auto;
      }
    `}</style>
  </svg>
);

export async function getStaticPaths() {
  return { paths: [], fallback: true };
}

export async function getStaticProps({ params }) {
  const { address } = params;

  if (!ADDRESS.test(address)) {
    return {
      revalidate: 1,
      props: {},
    };
  }

  try {
    return {
      revalidate: 1,
      props: await getOpenSeaData(address),
    };
  } catch (error) {
    console.error(error);

    return {
      revalidate: 1,
      props: {},
    };
  }
}

export default function Gallery({ data }) {
  const { isFallback } = useRouter();

  if (!isFallback && !data) {
    return <Error statusCode={404} title="This address could not be found" />;
  }

  if (isFallback)
    return (
      <main>
        <Head>
          <title>Static NFT Gallery</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Spinner />
      </main>
    );

  return (
    <div className="m-6 lg:flex lg:space-x-6">
      <Head>
        <title>Static NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <aside className="lg:w-1/4 mb-6 lg:mb-0">
        <div className="p-3 rounded-2xl bg-gray-900 text-white">
          <ul
            className="space-y-3 rounded-xl overflow-scroll scrolling-touch"
            style={{ maxHeight: "50vh" }}
          >
            {data.map((collection, i) => (
              <li key={i}>
                <a
                  className="p-5 rounded-xl bg-gray-800 hover:bg-gray-700 focus:bg-gray-700 outline-none transition-color duration-150 leading-none tracking-wide whitespace-no-wrap flex justify-between"
                  href={`#${collection.name}`}
                >
                  <p>{collection.name}</p>
                  <p className="ml-4">{collection.assets.length}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <main className="flex-1">
        <ul>
          {data.map(({ name, assets }, i) => (
            <li id={name} key={i} className="mb-12">
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {assets.map((asset, j) => (
                  <li
                    key={j}
                    className="self-start bg-gray-100 rounded-xl p-2"
                    style={{
                      boxShadow: "inset 0 0 0 1px rgba(26, 32, 44, 0.1)",
                      backgroundColor:
                        asset.background_color === "000000"
                          ? ""
                          : `#${asset.background_color}`,
                    }}
                  >
                    <img
                      src={asset.image_url}
                      alt={asset.name}
                      style={{ borderRadius: "0.625rem" }}
                    />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
