'use client';

import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export const MODEL_URL = '/assets/skyring400.glb?v=3';

/**
 * Načte GLB a normalizuje ho: střed do počátku, největší rozměr = 2 jednotky
 * (poloměr ~1), aby keyframy kamery fungovaly nezávisle na měřítku exportu.
 */
export default function TrampolineModel() {
  const { scene } = useGLTF(MODEL_URL);

  const normalized = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 2 / maxDim;
    clone.position.sub(center).multiplyScalar(scale);
    clone.scale.setScalar(scale);
    const group = new THREE.Group();
    group.add(clone);
    return group;
  }, [scene]);

  return (
    <group>
      <primitive object={normalized} />
      {/* Rekonstruovaný mesh nemá vyplněnou skákací plochu – zakryjeme díru
          diskem v barvě plachty, jinak by skrz model prosvítalo pozadí. */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.32, 0]}>
        <circleGeometry args={[0.95, 64]} />
        <meshStandardMaterial color="#17191d" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

useGLTF.preload(MODEL_URL);
