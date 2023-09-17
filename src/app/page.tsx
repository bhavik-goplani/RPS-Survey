import AuthForm from '../components/auth-form'

export default function Home() {
  return (
    <div className="row">
      <div className="col-6">
        <h1 className="header">Welcome to the Login Page for RPS Survey!</h1>
      </div>
      <div className="col-6">
        <AuthForm />
      </div>
    </div>
  )
}