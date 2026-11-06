import { Component, Suspense, useMemo } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center, ContactShadows, Environment, Lightformer, useProgress } from '@react-three/drei'

class ViewerBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (this.state.failed) {
      return (
        <div style={{ height: 360, display: 'grid', placeItems: 'center', borderRadius: 12, background: '#141312' }}>
          3D model could not load
        </div>
      )
    }
    return this.props.children
  }
}

function Model({ url }) {
  const { scene } = useGLTF(url)

  const scale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    return 4 / Math.max(size.x, size.y, size.z)
  }, [scene])

  return (
    <Center bottom>
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
        color: '#fff',
      }}
    >
      {Math.round(progress)}%
    </div>
  )
}

export default function GuessViewer({ url }) {
  return (
    <ViewerBoundary key={url}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 360,
          borderRadius: 12,
          background: 'radial-gradient(ellipse at 50% 62%, #4a4541 0%, #2a2725 55%, #141312 100%)',
        }}
      >
        <Canvas camera={{ position: [6, 2.5, 7], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={1.0} />
          <directionalLight position={[5, 8, 5]} intensity={3.5} />
          <directionalLight position={[-6, 4, -5]} intensity={1.8} />
          <Environment resolution={256}>
            <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[10, 4, 1]} />
            <Lightformer form="rect" intensity={2} position={[-6, 2, 3]} rotation-y={Math.PI / 2} scale={[8, 3, 1]} />
            <Lightformer form="rect" intensity={2} position={[6, 2, 3]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
          </Environment>
          <Suspense fallback={null}>
            <Model url={url} />
            <ContactShadows position={[0, 0.01, 0]} opacity={0.9} blur={2.8} far={5} scale={12} resolution={1024} />
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
    </ViewerBoundary>
  )
}