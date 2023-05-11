import { useAuth0 } from "@auth0/auth0-react"
import { useEffect, useState } from "react"

export default function Dashboard() {
  const [myApplication, setMyApplication] = useState(null)

  useEffect(() => {
    const getApplication = async () => {
      fetch("http://localhost:3000/api/getApplication", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json()
          } else {
            throw new Error("Error fetching application")
          }
        })
        .then((data) => {
          setMyApplication(data)
        })
        .catch((error) => {
          console.log(error)
        })
    }

    getApplication()
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      {/* <p>Username: {user?.name}</p>
      <p>Email: {user?.email}</p> */}
      <p>My Application: {JSON.stringify(myApplication)}</p>
    </>
  )
}
