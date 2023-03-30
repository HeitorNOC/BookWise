import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()

  const isUserLogedIn = session.status != 'unauthenticated'

  return (
    <>
      {
        isUserLogedIn ? (
          <div>
            <p>{session.data?.user.name}</p>
            <p>{session.data?.user.id}</p>
            <p>{session.data?.user.avatar_url}</p>
          </div>
        ): (
          <div>
            <p>Not Loged</p>
          </div>
          )
      }
    </>
  )
}