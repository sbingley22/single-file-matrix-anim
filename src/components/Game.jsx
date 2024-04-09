/* eslint-disable react/no-unknown-property */

import { Canvas } from "@react-three/fiber"
import { Suspense } from "react"
import Scene1 from "./Scene1"
import { OrbitControls } from "@react-three/drei"
import {
  BrightnessContrast,
  ChromaticAberration,
  EffectComposer,
  Glitch,
  Noise,
  Pixelation,
  Sepia,
  Vignette
} from '@react-three/postprocessing'
import { useControls, Leva } from 'leva'

const Game = () => {
  const { pixelate, noiseValue, glitchValue, chromaticValue, sepiaValue, playSound } = useControls({
    pixelate: {
      label: 'Pixelate',
      value: 0,
      min: 0,
      max: 12,
      step: 1
    },
    noiseValue: {
      label: 'Noise',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    },
    glitchValue: {
      label: 'Glitch',
      value: false
    },
    chromaticValue: {
      label: 'Chromatic',
      value: false
    },
    sepiaValue: {
      label: 'Sepia',
      value: 0,
      min: 0,
      max: 1,
      step: 0.1
    }
  })

  return (
    <>
      <Leva collapsed={true} />
      <Canvas shadows camera={{ position: [2, 1.5, 0] }} >
        <Suspense>
          <OrbitControls />
          
          <group position-y={-1}>
            <Scene1 />
          </group>

        </Suspense>

        <EffectComposer>
          <BrightnessContrast brightness={-0.0} contrast={0.2} />
          <Noise opacity={noiseValue} />
          <Pixelation granularity={pixelate} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
          <Glitch
            delay={[0.1, 0.3]}
            duration={[0.2, 1.0]}
            strength={[0.01, 0.02]}
            //mode={GlitchMode.SPORADIC}
            active={glitchValue}
            ratio={0.85}
          />
          <ChromaticAberration offset={chromaticValue ? [0.001, 0.001] : [0, 0]} />
          <Sepia intensity={sepiaValue} />
        </EffectComposer>

      </Canvas>
    </>
  )
}

export default Game