import { Fragment } from "react";

function CollectionIcon({ image_url, name }) {
  if (image_url)
    return (
      <Fragment>
        <img className="collection-image" src={image_url} alt={name} />
        <style jsx>{`
          .collection-image {
            --size: 40px;

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
          --size: 40px;

          background-color: #fff;
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
      <CollectionIcon image_url={props.image_url} name={props.name} />
      <p className="collection-title">{props.name}</p>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }

        .collection-title {
          margin: 0;
          margin-left: 0.5em;
          font-size: 1.125rem;
        }
      `}</style>
    </div>
  );
}
