import GoogleLogin from '@components/GoogleLogin'
import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>로그인 페이지</title>
      </Head>
      <div
        className="flex justify-center items-center"
        style={{ height: '75vh' }}
      >
        <GoogleLogin />
      </div>
    </>
  )
}
