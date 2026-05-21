const particleSets = {
  home: [
    [170, 160, 3, 0.38],
    [340, 232, 2, 0.26],
    [760, 154, 2.4, 0.24],
    [980, 318, 2, 0.18],
    [1480, 220, 2.6, 0.32],
    [1710, 390, 2.2, 0.2],
    [1180, 704, 2, 0.18],
    [520, 740, 2.3, 0.18]
  ],
  login: [
    [260, 180, 2.4, 0.26],
    [590, 240, 2, 0.18],
    [880, 330, 2, 0.14],
    [1460, 250, 2.3, 0.28],
    [1660, 460, 1.9, 0.18]
  ],
  dashboard: [
    [360, 190, 2.2, 0.16],
    [860, 260, 1.8, 0.1],
    [1500, 238, 2.1, 0.18],
    [1665, 515, 1.6, 0.12]
  ]
};

const variantConfig = {
  home: {
    overlay: 'from-slate-950/20 via-slate-950/8 to-slate-950/60',
    cityOpacity: 0.82,
    glowOpacity: 0.55,
    heroOpacity: 1,
    leftShade: 'rgba(2,6,23,0.22)'
  },
  login: {
    overlay: 'from-slate-950/32 via-slate-950/12 to-slate-950/68',
    cityOpacity: 0.66,
    glowOpacity: 0.42,
    heroOpacity: 0.96,
    leftShade: 'rgba(2,6,23,0.36)'
  },
  dashboard: {
    overlay: 'from-slate-950/44 via-slate-950/18 to-slate-950/72',
    cityOpacity: 0.52,
    glowOpacity: 0.32,
    heroOpacity: 0.88,
    leftShade: 'rgba(2,6,23,0.46)'
  }
};

export function CinematicHeroBackdrop({ variant = 'dashboard' }) {
  const config = variantConfig[variant] ?? variantConfig.dashboard;
  const particles = particleSets[variant] ?? particleSets.dashboard;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`skyGlow-${variant}`} cx="69%" cy="38%" r="62%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.46" />
            <stop offset="40%" stopColor="#1d4ed8" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`sky-${variant}`} x1="0" x2="1920" y1="0" y2="1080">
            <stop offset="0%" stopColor="#090616" />
            <stop offset="45%" stopColor="#11184a" />
            <stop offset="100%" stopColor="#05101f" />
          </linearGradient>
          <linearGradient id={`cape-${variant}`} x1="1320" x2="1708" y1="338" y2="1010">
            <stop offset="0%" stopColor="#6938ef" />
            <stop offset="48%" stopColor="#4c1d95" />
            <stop offset="100%" stopColor="#111827" />
          </linearGradient>
          <linearGradient id={`coat-${variant}`} x1="1376" x2="1606" y1="360" y2="890">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="45%" stopColor="#1e40af" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id={`rim-${variant}`} x1="1180" x2="1760" y1="190" y2="820">
            <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.66" />
          </linearGradient>
          <linearGradient id={`armor-${variant}`} x1="1360" x2="1648" y1="330" y2="900">
            <stop offset="0%" stopColor="#94a3b8" />
            <stop offset="26%" stopColor="#1e3a8a" />
            <stop offset="58%" stopColor="#172554" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id={`metal-${variant}`} x1="1320" x2="1740" y1="350" y2="780">
            <stop offset="0%" stopColor="#e0f2fe" />
            <stop offset="42%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id={`hair-${variant}`} x1="1410" x2="1605" y1="122" y2="300">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="42%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#1f1307" />
          </linearGradient>
          <linearGradient id={`lightning-${variant}`} x1="1210" x2="1805" y1="160" y2="745">
            <stop offset="0%" stopColor="#fefce8" />
            <stop offset="42%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <filter id={`heroShadow-${variant}`} x="-25%" y="-20%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feDropShadow dx="-22" dy="32" stdDeviation="24" floodColor="#020617" floodOpacity="0.46" />
            <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#38bdf8" floodOpacity="0.18" />
          </filter>
          <filter id={`softGlow-${variant}`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
        </defs>

        <rect width="1920" height="1080" fill={`url(#sky-${variant})`} />
        <rect width="1920" height="1080" fill={`url(#skyGlow-${variant})`} opacity={config.glowOpacity} />
        <rect width="1920" height="1080" fill={config.leftShade} />

        <g opacity={config.cityOpacity}>
          <path d="M0 772H1920V1080H0Z" fill="#020617" opacity="0.78" />
          <path d="M58 690h126v390H58zM228 615h96v465h-96zM365 720h150v360H365zM552 642h112v438H552zM704 566h164v514H704zM912 690h118v390H912zM1068 604h148v476h-148zM1248 548h126v532h-126zM1412 626h168v454h-168zM1620 520h118v560h-118zM1778 660h106v420h-106z" fill="#07111f" />
          <path d="M88 736h56M88 796h56M252 675h42M252 742h42M404 770h72M590 700h38M742 630h82M742 704h82M1104 666h76M1282 610h58M1455 700h84M1650 584h58M1810 718h42" stroke="#67e8f9" strokeWidth="12" strokeLinecap="round" opacity="0.34" />
          <path d="M0 798c218-80 388-92 528-38 170 65 349 62 536-12 218-86 450-78 856 72v260H0Z" fill="#0b1027" opacity="0.82" />
          <path d="M278 820c274-117 506-117 694 0 178 111 374 117 586 18" fill="none" stroke="#7c3aed" strokeWidth="4" opacity="0.28" />
          <path d="M420 868c288-99 512-88 672 33 155 118 329 135 522 52" fill="none" stroke="#38bdf8" strokeWidth="3" opacity="0.22" />
        </g>

        <g>
          {particles.map(([cx, cy, r, opacity]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#e0f2fe" opacity={opacity} />
          ))}
          <path d="M1384 205c138 18 255 73 352 164" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" opacity="0.12" />
          <path d="M1295 300c156 36 279 114 371 235" fill="none" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" opacity="0.1" />
        </g>

        <g filter={`url(#heroShadow-${variant})`} opacity={config.heroOpacity} transform="translate(310 28) scale(0.8)">
          <ellipse cx="1500" cy="982" rx="286" ry="48" fill="#020617" opacity="0.5" />

          <path d="M1322 340c-132 88-224 247-231 438-5 149 51 223 157 171 88-43 161-154 218-314 39-111 5-224-144-295Z" fill={`url(#cape-${variant})`} />
          <path d="M1602 338c146 80 237 229 258 416 18 162-38 238-151 180-94-48-166-161-226-317-43-111-27-221 119-279Z" fill="#1e1b4b" opacity="0.86" />
          <path d="M1300 368c156 94 314 95 469 3 52 196 54 373 5 533-186 88-365 86-535-7-45-166-22-345 61-529Z" fill={`url(#cape-${variant})`} opacity="0.46" />

          <path d="M1352 390c30-105 83-166 159-180 84-15 159 38 205 155 50 127 41 321-24 471-37 85-101 130-184 130-86 0-151-45-188-132-64-149-21-325 32-444Z" fill={`url(#armor-${variant})`} />
          <path d="M1392 410c67 36 146 39 237 5l-18 286c-68 47-138 48-210 2l-9-293Z" fill="#0f172a" opacity="0.62" />
          <path d="M1420 425c62 25 121 25 178 0l-20 148c-47 35-94 35-140 0l-18-148Z" fill={`url(#metal-${variant})`} opacity="0.86" />
          <path d="M1445 608h131l-24 145c-31 23-63 23-95 0l-12-145Z" fill="#1d4ed8" opacity="0.56" />
          <path d="M1408 374c-64 3-114 32-148 87l-30 89c55-13 107-44 155-93Z" fill={`url(#metal-${variant})`} />
          <path d="M1620 374c64 2 117 30 157 84l34 88c-58-11-112-41-164-88Z" fill={`url(#metal-${variant})`} />

          <path d="M1282 466c-51 78-78 167-80 265" fill="none" stroke="#94a3b8" strokeWidth="32" strokeLinecap="round" opacity="0.9" />
          <path d="M1745 466c54 75 83 163 87 263" fill="none" stroke="#64748b" strokeWidth="32" strokeLinecap="round" opacity="0.82" />
          <path d="M1197 730l-52 84" stroke="#1f2937" strokeWidth="24" strokeLinecap="round" />
          <path d="M1834 730l58 78" stroke="#1f2937" strokeWidth="24" strokeLinecap="round" />
          <rect x="1114" y="804" width="102" height="62" rx="10" transform="rotate(-20 1165 835)" fill={`url(#metal-${variant})`} />
          <path d="M1124 802l-70-142" stroke="#64748b" strokeWidth="16" strokeLinecap="round" />

          <path d="M1432 900c-17 54-18 103-3 147h78c9-57 7-107-6-150Z" fill="#0f172a" />
          <path d="M1553 898c-14 54-12 104 7 149h82c3-59-3-110-18-153Z" fill="#0f172a" />
          <path d="M1408 1044h126M1546 1044h138" stroke="#334155" strokeWidth="22" strokeLinecap="round" />

          <circle cx="1516" cy="224" r="68" fill="#c58f63" />
          <path d="M1446 222c12-76 68-128 145-111 42 9 76 40 98 88-79 24-160 32-243 23Z" fill={`url(#hair-${variant})`} />
          <path d="M1450 208c-29 24-47 56-54 96 39-28 69-57 90-87Z" fill={`url(#hair-${variant})`} />
          <path d="M1597 141c46 30 72 80 76 150 27-31 35-69 24-116-21-19-55-31-100-34Z" fill="#2b1607" />
          <path d="M1455 292c42 45 104 62 187 49" fill="none" stroke="#1f1307" strokeWidth="18" strokeLinecap="round" opacity="0.5" />
          <path d="M1425 318c67 58 139 72 216 42" fill="none" stroke={`url(#rim-${variant})`} strokeWidth="9" strokeLinecap="round" opacity="0.55" />

          <path d="M1297 352c96 60 170 88 222 83 55-5 119-33 192-84" fill="none" stroke={`url(#rim-${variant})`} strokeWidth="8" strokeLinecap="round" opacity="0.42" />
          <path d="M1208 360l-86-78 130 27-54-112 134 131" fill="none" stroke={`url(#lightning-${variant})`} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" opacity="0.42" />
          <path d="M1706 306l92-112-28 132 112-45-132 128" fill="none" stroke={`url(#lightning-${variant})`} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" opacity="0.34" />
          <path d="M1248 510c-41 99-54 203-38 313" fill="none" stroke="#c4b5fd" strokeWidth="5" strokeLinecap="round" opacity="0.2" />
          <path d="M1748 504c44 99 57 203 40 313" fill="none" stroke="#22d3ee" strokeWidth="5" strokeLinecap="round" opacity="0.18" />
        </g>

        <ellipse cx="1478" cy="476" rx="412" ry="324" fill="#38bdf8" opacity="0.07" filter={`url(#softGlow-${variant})`} />
      </svg>

      <div className={`absolute inset-0 bg-gradient-to-b ${config.overlay}`} />
      <div className="absolute inset-y-0 left-0 w-[64%] bg-gradient-to-r from-slate-950/78 via-slate-950/44 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
    </div>
  );
}
