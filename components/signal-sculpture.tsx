'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ambientLoop } from '@/lib/ambient-loop';

export default function SignalSculpture({ paused }: { paused: boolean }) {
  const host=useRef<HTMLDivElement>(null), pauseRef=useRef(paused);
  const controller=useRef<{invalidate:()=>void}|null>(null);
  useEffect(()=>{pauseRef.current=paused;controller.current?.invalidate();},[paused]);
  useEffect(()=>{
    const node=host.current;if(!node)return;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}catch{return;}
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));node.appendChild(renderer.domElement);
    const scene=new THREE.Scene(), camera=new THREE.PerspectiveCamera(38,1,.1,100);camera.position.z=9;
    const material=new THREE.ShaderMaterial({vertexShader:`varying vec3 vNormal; varying vec3 vPos;
      void main(){vec4 mv=modelViewMatrix*vec4(position,1.);vPos=mv.xyz;vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*mv;}`,
      fragmentShader:`varying vec3 vNormal;varying vec3 vPos;
      void main(){vec3 n=normalize(vNormal);vec3 eye=normalize(-vPos);float f=pow(1.-abs(dot(n,eye)),2.);float r=pow(max(dot(n,normalize(vec3(-1.,-.3,1.))),0.),3.);float b=pow(max(dot(n,normalize(vec3(1.,.7,.2))),0.),3.);vec3 c=vec3(.018,.018,.026)+vec3(.38,.025,.065)*r+vec3(.035,.21,.48)*b+vec3(.16,.12,.2)*f;gl_FragColor=vec4(c,1.);}`});
    const geometry=new THREE.IcosahedronGeometry(.46,1);
    const vertices=geometry.attributes.position;
    for(let i=0;i<vertices.count;i++){const x=vertices.getX(i),y=vertices.getY(i),z=vertices.getZ(i);const scale=.83+.2*Math.sin(x*17+y*11+z*23);vertices.setXYZ(i,x*scale,y*scale,z*scale);}
    geometry.computeVertexNormals();const group=new THREE.Group();scene.add(group);
    const pieces:THREE.Mesh[]=[];
    for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const mesh=new THREE.Mesh(geometry,material);mesh.position.set(Math.cos(a)*2,Math.sin(a)*2,.15*Math.sin(a*3));mesh.rotation.set(i*.7,i*.4,i*.9);mesh.scale.set(.9+(i%3)*.16,1+(i%2)*.25,.8);group.add(mesh);pieces.push(mesh);}
    const ringGeometry=new THREE.TorusGeometry(1.48,.006,8,180),ringMaterial=new THREE.MeshBasicMaterial({color:0xff608c,transparent:true,opacity:.4});const ring=new THREE.Mesh(ringGeometry,ringMaterial);scene.add(ring);
    const particlesGeometry=new THREE.BufferGeometry();const positions=new Float32Array(650*3);
    for(let i=0;i<650;i++){const r=1.1+((i*73)%100)/25,a=i*2.399963;positions[i*3]=Math.cos(a)*r;positions[i*3+1]=Math.sin(a)*r;positions[i*3+2]=((i*19)%100)/30-1.7;}
    particlesGeometry.setAttribute('position',new THREE.BufferAttribute(positions,3));const particlesMaterial=new THREE.PointsMaterial({color:0xf4afba,size:.012,transparent:true,opacity:.4});const particles=new THREE.Points(particlesGeometry,particlesMaterial);scene.add(particles);
    let pointerX=0,pointerY=0;const motion=matchMedia('(prefers-reduced-motion: reduce)');
    const loop=ambientLoop(node,(t)=>{const travel=motion.matches?0:Math.min(1,scrollY/innerHeight);group.scale.setScalar(1+travel*.22);group.rotation.z=t*.045+travel*.45;group.rotation.x=.15+Math.sin(t*.13)*.12+pointerY*.08;group.rotation.y=Math.sin(t*.11)*.18+pointerX*.08;pieces.forEach((m,i)=>{m.rotation.x=i*.7+t*.06;m.rotation.y=i*.4+t*.04;});ring.rotation.x=.3+Math.sin(t*.15)*.15;ring.rotation.y=Math.sin(t*.09)*.3;particles.rotation.z=-t*.012;renderer.render(scene,camera);},()=>pauseRef.current);controller.current=loop;
    const resize=()=>{const {width,height}=node.getBoundingClientRect();renderer.setSize(width,height);camera.aspect=width/Math.max(height,1);camera.updateProjectionMatrix();loop.invalidate();};const observer=new ResizeObserver(resize);observer.observe(node);resize();
    const pointer=(event:PointerEvent)=>{if(pauseRef.current||motion.matches)return;const r=node.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;};node.addEventListener('pointermove',pointer);
    return()=>{controller.current=null;loop.dispose();observer.disconnect();node.removeEventListener('pointermove',pointer);geometry.dispose();material.dispose();ringGeometry.dispose();ringMaterial.dispose();particlesGeometry.dispose();particlesMaterial.dispose();renderer.dispose();renderer.domElement.remove();};
  },[]);
  return <div className="signal-sculpture" ref={host} aria-hidden="true"><div className="sculpture-fallback"/></div>;
}
