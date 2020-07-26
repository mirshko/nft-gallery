import Error from "next/error";
import { useRouter } from "next/router";
import Collections from "../../components/collections";
import fetchCollections from "../../lib/fetchCollections";
import { ADDRESS, shortenHex } from "../../utils";
import Link from "next/link";
import Head from "next/head";

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
      unstable_revalidate: 1,
      props: {},
    };
  }

  try {
    const collections = await fetchCollections(address);

    return {
      unstable_revalidate: 1,
      props: collections ? { collections } : {},
    };
  } catch (error) {
    console.error(error);

    return {
      unstable_revalidate: 1,
      props: {},
    };
  }
}

export default function Gallery({ collections }) {
  const { isFallback, query } = useRouter();

  if (!isFallback && !collections) {
    return <Error statusCode={404} title="This address could not be found" />;
  }

  return (
    <div className="container">
      <Head>
        <title>Static NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <Link href="/">
            <a>{isFallback ? "Loading" : shortenHex(query.address)}</a>
          </Link>
        </h1>

        {isFallback ? <Spinner /> : <Collections data={collections} />}
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx global>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0 0 4rem 0;
          line-height: 1;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .logo {
          height: 1em;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
