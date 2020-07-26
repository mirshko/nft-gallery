import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ADDRESS } from "../utils";

export default function Home() {
  const { push } = useRouter();
  const { handleSubmit, register, formState, errors } = useForm();

  const { isSubmitting } = formState;

  const onSubmit = async (data) => {
    const { address } = data;

    await push("/gallery/[address]", `/gallery/${address}`);
  };

  return (
    <div className="container">
      <Head>
        <title>Static NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Static NFT Gallery</h1>

        <form onSubmit={handleSubmit(onSubmit)} action="POST">
          <div className="flex">
            <input
              disabled={isSubmitting}
              id="address"
              name="address"
              placeholder="Your Ethereum Address"
              aria-describedby="address-error-message"
              aria-invalid={errors.address ? "true" : "false"}
              ref={register({
                required: {
                  value: true,
                  message: "Please enter an address",
                },
                pattern: {
                  value: ADDRESS,
                  message: "Please enter a valid address",
                },
              })}
              type="text"
            />

            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? "Going" : "Go"}
            </button>
          </div>

          {errors && (
            <p role="alert" id="address-error-message" className="error">
              {errors.address?.message}
            </p>
          )}
        </form>
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

      <style jsx>{`
        form {
          max-width: 400px;
          margin: 0 auto;
        }

        .flex {
          display: flex;
        }

        .error {
          color: #f5a623;
          text-align: center;
        }

        input {
          border-radius: 20px;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
          border: 3px solid #eaeaea;
          border-right: 0;
          flex: 4;
          font-size: 1.125rem;
          line-height: 1.25;
          min-width: 256px;
          outline: none;
          overflow: hidden;
          padding: 1rem 0.5rem 1rem 1.5rem;
          text-overflow: ellipsis;
        }

        input::placeholder {
          color: hsl(0deg 0% 62%);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        input:focus {
          border-color: #000;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }

        button {
          background-color: black;
          border-radius: 20px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
          border: 3px solid transparent;
          color: #eaeaea;
          flex: 1;
          font-size: 1.125rem;
          font-weight: 500;
          line-height: 1.25;
          outline: none;
          padding: 1rem 2rem 1rem 1.75rem;
        }
        button:focus {
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
        }
      `}</style>

      <style jsx global>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
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
          color: #0070f3;
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
