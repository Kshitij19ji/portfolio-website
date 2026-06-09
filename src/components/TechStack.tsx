import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import SkillMarquee from "./SkillMarquee";

const skills = [
  "Python", "PyTorch", "Flask", "Flutter", "Firebase",
  "MySQL", "Dart", "NumPy", "Pandas", "React",
  "Next.js", "C++", "SQL", "HTML", "Git"
];

const createTextTexture = (text: string) => {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.Texture();

  // Solid background
  ctx.fillStyle = "#0c1524";
  ctx.fillRect(0, 0, 512, 512);

  // Outer border glow
  ctx.shadowColor = "#22d3ee";
  ctx.shadowBlur = 20;
  ctx.strokeStyle = "#06b6d4";
  ctx.lineWidth = 25;
  ctx.strokeRect(0, 0, 512, 512);

  // Reset shadow for text
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dynamic font sizing
  let fontSize = 90;
  if (text.length > 6) fontSize = 75;
  if (text.length > 8) fontSize = 65;
  if (text.length > 10) fontSize = 55;

  ctx.font = `bold ${fontSize}px "Space Grotesk", sans-serif`;
  ctx.fillText(text, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 16;
  return texture;
};

const textures = skills.map((skill) => createTextTexture(skill));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

type SphereGeoProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  isMobile: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  isMobile,
}: SphereGeoProps) {
  const api = useRef<RapierRigidBody | null>(null);

  // Clone material locally to glow individual spheres rather than all of them
  const localMaterial = useMemo(() => {
    return material.clone();
  }, [material]);

  // Clean up material clone to prevent memory leaks
  useEffect(() => {
    return () => {
      localMaterial.dispose();
    };
  }, [localMaterial]);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const forceFactor = isMobile ? 0.35 : 1.0;
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale * forceFactor,
          -150 * delta * scale * forceFactor,
          -50 * delta * scale * forceFactor
        )
      );

    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow={!isMobile}
        receiveShadow={!isMobile}
        scale={scale}
        geometry={sphereGeometry}
        material={localMaterial}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
  isMobile: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive, isMobile }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const lerpFactor = isMobile ? 0.08 : 0.2;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      lerpFactor
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sphereCount = isMobile ? 12 : 30;
  const spheresList = useMemo(() => {
    return [...Array(sphereCount)].map(() => ({
      scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)] * (isMobile ? 0.85 : 1),
    }));
  }, [sphereCount, isMobile]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack" style={{ 
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      padding: "40px 0 0 0",
      boxSizing: "border-box",
      marginTop: "0",
      height: "auto",
      overflow: "hidden"
    }}>
      <div style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100vw",
        height: "1px",
        backgroundColor: "rgba(255,255,255,0.2)",
        zIndex: 10
      }} />
      
      <h2 style={{ 
        position: "relative",
        zIndex: 10,
        fontSize: "70px", 
        textAlign: "center", 
        width: "100%", 
        fontWeight: "500", 
        textTransform: "uppercase",
        letterSpacing: "-1px",
        margin: "0 0 40px 0"
      }}>
        My <span style={{
          background: "linear-gradient(90deg, #22d3ee, #a5f3fc)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>Techstack</span>
      </h2>
      
      <div style={{ zIndex: 10, width: "100%" }}>
        <SkillMarquee skills={skills} />
      </div>

      <div style={{ width: "100%", height: "60vh", position: "relative", zIndex: 1, marginTop: "20px" }}>
        <Canvas
          shadows={!isMobile}
          gl={{ alpha: true, stencil: false, depth: false, antialias: !isMobile }}
          camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
          onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
          style={{ width: "100%", height: "100%" }}
        >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow={!isMobile}
          shadow-mapSize={isMobile ? [128, 128] : [512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} isMobile={isMobile} />
          {spheresList.map((props, i) => {
            const skillIndex = i % skills.length;
            return (
              <SphereGeo
                key={i}
                {...props}
                material={materials[skillIndex]}
                isActive={isActive}
                isMobile={isMobile}
              />
            );
          })}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        {!isMobile && (
          <EffectComposer enableNormalPass={false}>
            <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
          </EffectComposer>
        )}
      </Canvas>
      </div>
    </div>
  );
};

export default TechStack;
