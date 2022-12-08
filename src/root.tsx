import { Link } from "react-router-dom";

export default function Root(): JSX.Element {
  return (
    <>
      <div>
        <p>
          Hello World!!
        </p>
        {/* <a href={`papers`}>Papers</a> */}
        <Link to="papers">Papers</Link>
      </div>
    </>
  );
}
