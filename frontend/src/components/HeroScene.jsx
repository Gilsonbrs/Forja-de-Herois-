export function HeroScene({ variant = 'login' }) {
  const isLogin = variant === 'login';
  const heroScale = isLogin ? 0.92 : 0.42;
  const heroPosition = isLogin ? 'right-10 top-10' : 'right-24 top-16';
  const heroWidth = isLogin ? 'w-[40%]' : 'w-[44%]';

  const particles = isLogin
    ? [
        { left: '14%', top: '22%', size: 2.2, alpha: 0.16 },
        { left: '26%', top: '28%', size: 3, alpha: 0.12 },
        { left: '20%', top: '44%', size: 1.8, alpha: 0.1 },
      ]
    : [
        { left: '24%', top: '16%', size: 1.8, alpha: 0.1 },
        { left: '42%', top: '26%', size: 2.2, alpha: 0.08 },
      ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.14),transparent_18%),radial-gradient(circle_at_65%_35%,rgba(59,130,246,0.08),transparent_20%)]" />
      <div className={`absolute inset-0 ${isLogin ? 'bg-[radial-gradient(circle_at_40%_30%,rgba(255,255,255,0.05),transparent_24%)]' : 'bg-[radial-gradient(circle_at_45%_40%,rgba(148,163,184,0.06),transparent_34%)]'}`} />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_42%)]" />

      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            left: particle.left,
            top: particle.top,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.alpha,
            filter: 'blur(0.35px)'
          }}
        />
      ))}

      <svg className="absolute inset-x-0 bottom-0 h-full w-full opacity-75" viewBox="0 0 1200 760" preserveAspectRatio="xMaxYMin slice">
        <defs>
          <linearGradient id="cityGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,0.16)" />
            <stop offset="100%" stopColor="rgba(59,130,246,0.04)" />
          </linearGradient>
        </defs>
        <path d="M1200 760H0V650L72 622L136 650L208 610L280 640L352 600L424 632L496 585L568 618L640 580L712 610L784 578L856 602L928 572L1000 600L1072 568L1144 600L1200 590V760Z" fill="url(#cityGlow)" opacity={isLogin ? 0.5 : 0.22} />
        <path d="M1200 650H0V595L90 570L180 600L270 570L360 595L450 567L540 590L630 560L720 585L810 555L900 580L990 550L1080 575L1170 545L1200 560V650Z" fill="rgba(255,255,255,0.05)" opacity={isLogin ? 0.35 : 0.18} />
      </svg>

      <div className={`absolute ${heroPosition} h-[86%] ${heroWidth} max-w-[760px]`}>
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 820"
          preserveAspectRatio="xMaxYMax meet"
          style={{ transform: `scale(${heroScale}) translateX(${isLogin ? '0px' : '16px'})` }}
        >
          <defs>
            <linearGradient id="heroBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="heroCape" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
            <linearGradient id="heroAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
            <filter id="heroGlow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path d="M240 120C240 90 266 72 296 72C326 72 350 92 350 120C350 148 326 180 296 180C266 180 240 148 240 120Z" fill="#0f172a" />

          <path
            d="M190 200C160 264 160 330 182 396C204 462 238 514 280 550C322 586 372 606 420 600C468 594 508 560 524 510C540 460 520 398 484 340C448 282 400 240 362 210C324 180 248 144 190 200Z"
            fill="url(#heroBody)"
            filter="url(#heroGlow)"
          />

          <path
            d="M478 214C452 186 412 168 376 158C340 148 304 150 276 176C248 202 224 242 216 288C208 334 216 380 240 424C264 468 296 500 336 522C376 544 416 556 452 552C488 548 518 528 536 498C554 468 560 430 560 400C560 370 552 332 520 306C488 280 450 252 418 222C386 192 410 214 478 214Z"
            fill="rgba(255,255,255,0.06)"
          />

          <path
            d="M118 184C104 242 122 292 154 332C186 372 222 402 264 426C306 450 356 468 408 468C460 468 500 444 520 410C540 376 548 334 542 292C536 250 516 208 484 176C452 144 416 118 380 102C344 86 304 82 268 90C232 98 202 118 178 150C154 182 138 226 118 280C98 334 84 396 90 454C96 512 122 562 166 596C210 630 268 646 320 638C372 630 410 596 440 558"
            fill="url(#heroCape)"
            opacity="0.96"
            filter="url(#heroGlow)"
          />

          <path
            d="M176 146C190 118 214 100 240 96C266 92 292 102 316 118C340 134 358 156 372 186C386 216 394 252 392 290C390 328 378 366 356 394C334 422 302 442 266 454C230 466 192 470 158 460C124 450 98 426 78 394C58 362 44 322 40 280C36 238 42 196 64 162C86 128 118 104 152 96C186 88 222 96 252 116C282 136 300 172 312 210C324 248 338 290 356 330C374 370 392 412 404 450C416 488 422 530 418 572C414 614 400 656 370 684C340 712 292 730 244 724C196 718 160 688 128 652C96 616 76 570 70 520C64 470 72 420 90 374C108 328 138 288 176 260C214 232 260 220 304 224C348 228 386 248 422 274"
            fill="rgba(255,255,255,0.04)"
          />

          <path d="M296 442C282 482 248 514 208 530C168 546 124 544 94 520" stroke="#c4b5fd" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
          <path d="M342 594C320 612 290 620 264 618C238 616 212 604 190 582" stroke="#7dd3fc" strokeWidth="12" strokeLinecap="round" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
