import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between mb-10 row">
      <Link href="/">
        <h3 className="underline text-green-500 hover:text-green-600 text-xl font-pixel">Home</h3>
      </Link>
      <Link href="/api/auth/logout">
        <h3 className="underline text-red-500 hover:text-red-600 text-xl font-pixel">Logout</h3>
      </Link>
    </div>
  );
}
