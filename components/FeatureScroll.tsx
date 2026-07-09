'use client';

import {
  Component,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Image from 'next/image';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { KEYFRAMES } from '@/lib/product';
import TrampolineModel from './TrampolineModel';

gsap.registerPlugin(ScrollTrigger);

/* Plynulá interpolace kamery mezi keyframy podle scroll progressu. */
function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const posVec = useRef(new THREE.Vector3());
  const tgtVec = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3(0, 0.25, 0));
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());

  useFrame(() => {
    const p = THREE.MathUtils.clamp(progressRef.current, 0, 1);

    let i = 0;
    while (i < KEYFRAMES.length - 1 && p > KEYFRAMES[i + 1].at) i++;
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[Math.min(i + 1, KEYFRAMES.length - 1)];
    const span = Math.max(b.at - a.at, 1e-6);
    let t = a === b ? 0 : THREE.MathUtils.clamp((p - a.at) / span, 0, 1);
    t = t * t * (3 - 2 * t); // smoothstep ease

    posVec.current.copy(tmpA.current.set(...a.position)).lerp(tmpB.current.set(...b.position), t);
    camera.position.lerp(posVec.current, 0.12);

    tgtVec.current.copy(tmpA.current.set(...a.target)).lerp(tmpB.current.set(...b.target), t);
    lookAt.current.lerp(tgtVec.current, 0.12);
    camera.lookAt(lookAt.current);
  });

  return null;
}

/* Jemná auto-rotace pro mobilní variantu. */
function AutoRotate({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });
  return <group ref={group}>{children}</group>;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} />
      <directionalLight position={[-4, 3, -3]} intensity={0.5} />
      <Environment preset="city" />
    </>
  );
}

/* Ohlásí rodiči, že GLB je načtený (mountuje se až po vyřešení Suspense). */
function ModelReady({ onReady, children }: { onReady: () => void; children: ReactNode }) {
  useEffect(() => onReady(), [onReady]);
  return <>{children}</>;
}

/* Statický náhled – overlay během načítání a fallback při chybě GLB. */
function StaticPreview({ visible }: { visible: boolean }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <Image
        src="/assets/cutout_master.webp"
        alt="SkyRing 400"
        width={880}
        height={657}
        priority
        className="h-auto w-full max-w-xl object-contain"
      />
    </div>
  );
}

class ModelErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/* 3D scéna s overlay náhledem; `rig` = scroll kamera, jinak auto-rotace. */
function ModelViewport({
  progressRef,
  mobile,
}: {
  progressRef?: React.MutableRefObject<number>;
  mobile?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full">
      <ModelErrorBoundary fallback={<StaticPreview visible />}>
        <Canvas
          camera={{ position: [0, 0.35, 2.7], fov: 42 }}
          dpr={mobile ? [1, 1.5] : [1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <SceneLights />
          <Suspense fallback={null}>
            <ModelReady onReady={() => setLoaded(true)}>
              {mobile ? (
                <AutoRotate>
                  <TrampolineModel />
                </AutoRotate>
              ) : (
                <TrampolineModel />
              )}
            </ModelReady>
          </Suspense>
          {progressRef && <CameraRig progressRef={progressRef} />}
        </Canvas>
        <StaticPreview visible={!loaded} />
      </ModelErrorBoundary>
    </div>
  );
}

function DesktopScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
          let idx = 0;
          for (let i = 0; i < KEYFRAMES.length; i++) {
            if (self.progress >= KEYFRAMES[i].at - 0.06) idx = i;
          }
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const kf = KEYFRAMES[active];

  return (
    <div ref={wrapRef} style={{ height: `${KEYFRAMES.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[1fr_minmax(320px,420px)] items-center gap-8 px-6">
          <div className="h-[80vh]">
            <ModelViewport progressRef={progressRef} />
          </div>

          <div className="relative h-[30rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <div className="mb-3 text-sm font-semibold uppercase tracking-widest text-sky-brand">
                  {String(active + 1).padStart(2, '0')} /{' '}
                  {String(KEYFRAMES.length).padStart(2, '0')}
                </div>
                <h3 className="mb-4 text-3xl font-bold leading-tight">{kf.title}</h3>
                <p className="text-lg leading-relaxed text-gray-600">{kf.text}</p>
                {kf.image && (
                  <Image
                    src={kf.image}
                    alt={kf.title}
                    width={360}
                    height={270}
                    className="mt-6 h-auto w-64 drop-shadow-xl"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-0 left-0 flex gap-2">
              {KEYFRAMES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active ? 'w-8 bg-sky-brand' : 'w-3 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileFeatures() {
  return (
    <div className="px-5 py-10">
      <div className="mx-auto h-72 max-w-md">
        <ModelViewport mobile />
      </div>
      <div className="mx-auto mt-8 flex max-w-md flex-col gap-8">
        {KEYFRAMES.map((kf, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-sky-brand">
              {String(i + 1).padStart(2, '0')}
            </div>
            <h3 className="mb-2 text-xl font-bold">{kf.title}</h3>
            <p className="leading-relaxed text-gray-600">{kf.text}</p>
            {kf.image && (
              <Image
                src={kf.image}
                alt={kf.title}
                width={360}
                height={270}
                className="mt-4 h-auto w-52 drop-shadow-xl"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function FeatureScroll() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Před hydratací drž prostor, ať nevzniká layout shift.
  if (isMobile === null) return <div className="h-screen" aria-hidden />;

  return (
    <section id="funkce" className="bg-white">
      {isMobile ? <MobileFeatures /> : <DesktopScroll />}
    </section>
  );
}
