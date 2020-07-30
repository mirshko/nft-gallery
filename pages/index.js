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
    <main>
      <Head>
        <title>Static NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
  );
}
