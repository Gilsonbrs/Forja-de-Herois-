import { useNavigate } from 'react-router-dom';
import dashboardBackground from '../assets/images/dashboard-bg.png';

function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden text-white">
      <img
        src={dashboardBackground}
        alt="Hero background"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />

      <section className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center px-6 py-12">
        <div className="absolute inset-0 overflow-hidden rounded-[48px] bg-[radial-gradient(circle_at_top_left,_rgba(124,58,237,0.1),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.08),_transparent_30%)]" />
        <div className="relative rounded-[32px] border border-white/20 bg-black/20 p-10 shadow-2xl shadow-violet-800/20 backdrop-blur-sm">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-block rounded-full bg-purple-700/20 px-4 py-2 text-sm text-purple-200">Jornada de estudos</span>
              <h1 className="mt-4 text-5xl font-black tracking-tight text-white">Evolua como herói</h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-300">Crie missões, acompanhe seu progresso e transforme cada estudo em uma conquista.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:w-[320px]">
              <div className="rounded-3xl bg-slate-950/30 p-5 text-sm text-slate-200 shadow-slate-900/10 border border-white/10 backdrop-blur-sm">
                <h3 className="font-semibold text-white">Missões</h3>
                <p className="mt-2 text-slate-400">Crie desafios, inicie e conclua para ganhar XP.</p>
              </div>
              <div className="rounded-3xl bg-slate-950/30 p-5 text-sm text-slate-200 shadow-slate-900/10 border border-white/10 backdrop-blur-sm">
                <h3 className="font-semibold text-white">Progresso</h3>
                <p className="mt-2 text-slate-400">Acompanhe nível, XP e evolução de cada herói.</p>
              </div>
            </div>
          </div>

          <div className="mb-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/20 bg-slate-950/15 p-6 text-center shadow-2xl shadow-violet-900/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-violet-300">Herói</p>
              <h2 className="mt-4 text-2xl font-black text-white">Arcanista</h2>
              <p className="mt-3 text-slate-400">Mestre da energia, pronto para missões de XP e evolução constante.</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-slate-950/15 p-6 text-center shadow-2xl shadow-cyan-900/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Herói</p>
              <h2 className="mt-4 text-2xl font-black text-white">Sentinela</h2>
              <p className="mt-3 text-slate-400">Defensor sombria com foco em completar tarefas e subir de nível.</p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-slate-950/15 p-6 text-center shadow-2xl shadow-rose-900/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-rose-300">Herói</p>
              <h2 className="mt-4 text-2xl font-black text-white">Criador</h2>
              <p className="mt-3 text-slate-400">Criador de missões, capaz de moldar XP e desafios para crescer.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <button onClick={() => navigate('/login')} className="rounded-full bg-gradient-to-r from-purple-500 to-sky-500 px-8 py-4 text-sm font-semibold text-white transition hover:brightness-110">Criar Conta</button>
            <button onClick={() => navigate('/login')} className="rounded-full border border-slate-500 px-8 py-4 text-sm font-semibold text-slate-100 transition hover:bg-white/10">Login</button>
          </div>
        </div>
      </section>


      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-12 text-white">
        <div className="rounded-[32px] border border-white/20 bg-slate-950/25 p-10 shadow-2xl shadow-slate-900/20 backdrop-blur-sm">
          <h2 className="text-3xl font-black">Como funciona o projeto</h2>
          <p className="mt-4 text-slate-300">Cada missão é criada, iniciada e concluída para ganhar XP. Ao atingir 100 XP, o herói sobe de nível e desbloqueia uma nova etapa da jornada.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-950/20 p-6 border border-white/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Exemplo</p>
              <h3 className="mt-4 text-xl font-semibold text-white">1. Criar missão</h3>
              <p className="mt-3 text-slate-400">Defina título, dificuldade e XP. A missão começa como pendente.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/20 p-6 border border-white/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Exemplo</p>
              <h3 className="mt-4 text-xl font-semibold text-white">2. Iniciar missão</h3>
              <p className="mt-3 text-slate-400">Mude o status para em andamento antes de concluir e garantir o XP.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/20 p-6 border border-white/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Exemplo</p>
              <h3 className="mt-4 text-xl font-semibold text-white">3. Concluir e evoluir</h3>
              <p className="mt-3 text-slate-400">Ao fechar a missão, o XP é somado e o nível é recalculado automaticamente.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
