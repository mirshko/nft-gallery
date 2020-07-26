import { Fragment } from "react";

const Down = ({ size = 24 }) => (
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
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const Right = ({ size = 24 }) => (
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
    <path d="M9 18l6-6-6-6" />
  </svg>
);

function CollectionIcon({ large = false, image_url, large_image_url, name }) {
  if (image_url || large_image_url)
    return (
      <Fragment>
        <img
          alt={name}
          async
          className="collection-image"
          decoding="async"
          loading="lazy"
          importance="low"
          src={large ? large_image_url : image_url}
          height={large ? 60 : 30}
          width={large ? 60 : 30}
        />
        <style jsx>{`
          .collection-image {
            --size: ${large ? 60 : 30}px;

            display: block;
            border-radius: 99999px;
            height: var(--size);
            width: var(--size);
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04),
              0 1px 3px rgba(0, 0, 0, 0.08);
          }
        `}</style>
      </Fragment>
    );

  return (
    <div className="collection-image-fallback">
      <style jsx>{`
        .collection-image-fallback {
          --size: ${large ? 60 : 30}px;

          background-color: #242424;
          border-radius: 99999px;
          height: var(--size);
          width: var(--size);
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.04),
            0 1px 3px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}

export default function Collection(props) {
  return (
    <div>
      <CollectionIcon {...props} />
      <p className="collection-title">{props.name}</p>
      <span>
        <Right />
      </span>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }

        .collection-title {
          margin: 0;
          margin-left: 0.5em;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 500;
        }

        span {
          margin-left: auto;
        }
      `}</style>
    </div>
  );
}
