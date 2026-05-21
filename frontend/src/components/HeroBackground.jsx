import { useEffect, useRef } from 'react';

export function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Ajusta o tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    // Anima o background
    const animate = () => {
      // Fundo com gradiente cinematográfico
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(11, 7, 32, 0.95)');
      gradient.addColorStop(0.5, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(1, 'rgba(5, 5, 15, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Efeitos de luz radiante
      const radialGradient1 = ctx.createRadialGradient(
        canvas.width * 0.15,
        canvas.height * 0.4,
        0,
        canvas.width * 0.15,
        canvas.height * 0.4,
        500
      );
      radialGradient1.addColorStop(0, 'rgba(168, 85, 247, 0.1)');
      radialGradient1.addColorStop(1, 'rgba(168, 85, 247, 0)');
      ctx.fillStyle = radialGradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radialGradient2 = ctx.createRadialGradient(
        canvas.width * 0.85,
        canvas.height * 0.3,
        0,
        canvas.width * 0.85,
        canvas.height * 0.3,
        450
      );
      radialGradient2.addColorStop(0, 'rgba(59, 130, 246, 0.08)');
      radialGradient2.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = radialGradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const radialGradient3 = ctx.createRadialGradient(
        canvas.width * 0.5,
        canvas.height * 0.85,
        0,
        canvas.width * 0.5,
        canvas.height * 0.85,
        400
      );
      radialGradient3.addColorStop(0, 'rgba(239, 68, 68, 0.06)');
      radialGradient3.addColorStop(1, 'rgba(239, 68, 68, 0)');
      ctx.fillStyle = radialGradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Listener para redimensionamento
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Canvas para gradientes */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Overlay cinematográfico */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_40%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(239,68,68,0.06),transparent_45%)]" />

      {/* Herói 1 - Esquerda (Homem de Ferro) */}
      <svg
        className="absolute bottom-0 left-0 h-full w-1/3 opacity-95"
        viewBox="0 0 300 600"
        preserveAspectRatio="xMinYMid slice"
      >
        <defs>
          <linearGradient id="ironManBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#FF4500" />
            <stop offset="100%" stopColor="#DC3C00" />
          </linearGradient>
          <linearGradient id="ironManGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <filter id="ironGlow">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Pernas */}
        <rect x="110" y="400" width="22" height="100" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        <rect x="168" y="400" width="22" height="100" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        {/* Botas */}
        <rect x="108" y="495" width="26" height="25" fill="#1a1a1a" filter="url(#ironGlow)" />
        <rect x="166" y="495" width="26" height="25" fill="#1a1a1a" filter="url(#ironGlow)" />
        {/* Tronco/Armadura */}
        <path d="M 95 200 L 205 200 L 210 400 L 90 400 Z" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        {/* Símbolo de Arco */}
        <circle cx="150" cy="270" r="28" fill="url(#ironManGold)" filter="url(#ironGlow)" />
        <circle cx="150" cy="270" r="20" fill="#FF6B35" filter="url(#ironGlow)" />
        <path d="M 140 265 L 160 270 L 140 275 Z" fill="url(#ironManGold)" opacity="0.8" filter="url(#ironGlow)" />
        {/* Detalhes de armadura */}
        <rect x="130" y="310" width="40" height="35" fill="#FFD700" opacity="0.6" filter="url(#ironGlow)" />
        <line x1="150" y1="310" x2="150" y2="345" stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
        {/* Braço esquerdo */}
        <path d="M 95 220 L 45 150 L 85 260" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        {/* Luva esquerda */}
        <circle cx="45" cy="150" r="15" fill="#FFD700" filter="url(#ironGlow)" />
        <circle cx="45" cy="150" r="10" fill="url(#ironManGold)" filter="url(#ironGlow)" />
        {/* Braço direito levantado */}
        <path d="M 205 220 L 255 140 L 225 270" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        {/* Luva direita com brilho */}
        <circle cx="255" cy="140" r="18" fill="#FFD700" filter="url(#ironGlow)" />
        <circle cx="255" cy="140" r="12" fill="#FFFF00" opacity="0.8" filter="url(#ironGlow)" />
        {/* Cabeça */}
        <circle cx="150" cy="130" r="38" fill="url(#ironManBody)" filter="url(#ironGlow)" />
        {/* Visor */}
        <ellipse cx="150" cy="125" rx="20" ry="25" fill="#00FFFF" opacity="0.9" filter="url(#ironGlow)" />
        <ellipse cx="140" cy="120" rx="6" ry="8" fill="#FFFFFF" opacity="0.7" filter="url(#ironGlow)" />
        <ellipse cx="160" cy="120" rx="6" ry="8" fill="#FFFFFF" opacity="0.7" filter="url(#ironGlow)" />
        {/* Linha do visor */}
        <path d="M 135 135 Q 150 138 165 135" stroke="#00FFFF" strokeWidth="1.5" fill="none" opacity="0.6" filter="url(#ironGlow)" />
        {/* Capa/Cabo */}
        <path d="M 200 250 Q 240 280 235 380 Q 220 400 210 400" fill="#DC3C00" opacity="0.4" filter="url(#ironGlow)" />
        {/* Aura energética */}
        <circle cx="150" cy="300" r="95" fill="none" stroke="#FF6B35" strokeWidth="2" opacity="0.4" filter="url(#ironGlow)" />
        <circle cx="150" cy="300" r="110" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.2" filter="url(#ironGlow)" />
      </svg>

      {/* Herói 2 - Centro (Thor) */}
      <svg
        className="absolute bottom-0 left-1/3 h-full w-1/3 opacity-95"
        viewBox="0 0 300 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ animation: 'heroFloat 4s ease-in-out infinite' }}
      >
        <defs>
          <linearGradient id="thorBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E90FF" />
            <stop offset="50%" stopColor="#1873CC" />
            <stop offset="100%" stopColor="#0D47A1" />
          </linearGradient>
          <linearGradient id="thorGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <linearGradient id="lightningBolt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="100%" stopColor="#87CEEB" />
          </linearGradient>
          <filter id="thorGlow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Pernas musculosas */}
        <rect x="108" y="390" width="26" height="120" fill="url(#thorBody)" filter="url(#thorGlow)" />
        <rect x="166" y="390" width="26" height="120" fill="url(#thorBody)" filter="url(#thorGlow)" />
        {/* Botas com dourado */}
        <rect x="105" y="505" width="32" height="35" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <rect x="163" y="505" width="32" height="35" fill="url(#thorGold)" filter="url(#thorGlow)" />
        {/* Tronco com armadura */}
        <path d="M 90 210 L 210 210 L 220 390 L 80 390 Z" fill="url(#thorBody)" filter="url(#thorGlow)" />
        {/* Peito */}
        <ellipse cx="150" cy="280" rx="35" ry="45" fill="#0D47A1" filter="url(#thorGlow)" />
        <path d="M 120 260 L 150 240 L 180 260" fill="url(#thorGold)" filter="url(#thorGlow)" />
        {/* Detalhes de armadura */}
        <rect x="125" y="320" width="50" height="40" fill="url(#thorGold)" opacity="0.5" filter="url(#thorGlow)" />
        <line x1="125" y1="340" x2="175" y2="340" stroke="#0D47A1" strokeWidth="2" />
        {/* Braço esquerdo - segurando martelo */}
        <path d="M 90 230 L 35 130 L 70 280" fill="url(#thorBody)" filter="url(#thorGlow)" />
        {/* Braço direito */}
        <path d="M 210 230 L 265 130 L 230 280" fill="url(#thorBody)" filter="url(#thorGlow)" />
        {/* Martelo MJOLNIR - Esquerdo */}
        <rect x="20" y="110" width="30" height="40" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <rect x="15" y="105" width="40" height="10" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <path d="M 35 105 L 30 85 L 40 85 Z" fill="url(#lightningBolt)" filter="url(#thorGlow)" />
        {/* Martelo MJOLNIR - Direito */}
        <rect x="250" y="110" width="30" height="40" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <rect x="245" y="105" width="40" height="10" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <path d="M 265 105 L 260 85 L 270 85 Z" fill="url(#lightningBolt)" filter="url(#thorGlow)" />
        {/* Cabeça */}
        <circle cx="150" cy="125" r="42" fill="url(#thorBody)" filter="url(#thorGlow)" />
        {/* Cabelo/Coroa */}
        <path d="M 110 95 Q 150 70 190 95" fill="url(#thorGold)" filter="url(#thorGlow)" />
        <path d="M 115 100 Q 150 80 185 100" fill="#FFD700" opacity="0.8" filter="url(#thorGlow)" />
        {/* Rosto */}
        <circle cx="135" cy="130" r="6" fill="#FFFFFF" opacity="0.8" filter="url(#thorGlow)" />
        <circle cx="165" cy="130" r="6" fill="#FFFFFF" opacity="0.8" filter="url(#thorGlow)" />
        <path d="M 140 145 L 160 145" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" filter="url(#thorGlow)" />
        {/* Raios de energia */}
        <path d="M 150 80 L 145 60 L 155 65" fill="url(#lightningBolt)" opacity="0.9" filter="url(#thorGlow)" />
        <path d="M 130 110 L 120 95 L 128 105" fill="url(#lightningBolt)" opacity="0.7" filter="url(#thorGlow)" />
        <path d="M 170 110 L 180 95 L 172 105" fill="url(#lightningBolt)" opacity="0.7" filter="url(#thorGlow)" />
        {/* Aura relâmpago */}
        <circle cx="150" cy="300" r="100" fill="none" stroke="url(#lightningBolt)" strokeWidth="2" opacity="0.4" filter="url(#thorGlow)" />
        <circle cx="150" cy="300" r="120" fill="none" stroke="#1E90FF" strokeWidth="1" opacity="0.2" filter="url(#thorGlow)" />
      </svg>

      {/* Herói 3 - Direita (Pantera Negra) */}
      <svg
        className="absolute bottom-0 right-0 h-full w-1/3 opacity-95"
        viewBox="0 0 300 600"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="pantherBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a2e" />
            <stop offset="50%" stopColor="#0f0f1e" />
            <stop offset="100%" stopColor="#050510" />
          </linearGradient>
          <linearGradient id="pantherGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF8C00" />
          </linearGradient>
          <linearGradient id="vibranium" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00CED1" />
            <stop offset="100%" stopColor="#20B2AA" />
          </linearGradient>
          <filter id="pantherGlow">
            <feGaussianBlur stdDeviation="2" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Pernas em pose de combate */}
        <rect x="105" y="380" width="28" height="140" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        <rect x="167" y="400" width="28" height="120" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Botas vibrânio */}
        <rect x="102" y="515" width="34" height="35" fill="url(#vibranium)" filter="url(#pantherGlow)" />
        <rect x="164" y="515" width="34" height="35" fill="url(#vibranium)" filter="url(#pantherGlow)" />
        {/* Tronco musculoso */}
        <path d="M 85 220 L 215 220 L 225 380 L 75 380 Z" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Peito com símbolo */}
        <circle cx="150" cy="290" r="35" fill="url(#vibranium)" opacity="0.8" filter="url(#pantherGlow)" />
        <circle cx="150" cy="290" r="25" fill="url(#pantherGold)" opacity="0.7" filter="url(#pantherGlow)" />
        <path d="M 135 280 L 165 280 L 150 305 Z" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Braço esquerdo em guard */}
        <path d="M 85 240 L 30 170 L 75 310" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Garras direita */}
        <path d="M 30 170 L 25 155 L 35 165 Z" fill="url(#vibranium)" opacity="0.9" filter="url(#pantherGlow)" />
        <path d="M 25 170 L 15 165 L 22 180 Z" fill="url(#vibranium)" opacity="0.8" filter="url(#pantherGlow)" />
        {/* Braço direito em ataque */}
        <path d="M 215 240 L 270 160 L 230 310" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Garras esquerda */}
        <path d="M 270 160 L 275 145 L 265 155 Z" fill="url(#vibranium)" opacity="0.9" filter="url(#pantherGlow)" />
        <path d="M 275 160 L 285 155 L 278 170 Z" fill="url(#vibranium)" opacity="0.8" filter="url(#pantherGlow)" />
        {/* Cabeça - Máscara */}
        <circle cx="150" cy="125" r="40" fill="url(#pantherBody)" filter="url(#pantherGlow)" />
        {/* Máscara com detalhes */}
        <path d="M 120 110 L 130 100 L 150 105 L 170 100 L 180 110" fill="url(#vibranium)" filter="url(#pantherGlow)" />
        {/* Olhos - Visor */}
        <ellipse cx="135" cy="125" rx="8" ry="12" fill="url(#vibranium)" opacity="0.9" filter="url(#pantherGlow)" />
        <ellipse cx="165" cy="125" rx="8" ry="12" fill="url(#vibranium)" opacity="0.9" filter="url(#pantherGlow)" />
        <ellipse cx="135" cy="125" rx="4" ry="6" fill="#00FFFF" opacity="0.8" filter="url(#pantherGlow)" />
        <ellipse cx="165" cy="125" rx="4" ry="6" fill="#00FFFF" opacity="0.8" filter="url(#pantherGlow)" />
        {/* Detalhes de ouro */}
        <path d="M 115 135 Q 150 140 185 135" stroke="url(#pantherGold)" strokeWidth="2" fill="none" opacity="0.6" filter="url(#pantherGlow)" />
        {/* Ombros com vibrânio */}
        <ellipse cx="80" cy="240" rx="15" ry="20" fill="url(#vibranium)" opacity="0.7" filter="url(#pantherGlow)" />
        <ellipse cx="220" cy="240" rx="15" ry="20" fill="url(#vibranium)" opacity="0.7" filter="url(#pantherGlow)" />
        {/* Aura de poder */}
        <circle cx="150" cy="300" r="98" fill="none" stroke="url(#vibranium)" strokeWidth="2" opacity="0.4" filter="url(#pantherGlow)" />
        <circle cx="150" cy="300" r="115" fill="none" stroke="#1a1a2e" strokeWidth="1" opacity="0.2" filter="url(#pantherGlow)" />
      </svg>

      {/* Raios de energia entre os heróis */}
      <svg className="absolute inset-0 h-full w-full" style={{ animation: 'energyPulse 3s ease-in-out infinite' }}>
        <defs>
          <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 85, 247, 0.4)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.6)" />
            <stop offset="100%" stopColor="rgba(239, 68, 68, 0.4)" />
          </linearGradient>
          <filter id="energyGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Estilos e animações */}
      <style>{`
        @keyframes heroFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes energyPulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
