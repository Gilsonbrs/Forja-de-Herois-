import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginBackground from '../assets/images/login-bg.png';
import { ErrorModal } from '../components/ErrorModal';
import { login, register } from '../services/authService';

function LoginPage() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorModal, setErrorModal] = useState({ isOpen: false, title: '', message: '' });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (isRegister) {
        await register(form.name, form.email, form.password);
        setMessage('Conta criada com sucesso! Faça login.');
        setIsRegister(false);
        setForm({ name: '', email: '', password: '' });
        return;
      }

      const response = await login(form.email, form.password);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      navigate('/dashboard', { replace: true });
      if (window.location.pathname !== '/dashboard') {
        window.location.replace('/dashboard');
      }
      return;
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Falha na operação.';

      if (errorMessage.includes('não encontrado') || errorMessage.includes('não existe') || error.response?.status === 404) {
        setErrorModal({
          isOpen: true,
          title: 'Usuário não encontrado',
          message: 'Esse e-mail não está cadastrado no sistema. Crie uma conta para começar sua jornada heroica.'
        });
      } else if (errorMessage.includes('senha') || error.response?.status === 401) {
        setErrorModal({
          isOpen: true,
          title: 'Acesso negado',
          message: 'E-mail ou senha incorretos. Verifique suas credenciais.'
        });
      } else {
        setErrorModal({
          isOpen: true,
          title: 'Erro',
          message: errorMessage
        });
      }
    }
  };

  const toggleMode = () => {
    setIsRegister((current) => !current);
    setForm({ name: '', email: '', password: '' });
    setMessage(null);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#05030d] text-white">
      <img
        src={loginBackground}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_25%,rgba(124,58,237,0.03),transparent_34%),linear-gradient(90deg,rgba(5,3,13,0.85)_0%,rgba(5,3,13,0.50)_30%,rgba(5,3,13,0.08)_65%,rgba(5,3,13,0.05)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-[#05030d]/90 via-[#05030d]/60 to-transparent lg:w-[42%]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#05030d] to-transparent" />
      <div className="absolute left-0 top-[20%] h-40 w-[28rem] rounded-r-[44px] bg-[#05030d]/70 blur-2xl" />
      <div className="absolute bottom-0 left-0 h-36 w-[30rem] rounded-tr-[44px] bg-[#05030d]/78 blur-2xl" />

      <section className="relative z-10 mx-auto grid min-h-screen w-full max-w-[1320px] items-center gap-10 px-6 py-8 lg:grid-cols-[minmax(520px,1fr)_460px] lg:px-12">
        <div className="relative flex flex-col justify-center gap-8 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-full bg-gradient-to-r from-[#05030d]/96 via-[#05030d]/74 to-transparent lg:block" />
          <div className="relative z-10 max-w-xl">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-200/85">Conectar ao painel</p>
            <p className="mt-4 text-3xl font-semibold uppercase tracking-[0.2em] text-white/80">Bem-vindo de volta</p>
            <h1 className="mt-3 text-7xl font-black uppercase tracking-[-0.04em] text-white sm:text-8xl">
              <span className="block text-[#f8c25c]">Herói</span>
            </h1>
          </div>
          <div className="hidden rounded-[32px] border border-white/10 bg-[#0f1220]/70 p-6 text-slate-300 shadow-2xl shadow-violet-950/20 backdrop-blur-xl lg:block">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/75">Forja de Heróis</p>
            <p className="mt-4 text-lg font-semibold text-white">Acesso seguro para heróis em treinamento</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">Mantenha suas credenciais seguras e continue sua jornada com estilo.</p>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] rounded-[32px] border border-white/15 bg-slate-950/70 p-7 shadow-2xl shadow-violet-950/20 backdrop-blur-xl sm:p-8">
            <div className="mb-8 flex items-center gap-4 rounded-3xl bg-[#0f1220]/80 p-5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <UserIcon />
              </span>
              <div>
                <h2 className="text-2xl font-black text-white">Login do <span className="text-purple-400">Herói</span></h2>
                <p className="mt-1 text-sm text-slate-400">Acesse sua conta para continuar</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {isRegister && (
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-200">Nome</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 px-5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
                    placeholder="Nome do herói"
                    required
                  />
                </label>
              )}

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">E-mail</span>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400">
                    <MailIcon />
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-200">Senha</span>
                <div className="relative">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-400">
                    <LockIcon />
                  </span>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    className="h-14 w-full rounded-2xl border border-white/10 bg-slate-950/60 pl-14 pr-5 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/15"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </label>

              <div className="flex flex-col gap-3 text-sm text-slate-300 sm:flex-row sm:items-center sm:justify-between">
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(event) => setRemember(event.target.checked)}
                    className="h-5 w-5 rounded accent-purple-500"
                  />
                  <span>Lembrar de mim</span>
                </label>
                <button type="button" className="text-sm font-medium text-purple-300 transition hover:text-purple-200">
                  Esqueci minha senha
                </button>
              </div>

              {message && <p className="rounded-2xl bg-violet-500/15 px-4 py-3 text-sm text-violet-100">{message}</p>}

              <button
                type="submit"
                className="mt-3 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-500 text-lg font-black text-white shadow-[0_18px_44px_rgba(126,34,206,0.32)] transition hover:brightness-110"
              >
                <ArrowLoginIcon />
                {isRegister ? 'Cadastrar' : 'Entrar'}
              </button>

              <div className="mt-6 flex items-center gap-5 text-sm text-slate-400">
                <span className="h-px flex-1 bg-slate-600/50" />
                <span>ou continue com</span>
                <span className="h-px flex-1 bg-slate-600/50" />
              </div>

              <p className="mt-5 text-center text-sm text-slate-300">
                {isRegister ? 'Já tem uma conta?' : 'Ainda não tem uma conta?'}
                <button type="button" onClick={toggleMode} className="ml-2 font-medium text-purple-400 transition hover:text-purple-300">
                  {isRegister ? 'Login' : 'Cadastre-se'}
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>

      <ErrorModal
        title={errorModal.title}
        message={errorModal.message}
        isOpen={errorModal.isOpen}
        onClose={() => {
          setErrorModal({ ...errorModal, isOpen: false });
          if (errorModal.title.includes('não encontrado')) {
            setIsRegister(true);
          }
        }}
      />
    </main>
  );
}

function UserIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 21a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m5 7 7 6 7-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 10h12v10H6V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8.5 10V7.8a3.5 3.5 0 0 1 7 0V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowLoginIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 12H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 5H5v14h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default LoginPage;
