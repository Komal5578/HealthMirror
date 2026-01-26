'use client';

import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useStore from '../store/useStore';

// Animated human-like avatar body with mood expressions
function AvatarBody({ color, mood, equippedItems }) {
  const bodyRef = useRef();
  const headRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();
  const [tearOffset, setTearOffset] = useState(0);
  
  // Debug: Log mood to console
  useEffect(() => {
    console.log('Avatar mood:', mood);
  }, [mood]);
  
  // Realistic skin tone instead of bright colors
  const skinTone = '#FFE0BD'; // Natural skin color
  const hairColor = color === '#FFB6C1' ? '#8B4513' : 
                    color === '#87CEEB' ? '#2C1810' :
                    color === '#98FB98' ? '#654321' : '#3B2414';
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Base idle animation
    if (bodyRef.current) {
      if (mood === 'celebrating') {
        // Jumping animation when celebrating
        bodyRef.current.position.y = Math.abs(Math.sin(t * 8)) * 0.3;
      } else if (mood === 'crying') {
        // Shaking/sobbing animation
        bodyRef.current.position.x = Math.sin(t * 15) * 0.03;
        bodyRef.current.position.y = Math.sin(t * 2) * 0.02;
      } else if (mood === 'disappointed') {
        // Slumped posture
        bodyRef.current.position.y = -0.05;
      } else {
        bodyRef.current.position.y = Math.sin(t * 2) * 0.05;
        bodyRef.current.position.x = 0;
      }
    }
    
    // Head animation based on mood
    if (headRef.current) {
      if (mood === 'celebrating') {
        headRef.current.rotation.z = Math.sin(t * 10) * 0.15;
      } else if (mood === 'crying' || mood === 'disappointed') {
        // Head looking down when sad
        headRef.current.rotation.x = 0.2;
        headRef.current.rotation.z = Math.sin(t * 3) * 0.05;
      } else if (mood === 'sad') {
        headRef.current.rotation.x = 0.1;
        headRef.current.rotation.z = Math.sin(t * 2) * 0.03;
      } else {
        headRef.current.rotation.x = 0;
        headRef.current.rotation.z = Math.sin(t * 1.5) * 0.05;
      }
    }
    
    // Arms animation
    if (leftArmRef.current && rightArmRef.current) {
      if (mood === 'celebrating') {
        // Arms up celebrating
        leftArmRef.current.rotation.z = -2.5 + Math.sin(t * 10) * 0.3;
        rightArmRef.current.rotation.z = 2.5 + Math.sin(t * 10 + 1) * 0.3;
      } else if (mood === 'crying') {
        // Hands covering face
        leftArmRef.current.rotation.z = -1.2;
        rightArmRef.current.rotation.z = 1.2;
      } else if (mood === 'disappointed' || mood === 'sad') {
        // Arms hanging down sadly
        leftArmRef.current.rotation.z = 0.1;
        rightArmRef.current.rotation.z = -0.1;
      } else {
        leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 3) * 0.1;
        rightArmRef.current.rotation.z = -0.3 + Math.sin(t * 3 + 1) * 0.1;
      }
    }
    
    // Tear animation for crying
    if (mood === 'crying') {
      setTearOffset((t * 2) % 1);
    }
  });
  
  const shirtItem = equippedItems?.find(i => i.type === 'shirt');
  const pantsItem = equippedItems?.find(i => i.type === 'pants');
  const hasHat = equippedItems?.find(i => i.type === 'hat');
  
  const shirtColor = shirtItem?.color || color;
  const pantsColor = pantsItem?.color || '#4834D4';
  
  // Get eye appearance based on mood
  const getEyeProps = () => {
    switch (mood) {
      case 'happy':
        return { scaleY: 1.1, eyeColor: '#1A1A2E', brightness: 1.2 };
      case 'celebrating':
        return { scaleY: 0.2, eyeColor: '#1A1A2E', brightness: 1.3 }; // Happy squint
      case 'sad':
        return { scaleY: 0.8, eyeColor: '#4A4A5E', brightness: 0.8 };
      case 'disappointed':
        return { scaleY: 0.6, eyeColor: '#4A4A5E', brightness: 0.7 };
      case 'crying':
        return { scaleY: 0.1, eyeColor: '#4A4A5E', brightness: 0.6 }; // Eyes almost closed
      default:
        return { scaleY: 1, eyeColor: '#1A1A2E', brightness: 1 }; // Normal open eyes
    }
  };
  
  const eyeProps = getEyeProps();
  
  // Get mouth color/expression
  const getMouthColor = () => {
    switch (mood) {
      case 'happy':
      case 'celebrating':
        return '#FF6B6B'; // Bright happy
      case 'sad':
      case 'disappointed':
      case 'crying':
        return '#9999AA'; // Muted sad
      default:
        return '#FF9999';
    }
  };
  
  return (
    <group ref={bodyRef}>
      {/* Head - more realistic oval shape */}
      <group ref={headRef} position={[0, 1.6, 0]}>
        {/* Main head - elongated for realistic proportions */}
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial 
            color={skinTone} 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Forehead/top of head */}
        <mesh position={[0, 0.15, 0]} scale={[1, 1.2, 1]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial 
            color={skinTone} 
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.2, -0.05]} scale={[1.1, 1, 1.1]}>
          <sphereGeometry args={[0.36, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color={hairColor}
            roughness={0.9}
          />
        </mesh>
        
        {/* Nose */}
        <mesh position={[0, 0, 0.32]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.04, 0.08, 8]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
        
        {/* Ears */}
        <mesh position={[-0.32, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <sphereGeometry args={[0.06, 16, 16, 0, Math.PI]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
        <mesh position={[0.32, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <sphereGeometry args={[0.06, 16, 16, 0, Math.PI]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
        
        {/* Eyes - more realistic */}
        {/* Eye whites */}
        <mesh position={[-0.12, 0.08, 0.3]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.12, 0.08, 0.3]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        
        {/* Iris */}
        <mesh position={[-0.12, 0.08, 0.35]} scale={[1, eyeProps.scaleY, 1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#4A90E2" />
        </mesh>
        <mesh position={[0.12, 0.08, 0.35]} scale={[1, eyeProps.scaleY, 1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#4A90E2" />
        </mesh>
        
        {/* Pupils */}
        <mesh position={[-0.12, 0.08, 0.38]} scale={[1, eyeProps.scaleY, 1]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#1A1A2E" />
        </mesh>
        <mesh position={[0.12, 0.08, 0.38]} scale={[1, eyeProps.scaleY, 1]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#1A1A2E" />
        </mesh>
        
        {/* Eye highlights (only when happy) */}
        {(mood === 'happy' || mood === 'celebrating') && (
          <>
            <mesh position={[-0.11, 0.1, 0.39]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.13, 0.1, 0.39]}>
              <sphereGeometry args={[0.015, 8, 8]} />
              <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
            </mesh>
          </>
        )}
        
        {/* Eyebrows based on mood - more expressive */}
        {mood === 'crying' || mood === 'disappointed' ? (
          <>
            {/* Very sad eyebrows (strongly angled down) */}
            <mesh position={[-0.12, 0.17, 0.32]} rotation={[0, 0, 0.5]}>
              <boxGeometry args={[0.12, 0.03, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.12, 0.17, 0.32]} rotation={[0, 0, -0.5]}>
              <boxGeometry args={[0.12, 0.03, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        ) : mood === 'sad' ? (
          <>
            {/* Sad eyebrows (angled down) */}
            <mesh position={[-0.12, 0.18, 0.32]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.12, 0.18, 0.32]} rotation={[0, 0, -0.3]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        ) : mood === 'celebrating' ? (
          <>
            {/* Excited raised eyebrows */}
            <mesh position={[-0.12, 0.22, 0.32]} rotation={[0, 0, -0.15]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.12, 0.22, 0.32]} rotation={[0, 0, 0.15]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        ) : mood === 'happy' ? (
          <>
            {/* Happy slightly raised eyebrows */}
            <mesh position={[-0.12, 0.20, 0.32]} rotation={[0, 0, -0.05]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.12, 0.20, 0.32]} rotation={[0, 0, 0.05]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        ) : (
          <>
            {/* Normal relaxed eyebrows */}
            <mesh position={[-0.12, 0.19, 0.32]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
            <mesh position={[0.12, 0.19, 0.32]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.12, 0.025, 0.02]} />
              <meshStandardMaterial color={hairColor} />
            </mesh>
          </>
        )}
        
        {/* Mouth - different for each mood with clear expressions */}
        {mood === 'celebrating' ? (
          // Big open smile - celebrating!
          <>
            <mesh position={[0, -0.1, 0.32]} rotation={[0.4, 0, 0]}>
              <torusGeometry args={[0.12, 0.025, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#E85D75" />
            </mesh>
            {/* Open mouth teeth showing */}
            <mesh position={[0, -0.15, 0.31]}>
              <boxGeometry args={[0.12, 0.06, 0.02]} />
              <meshStandardMaterial color="#FFFFFF" />
            </mesh>
          </>
        ) : mood === 'happy' ? (
          // Happy smile - bigger and brighter
          <>
            <mesh position={[0, -0.10, 0.33]} rotation={[Math.PI * 0.1, 0, 0]} scale={[1, -1, 1]}>
              <torusGeometry args={[0.11, 0.023, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#FF6B8A" side={2} />
            </mesh>
          </>
        ) : mood === 'crying' ? (
          // Wide open crying mouth
          <>
            <mesh position={[0, -0.15, 0.32]}>
              <sphereGeometry args={[0.06, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#8B4544" />
            </mesh>
            {/* Quivering lip effect */}
            <mesh position={[0, -0.19, 0.32]} rotation={[-0.4, 0, Math.PI]}>
              <torusGeometry args={[0.07, 0.02, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#C4A5A5" />
            </mesh>
          </>
        ) : mood === 'sad' ? (
          // Sad frown
          <mesh position={[0, -0.18, 0.32]} rotation={[-0.3, 0, Math.PI]}>
            <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#C4A5A5" />
          </mesh>
        ) : mood === 'disappointed' ? (
          // Deep disappointed frown
          <mesh position={[0, -0.19, 0.32]} rotation={[-0.4, 0, Math.PI]}>
            <torusGeometry args={[0.09, 0.022, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#B49595" />
          </mesh>
        ) : (
          // Default happy smile - cheerful and upbeat!
          <>
            {/* Big cheerful UPWARD smile curve - bottom half of torus */}
            <mesh position={[0, -0.11, 0.33]} rotation={[Math.PI * 0.1, 0, 0]} scale={[1, -1, 1]}>
              <torusGeometry args={[0.1, 0.022, 8, 16, Math.PI]} />
              <meshStandardMaterial color="#FF6B8A" side={2} />
            </mesh>
          </>
        )}
        
        {/* Blush when happy/celebrating/default - always cheerful! */}
        {(mood === 'happy' || mood === 'celebrating' || !mood || mood === 'punished') && (
          <>
            <mesh position={[-0.25, -0.02, 0.28]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial 
                color="#FFB6C1" 
                transparent 
                opacity={mood === 'celebrating' ? 0.7 : 0.5} 
              />
            </mesh>
            <mesh position={[0.25, -0.02, 0.28]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial 
                color="#FFB6C1" 
                transparent 
                opacity={mood === 'celebrating' ? 0.7 : 0.5} 
              />
            </mesh>
            {/* Smile lines/laugh lines for happy moods */}
            {(mood === 'happy' || mood === 'celebrating') && (
              <>
                <mesh position={[-0.15, -0.08, 0.31]} rotation={[0, 0, 0.5]}>
                  <capsuleGeometry args={[0.005, 0.05, 4, 8]} />
                  <meshStandardMaterial color="#E8C5B5" transparent opacity={0.5} />
                </mesh>
                <mesh position={[0.15, -0.08, 0.31]} rotation={[0, 0, -0.5]}>
                  <capsuleGeometry args={[0.005, 0.05, 4, 8]} />
                  <meshStandardMaterial color="#E8C5B5" transparent opacity={0.5} />
                </mesh>
              </>
            )}
          </>
        )}
        
        {/* Worry lines/stress when sad moods */}
        {(mood === 'sad' || mood === 'disappointed' || mood === 'crying') && (
          <>
            {/* Frown lines between eyebrows */}
            <mesh position={[0, 0.14, 0.33]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.02, 0.04, 0.01]} />
              <meshStandardMaterial color="#D8B5A5" transparent opacity={0.6} />
            </mesh>
            {/* Under-eye shadows */}
            <mesh position={[-0.12, 0.02, 0.32]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#C8A595" transparent opacity={0.4} />
            </mesh>
            <mesh position={[0.12, 0.02, 0.32]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshStandardMaterial color="#C8A595" transparent opacity={0.4} />
            </mesh>
          </>
        )}
        
        {/* Tears when crying or disappointed */}
        {(mood === 'crying' || mood === 'disappointed') && (
          <>
            {/* Tear drops streaming down */}
            <mesh position={[-0.15, -0.05 - tearOffset * 0.3, 0.38]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.9} />
            </mesh>
            <mesh position={[0.15, -0.08 - tearOffset * 0.3, 0.38]}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshStandardMaterial color="#87CEEB" transparent opacity={0.9} />
            </mesh>
            {mood === 'crying' && (
              <>
                {/* Extra tears for heavy crying */}
                <mesh position={[-0.18, -0.15 - (tearOffset + 0.3) % 1 * 0.3, 0.36]}>
                  <sphereGeometry args={[0.025, 8, 8]} />
                  <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
                </mesh>
                <mesh position={[0.18, -0.18 - (tearOffset + 0.5) % 1 * 0.3, 0.36]}>
                  <sphereGeometry args={[0.025, 8, 8]} />
                  <meshStandardMaterial color="#87CEEB" transparent opacity={0.7} />
                </mesh>
              </>
            )}
          </>
        )}
        
        {/* Hat */}
        {hasHat && (
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 0.2, 16]} />
            <meshStandardMaterial color={hasHat.color} />
          </mesh>
        )}
        
        {/* Stars around head when celebrating */}
        {mood === 'celebrating' && (
          <>
            <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, Date.now() * 0.001]}>
              <octahedronGeometry args={[0.08]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0.5, 0.2, 0]} rotation={[0, 0, -Date.now() * 0.001]}>
              <octahedronGeometry args={[0.06]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[0, 0.5, 0.2]} rotation={[Date.now() * 0.001, 0, 0]}>
              <octahedronGeometry args={[0.07]} />
              <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} />
            </mesh>
          </>
        )}
      </group>
      
      {/* Neck */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
        <meshStandardMaterial color={skinTone} roughness={0.8} />
      </mesh>
      
      {/* Torso - more realistic body shape */}
      <mesh position={[0, 0.75, 0]}>
        <capsuleGeometry args={[0.25, 0.5, 16, 32]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      
      {/* Shoulders */}
      <mesh position={[-0.3, 1.05, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      <mesh position={[0.3, 1.05, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial color={shirtColor} />
      </mesh>
      
      {/* Arms - realistic with elbows */}
      <group ref={leftArmRef} position={[-0.35, 1.0, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, 0.2]}>
          <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        {/* Elbow */}
        <mesh position={[-0.05, -0.4, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        {/* Forearm */}
        <mesh position={[-0.1, -0.6, 0]}>
          <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.15, -0.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>
      
      <group ref={rightArmRef} position={[0.35, 1.0, 0]}>
        {/* Upper arm */}
        <mesh position={[0, -0.2, 0]} rotation={[0, 0, -0.2]}>
          <capsuleGeometry args={[0.08, 0.25, 8, 16]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0.05, -0.4, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={shirtColor} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0.1, -0.6, 0]}>
          <capsuleGeometry args={[0.07, 0.25, 8, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
        {/* Hand */}
        <mesh position={[0.15, -0.8, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.8} />
        </mesh>
      </group>
      
      {/* Hips/Waist */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.22, 0.25, 0.15, 16]} />
        <meshStandardMaterial color={pantsColor} />
      </mesh>
      
      {/* Legs - realistic with knees */}
      {/* Left leg */}
      <group position={[-0.12, 0.3, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.11, 0.3, 8, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.65, 0]}>
          <capsuleGeometry args={[0.09, 0.3, 8, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
      </group>
      
      {/* Right leg */}
      <group position={[0.12, 0.3, 0]}>
        {/* Thigh */}
        <mesh position={[0, -0.2, 0]}>
          <capsuleGeometry args={[0.11, 0.3, 8, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Knee */}
        <mesh position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
        {/* Shin */}
        <mesh position={[0, -0.65, 0]}>
          <capsuleGeometry args={[0.09, 0.3, 8, 16]} />
          <meshStandardMaterial color={pantsColor} />
        </mesh>
      </group>
      
      {/* Feet - realistic shoes */}
      <mesh position={[-0.12, -0.92, 0.08]}>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.7} />
      </mesh>
      <mesh position={[0.12, -0.92, 0.08]}>
        <boxGeometry args={[0.15, 0.1, 0.25]} />
        <meshStandardMaterial color="#2C3E50" roughness={0.7} />
      </mesh>
    </group>
  );
}

// Level badge
function LevelBadge({ level, mood }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      const baseY = 2.3;
      ref.current.position.y = baseY + Math.sin(state.clock.getElapsedTime() * 2) * 0.1;
      
      if (mood === 'celebrating') {
        ref.current.rotation.z = state.clock.getElapsedTime() * 2;
        ref.current.scale.setScalar(1 + Math.sin(state.clock.getElapsedTime() * 5) * 0.2);
      } else {
        ref.current.rotation.z = 0;
        ref.current.scale.setScalar(1);
      }
    }
  });
  
  return (
    <group ref={ref}>
      <mesh>
        <circleGeometry args={[0.2, 32]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

// Platform
function Platform() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.05, 0]}>
      <circleGeometry args={[1.5, 32]} />
      <meshStandardMaterial color="#E8E8E8" />
    </mesh>
  );
}

// Scene
function AvatarScene({ interactive }) {
  const { avatarColor, guiderMood, guiderLevel, equippedItems } = useStore();
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[-3, 3, 3]} intensity={0.4} color="#FFB6C1" />
      
      {/* Avatar scaled up and positioned properly */}
      <group scale={1.2} position={[0, 0, 0]}>
        <AvatarBody color={avatarColor} mood={guiderMood} equippedItems={equippedItems} />
      </group>
      <LevelBadge level={guiderLevel} mood={guiderMood} />
      <Platform />
      
      {interactive && (
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
      )}
    </>
  );
}

// Loading fallback
function LoadingFallback({ height }) {
  return (
    <div style={{ 
      height, 
      width: '100%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
      borderRadius: '1rem' 
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ 
          width: '50px', 
          height: '50px', 
          margin: '0 auto 10px',
          border: '4px solid #8B5CF6', 
          borderTopColor: 'transparent', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite' 
        }}></div>
        <p style={{ color: '#A78BFA', fontSize: '14px' }}>Loading Avatar...</p>
      </div>
    </div>
  );
}

// Main export with error boundary
export default function Avatar3D({ className = '', interactive = true, height = '400px' }) {
  const [mounted, setMounted] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { avatarColor, guiderMood, equippedItems, guiderLevel } = useStore();
  
  useEffect(() => {
    setMounted(true);
    
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasError(true);
      }
    } catch (e) {
      setHasError(true);
    }
  }, []);
  
  if (!mounted) {
    return <LoadingFallback height={height} />;
  }
  
  // Fallback 2D Avatar
  if (hasError) {
    const getMoodText = () => {
      switch (guiderMood) {
        case 'happy': return 'Happy';
        case 'celebrating': return 'Celebrating!';
        case 'sad': return 'Sad';
        case 'disappointed': return 'Disappointed';
        case 'crying': return 'Very Sad';
        default: return 'Neutral';
      }
    };
    
    const getMoodAnimation = () => {
      switch (guiderMood) {
        case 'celebrating': return 'bounce 0.5s ease infinite';
        case 'crying': return 'shake 0.3s ease infinite';
        case 'disappointed': return 'none';
        default: return 'none';
      }
    };
    
    return (
      <div 
        className={className}
        style={{ 
          height, 
          width: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
          borderRadius: '1rem' 
        }}
      >
        <div style={{ textAlign: 'center' }}>
          {/* 2D Avatar Fallback */}
          <div style={{
            width: '120px',
            height: '160px',
            margin: '0 auto',
            position: 'relative',
            animation: getMoodAnimation()
          }}>
            {/* Rain cloud for crying */}
            {guiderMood === 'crying' && (
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '12px',
                color: '#94a3b8',
                fontWeight: 'bold'
              }}>~ ~ ~</div>
            )}
            {/* Body */}
            <div style={{
              width: '60px',
              height: '80px',
              backgroundColor: avatarColor,
              borderRadius: '30px 30px 20px 20px',
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)'
            }}></div>
            {/* Head */}
            <div style={{
              width: '70px',
              height: '70px',
              backgroundColor: avatarColor,
              borderRadius: '50%',
              position: 'absolute',
              top: guiderMood === 'crying' ? '10px' : '0',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: '500',
              color: 'white'
            }}>
              {getMoodText()}
            </div>
            {/* Stars for celebrating */}
            {guiderMood === 'celebrating' && (
              <>
                <div style={{ position: 'absolute', top: '-10px', left: '0', fontSize: '16px', color: '#FFD700' }}>*</div>
                <div style={{ position: 'absolute', top: '-10px', right: '0', fontSize: '16px', color: '#FFD700' }}>*</div>
              </>
            )}
          </div>
          <div style={{ 
            marginTop: '10px',
            padding: '4px 12px',
            background: 'rgba(255, 215, 0, 0.3)',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            <span style={{ color: '#FFD700', fontWeight: 'bold' }}>Lvl {guiderLevel}</span>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={className} style={{ height, width: '100%' }}>
      <Canvas
        camera={{ position: [0, 0.5, 6.5], fov: 50 }}
        onCreated={() => console.log('Canvas created')}
        onError={() => setHasError(true)}
      >
        <Suspense fallback={null}>
          <AvatarScene interactive={interactive} />
        </Suspense>
      </Canvas>
    </div>
  );
}
