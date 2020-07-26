import Collection from "./collection";

export default function Collections({ data }) {
  if (!data.length) return null;

  return (
    <ul>
      {data.map((datum, i) => (
        <li key={i}>
          <Collection {...datum} />
        </li>
      ))}
      <style jsx>{`
        ul {
          list-style: none;
          padding-left: 0;
          margin: 0;
        }

        li:not(:last-of-type) {
          margin-bottom: 1rem;
        }
      `}</style>
    </ul>
  );
}
