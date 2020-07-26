import Collection from "./collection";
import Assets from "./assets";
import { Fragment, useState } from "react";

function CollectionWrapper(props) {
  const [isOpen, isOpenSet] = useState(false);

  const toggle = () => isOpenSet(!isOpen);

  return (
    <Fragment>
      <Collection isOpen={isOpen} toggle={toggle} {...props} />
      {isOpen && <Assets assets={props.assets} />}
    </Fragment>
  );
}

export default function Collections({ collections }) {
  if (!collections.length) return null;

  return (
    <ul>
      {collections.map((collection, i) => (
        <li key={i}>
          <CollectionWrapper {...collection} />
        </li>
      ))}
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
          margin: 0 auto;
          max-width: 425px;
          width: 100%;
        }

        li:not(:last-of-type) {
          margin-bottom: 1rem;
        }
      `}</style>
    </ul>
  );
}
