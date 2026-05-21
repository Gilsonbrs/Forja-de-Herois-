function MissionCard({ mission, onStart, onComplete, onDelete }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-5 shadow-xl shadow-slate-900/20">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
          <p className="mt-2 text-sm text-slate-400">Dificuldade: {mission.difficulty}</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-slate-200">{mission.status}</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-slate-300">
        <p>XP: {mission.xp}</p>
        <div className="flex gap-2">
          {mission.status === 'pending' && (
            <button onClick={() => onStart(mission.id)} className="rounded-full bg-indigo-600 px-4 py-2 text-sm text-white transition hover:bg-indigo-500">Iniciar</button>
          )}
          {mission.status === 'in_progress' && (
            <button onClick={() => onComplete(mission.id)} className="rounded-full bg-emerald-500 px-4 py-2 text-sm text-slate-950 transition hover:bg-emerald-400">Concluir</button>
          )}
          <button onClick={() => onDelete(mission.id)} className="rounded-full bg-red-600/80 px-4 py-2 text-sm text-white transition hover:bg-red-600">Deletar</button>
        </div>
      </div>
    </div>
  );
}

export default MissionCard;
