import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useRef } from 'react'

function SpinningStars() {
  const starsRef = useRef()

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005
    }
  })

  return (
    <group ref={starsRef}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </group>
  )
}

export default function ThreeScene() {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full z-0">
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <SpinningStars />
    </Canvas>
  )
}
