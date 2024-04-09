/* eslint-disable react/no-unknown-property */

import { Environment, useAnimations, useGLTF } from "@react-three/drei"
import sceneGltf from "../assets/ps1Fight.glb?url"
import { useEffect } from "react"
import ShadowCatcher from "./ShadowCatcher"

const Scene1 = () => {
  // eslint-disable-next-line no-unused-vars
  const { scene, nodes, animations } = useGLTF(sceneGltf)
  const { actions } = useAnimations(animations, scene)

  useEffect(()=>{
    //console.log(nodes)
    Object.keys(nodes).forEach(nodeKey => {
      const node = nodes[nodeKey]
      if (node.type == "SkinnedMesh") {
        node.castShadow = true
      }
    })
  }, [nodes])

  useEffect(()=>{
    actions["Animation"].reset().fadeIn(0.5).play()

    return () => actions["Animation"].fadeOut(0.5)
  }, [actions])

  return (
    <>
      {/* <ambientLight intensity={0.1} /> */}
      <directionalLight intensity={0.8} position={[0,2,0]} castShadow />
      <Environment preset="night" />
    
      <primitive object={scene} dispose={null} castShadow />

      <ShadowCatcher />    
    </>
  )
}

export default Scene1

useGLTF.preload(sceneGltf)
