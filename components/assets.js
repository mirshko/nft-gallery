import Asset from "./asset";

export default function Assets({ assets }) {
  if (!assets.length) return null;

  return (
    <ul>
      {assets.map((datum, i) => (
        <li key={i}>
          <Asset {...datum} />
        </li>
      ))}
      <style jsx>{`
        ul {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-gap: 1rem;
          list-style: none;
          padding-left: 0;
          margin: 1rem 0;
        }
      `}</style>
    </ul>
  );
}
