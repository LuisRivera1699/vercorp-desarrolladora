import { Fragment } from "react";

/** Texto con saltos de línea escritos en el admin. */
export default function Lines({ text, breakClassName }: { text: string; breakClassName?: string }) {
  return text.split("\n").map((line, index) => (
    <Fragment key={index}>
      {index > 0 ? (
        <>
          <br className={breakClassName} />{" "}
        </>
      ) : null}
      {line}
    </Fragment>
  ));
}
