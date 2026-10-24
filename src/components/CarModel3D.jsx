import { Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, ContactShadows, Html, useProgress } from '@react-three/drei'

const MODEL_URL = '/models/car-new.glb'

function Car() {
  const { scene } = useGLTF(MODEL_URL)

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    return 4 / Math.max(size.x, size.y, size.z)
  }, [scene])

  return (
    <Center>
      <primitive object={scene} scale={scale} />
    </Center>
  )
}

function Loader() {
  const { progress } = useProgress()
  return <Html center>{Math.round(progress)}%</Html>
}

export default function CarModel3D() {
  return (
    <div style={{ width: '100%', height: 420 }}>
      <Canvas camera={{ position: [5, 2, 6], fov: 40 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5,1, 6]} intensity={2.2} />
        <Suspense fallback={<Loader />}>
          <Car />
          <ContactShadows position={[0, 0, 0]} opacity={0.5} blur={2.5} far={4} />
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
    </div>
  )
}

useGLTF.preload(MODEL_URL)