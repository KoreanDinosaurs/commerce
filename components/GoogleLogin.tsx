import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'

export default function GoogleLogin() {
  const { data: session } = useSession()
  console.log(session)
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {session ? (
        <>
          Signed in as {session.user?.email} <br />
          <br />
          <Button
            label="Sign out"
            primary
            rounded
            size="medium"
            onClick={() => signOut({ callbackUrl: '/' })}
          />
        </>
      ) : (
        <>
          Not signed in <br />
          <br />
          <Button
            label="Sign in"
            primary
            rounded
            size="medium"
            onClick={() => signIn('google', { callbackUrl: '/' })}
          />
        </>
      )}
    </div>
  )
}
