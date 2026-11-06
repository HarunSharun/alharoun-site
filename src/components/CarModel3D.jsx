import { Suspense, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, ContactShadows, Environment, Lightformer, useProgress } from '@react-three/drei'
import parts from '../data/parts.json'
import { useBuild } from '../store.js'

const MODEL_URL = '/models/car-new.glb'
const PLATFORM_Y = -0.9
const WHEEL_NODES = {
  'wheel-1': 'wheels_classic',
  'wheel-2': 'wheels_forged',
}
const SPOILER_NODES = {
  'spoiler-duckbill': 'spoiler_duckbill',
}


function Car() {
  const { scene } = useGLTF(MODEL_URL)
  const paintId = useBuild((s) => s.paint)
  const color = parts.paint.find((p) => p.id === paintId).color

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    return 4 / Math.max(size.x, size.y, size.z)
  }, [scene])

  const paintMaterials = useMemo(() => {
    const all = new Set()
    scene.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        [].concat(obj.material).forEach((m) => all.add(m))
      }
    })
    const list = [...all]
    const byName = list.filter((m) => /paint|body|carpaint/i.test(m.name))
    if (byName.length > 0) return byName
    return list.filter(
      (m) => m.color && m.color.r > 0.5 && m.color.r > m.color.g * 2 && m.color.r > m.color.b * 2
    )
  }, [scene])

  useEffect(() => {
    paintMaterials.forEach((m) => m.color.set(color))
  }, [paintMaterials, color])
useEffect(() => {
  scene.traverse((obj) => {
    if (obj.isMesh) obj.castShadow = true
  })
}, [scene])
const wheelsId = useBuild((s) => s.wheels)

useEffect(() => {
  const active = WHEEL_NODES[wheelsId]
  const found = []
  scene.traverse((obj) => {
    Object.values(WHEEL_NODES).forEach((name) => {
      if (obj.name.startsWith(name)) {
        obj.visible = name === active
        found.push(obj.name)
      }
    })
  })
  console.log('Wheel objects:', found)
}, [scene, wheelsId])
const spoilerId = useBuild((s) => s.spoiler)
useEffect(() => {
  const active = SPOILER_NODES[spoilerId]
  scene.traverse((obj) => {
    Object.values(SPOILER_NODES).forEach((name) => {
      if (obj.name.startsWith(name)) obj.visible = name === active
    })
  })
}, [scene, spoilerId])
  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  )
}
function LoadingText() {
  const { active, progress } = useProgress()
  if (!active) return null
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        placeItems: 'center',
        pointerEvents: 'none',
        color: '#111'
      }}
    >
      {Math.round(progress)}%
    </div>
  )
}

export default function CarModel3D() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 420,
        borderRadius: 12,
        background: 'radial-gradient(ellipse at 50% 62%, #4a4541 0%, #2a2725 55%, #141312 100%)',
      }}
    >
      <Canvas shadows camera={{ position: [6.5, 2.5, 8], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={1.0} />
        <directionalLight
  position={[5, 8, 5]}
  intensity={3.5}
  castShadow
  shadow-mapSize={[1024, 1024]}
  shadow-bias={-0.0005}
  shadow-camera-left={-6}
  shadow-camera-right={6}
  shadow-camera-top={6}
  shadow-camera-bottom={-6}
/>
        <directionalLight position={[-6, 4, -5]} intensity={1.8} />
        <hemisphereLight args={['#ffffff', '#444444', 0.8]} />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 4, 1]} />
          <Lightformer form="rect" intensity={2} position={[-6, 2, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="rect" intensity={2} position={[6, 2, 3]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
          <Lightformer form="ring" intensity={2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={4} />
        </Environment>
    
        <Suspense fallback={null}>
          <Car />
          <ContactShadows position={[0, PLATFORM_Y + 0.01, 0]} opacity={0.9} blur={2.8} far={5} scale={12} resolution={1024} />
        </Suspense>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1.2}
          enablePan={false}
          minDistance={3}
          maxDistance={10}
          maxPolarAngle={Math.PI / 2.05}
        />
      </Canvas>
      <LoadingText />
    </div>
  )
}

useGLTF.preload(MODEL_URL)