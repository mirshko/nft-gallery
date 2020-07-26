export default function Asset(props) {
  return (
    <a
      href={props.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="aspect-ratio-box"
    >
      <img
        className="aspect-ratio-box-inside"
        src={props.image_url}
        alt={props.name}
        async
        decoding="async"
        loading="lazy"
        importance="low"
      />
      <style jsx>{`
        img {
          object-fit: cover;
          object-position: center;
        }

        .aspect-ratio-box {
          height: 0;
          display: block;
          overflow: hidden;
          padding-top: 100%;
          background-color: #${props.background_color ?? "fff"};
          position: relative;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.02),
            0 1px 3px rgba(0, 0, 0, 0.04);
          border-radius: 20px;
        }
        .aspect-ratio-box-inside {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </a>
  );
}
