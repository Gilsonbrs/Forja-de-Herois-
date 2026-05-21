import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMissions, createMission, updateMissionStatus, deleteMission } from '../services/missionService';
import MissionCard from '../components/MissionCard';
import dashboardBackground from '../assets/images/dashboard-bg.png';

const initialUser = JSON.parse(
  localStorage.getItem('user') || JSON.stringify({ name: 'Aventureiro', xp: 0, level: 1 })
);

function DashboardPage() {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [user, setUser] = useState(initialUser);
  const [form, setForm] = useState({ title: '', difficulty: 'easy', xp: 50 });
  const [message, setMessage] = useState('');

  const loadMissions = async () => {
    try {
      const data = await fetchMissions();
      setMissions(data);
    } catch (error) {
      setMessage('Falha ao buscar missões.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createMission({ ...form, xp: Number(form.xp) });
      setForm({ title: '', difficulty: 'easy', xp: 50 });
      loadMissions();
      setMessage('Missão criada com sucesso.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao criar missão.');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const result = await updateMissionStatus(id, status);
      if (result.user) {
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
      }
      loadMissions();
      setMessage('Missão atualizada.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao atualizar missão.');
    }
  };

  const handleDeleteMission = async (id) => {
    try {
      await deleteMission(id);
      loadMissions();
      setMessage('Missão excluída com sucesso.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Erro ao deletar missão.');
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }
    loadMissions();
  }, []);

  const progress = Math.min(((user.xp % 100) / 100) * 100, 100);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#050714] text-white">
      <img
        src={dashboardBackground}
        alt=""
        className="fixed inset-0 h-full w-full object-cover object-center"
      />
      <div className="fixed inset-0 bg-gradient-to-r from-[#050714]/25 via-[#050714]/5 to-[#050714]/20" />

      <div className="relative z-10 max-w-[920px] px-6 py-10 lg:ml-8 xl:ml-12">
        <header className="mb-8 rounded-[24px] border border-purple-400/18 bg-[#070817]/54 p-7 shadow-[0_28px_80px_rgba(15,23,42,0.26)] backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.4em] text-cyan-200/70">Forja de experiências</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white">{user.name || 'Aventureiro'}</h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">Seu painel leve para acompanhar XP, missões e progresso sem perder a fluidez.</p>
            </div>
            <button onClick={handleLogout} className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/70 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
              Sair
            </button>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[18px] border border-purple-300/12 bg-slate-950/50 p-5">
              <span className="text-sm text-slate-400">Nível atual</span>
              <p className="mt-3 text-3xl font-semibold text-white">{user.level}</p>
            </div>
            <div className="rounded-[18px] border border-purple-300/12 bg-slate-950/50 p-5">
              <span className="text-sm text-slate-400">XP total</span>
              <p className="mt-3 text-3xl font-semibold text-white">{user.xp}</p>
            </div>
            <div className="rounded-[18px] border border-purple-300/12 bg-slate-950/50 p-5">
              <span className="text-sm text-slate-400">Próximo nível</span>
              <p className="mt-3 text-3xl font-semibold text-white">{100 - (user.xp % 100)} XP</p>
            </div>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <div className="rounded-[24px] border border-purple-300/12 bg-[#070817]/56 p-7 shadow-xl shadow-slate-900/20 backdrop-blur-xl">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Progresso do herói</h2>
                  <p className="text-sm text-slate-400">Complete missões para subir de nível e desbloquear novas etapas.</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-cyan-400/20 to-violet-500/20 px-3 py-1 text-xs text-slate-200">
                  Próximo nível em {100 - (user.xp % 100)} XP
                </span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="rounded-[24px] border border-purple-300/12 bg-[#070817]/56 p-7 shadow-xl shadow-slate-900/20 backdrop-blur-xl">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white">Criar nova missão</h2>
              </div>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Título da missão"
                  className="w-full rounded-[28px] border border-white/10 bg-slate-900/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
                  required
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                    className="rounded-[28px] border border-white/10 bg-slate-900/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
                  >
                    <option value="easy">Fácil</option>
                    <option value="medium">Média</option>
                    <option value="hard">Difícil</option>
                  </select>
                  <input
                    type="number"
                    min="10"
                    value={form.xp}
                    onChange={(e) => setForm({ ...form, xp: e.target.value })}
                    className="rounded-[28px] border border-white/10 bg-slate-900/70 px-5 py-4 text-white outline-none transition focus:border-cyan-400"
                    required
                  />
                </div>
                <button className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110">
                  Adicionar missão
                </button>
              </form>
              {message && <p className="mt-4 rounded-3xl bg-white/5 px-4 py-3 text-sm text-slate-100">{message}</p>}
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[24px] border border-purple-300/12 bg-[#070817]/56 p-7 shadow-xl shadow-slate-900/20 backdrop-blur-xl">
              <h2 className="text-xl font-semibold text-white">Missões ativas</h2>
              <p className="mt-2 text-sm text-slate-400">Acompanhe as tarefas e conclua suas aventuras com clareza.</p>
              <div className="mt-6 space-y-4">
                {missions.length === 0 ? (
                  <p className="text-slate-400">Nenhuma missão ainda. Forje sua primeira aventura!</p>
                ) : (
                  missions.map((mission) => (
                    <MissionCard
                      key={mission.id}
                      mission={mission}
                      onStart={(id) => handleStatusChange(id, 'in_progress')}
                      onComplete={(id) => handleStatusChange(id, 'completed')}
                      onDelete={handleDeleteMission}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default DashboardPage;
