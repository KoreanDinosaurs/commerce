import GoogleLogin from '@components/GoogleLogin'

export default function Login() {
  return (
    <div
      className="flex justify-center items-center"
      style={{ height: '75vh' }}
    >
      <GoogleLogin />
    </div>
  )
}
