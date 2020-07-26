import { useState } from "react";
import { Dialog } from "@reach/dialog";

export default function Asset(props) {
  const [showDialog, setShowDialog] = useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <button className="aspect-ratio-box" onClick={open}>
      <img
        className="aspect-ratio-box-inside"
        src={props.image_url}
        alt={props.name}
        async
        decoding="async"
        loading="lazy"
        importance="low"
      />

      <Dialog isOpen={showDialog} onDismiss={close}>
        <a
          href={props.image_original_url ?? props.image_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="dialog-image"
            async
            decoding="async"
            importance="high"
            src={props.image_url}
            alt={props.name}
          />
        </a>
      </Dialog>

      <style jsx global>{`
        :root {
          --reach-dialog: 1;
        }

        [data-reach-dialog-overlay] {
          background: hsla(0, 0%, 0%, 0.33);
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          overflow: auto;
        }

        [data-reach-dialog-content] {
          max-width: calc(375px - (20px * 2));
          width: max-content;
          margin: 20vh auto 0 auto;
          background-color: #${props.background_color ?? "ffffff"};
          border-radius: 20px;
          padding: 0.5rem;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
          outline: none;
        }

        .dialog-image {
          max-width: 100%;
          height: auto;
          vertical-align: middle;
          border-radius: 12px;
        }
      `}</style>

      <style jsx>{`
        img {
          object-fit: cover;
          object-position: center;
        }

        button {
          padding: 0;
          font: inherit;
          border: none;
          width: 100%;
          outline: none;
        }

        .aspect-ratio-box {
          height: 0;
          display: block;
          overflow: hidden;
          padding-top: 100%;
          background-color: #${props.background_color ?? "ffffff"};
          position: relative;
          box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.08);
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
    </button>
  );
}
