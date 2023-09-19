import LoginForm from './LoginForm'

import '../scss/LoginForm.scss';
import '../scss/globals.scss';

function Login() {
  return (
    (<section className="bg-neutral-100">
      <div className="login">
        <div className="login__inner reveal h-screen">
          <div className="inner__brand">
            <div className="bg-neutral-900 radius-large">
              <><img
                  className="brand__logo radius-large"
                  src="/site-logo.svg"
                  alt=""
                /></>
            </div>
            <div className="brand__text">
              <span>MotoMota GP</span>
              <span>The official MotoMota site</span>
            </div>
          </div>
          <div className="inner__form space-content">
            <div className="space-content">
              <h1>Login</h1>
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
