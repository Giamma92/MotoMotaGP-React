import LoginForm from '../Forms/LoginForm'

// import { ReactComponent as LogoSvg } from 'assets/img/site-logo.svg';

function Login() {
  return (
    (<section className="bg-gray-50 dark:bg-gray-900">
      <div className="login">
        <div className="login__inner reveal h-screen">
          <div className="inner__brand">
            <div className="bg-neutral-900 radius-large">
              <img
                  className="brand__logo radius-large"
                  src="/site-logo.svg"
                  alt=""
                />

                {/* <LogoSvg className="brand__logo radius-large"/> */}
            </div>
            <div className="brand__text text-gray-900 dark:text-white">
              <h1>MotoMota GP</h1>
              <p>The official MotoMota site</p>
            </div>
          </div>
          <div className="inner__form space-content">
            <div className="space-content">
              <LoginForm />
            </div>
          </div>
          <div className="login__footer text-neutral-700">
            <p><em>Powered by Gianmarco Moretti</em></p>
          </div>
        </div>
        <div className="login__background h-screen" />
      </div>
    </section>)
  );
}

export default Login;
