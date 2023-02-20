import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div> Loading ... </div>;
  if (error) return <div> {error.message} </div>;

  if (user) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          Welcome {user.name}!
          <br />
          Your email: {user.email}
          <br />
          <a style={{backgroundColor: 'blue'}}href="/api/auth/logout">Logout</a>
          <br />
        </div>
      </div>
    );
  }

  return (
    <a style={{ backgroundColor: "grey" }} href="/api/auth/login">
      Login
    </a>
  );
}
