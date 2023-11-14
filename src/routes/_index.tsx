import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <p>go bingo page</p>
      <p>
        <Link to="/ja">Bingo</Link>
      </p>
    </div>
  );
}
