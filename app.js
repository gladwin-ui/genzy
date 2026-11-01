import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js';

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas = document.querySelector('#hero-canvas');
if (canvas && !reduced) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(0, 0, 7);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.setClearColor(0, 0);
  const group = new THREE.Group(); scene.add(group);
  const materials = [new THREE.MeshStandardMaterial({color:0x075bfa,metalness:.55,roughness:.22}),new THREE.MeshStandardMaterial({color:0xf76dd5,metalness:.2,roughness:.25}),new THREE.MeshStandardMaterial({color:0xffac16,metalness:.45,roughness:.28})];
  const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1.25,.34,128,18,2,3), materials[0]); group.add(torus);
  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(.75,1), materials[1]); orb.position.set(-1.8,1.1,.2); group.add(orb);
  const cube = new THREE.Mesh(new THREE.BoxGeometry(.9,.9,.9), materials[2]); cube.position.set(1.8,-1.25,.2); cube.rotation.set(.5,.2,.4); group.add(cube);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(2.35,.035,12,96), new THREE.MeshBasicMaterial({color:0x10142c,transparent:true,opacity:.34})); ring.rotation.set(.8,.3,.25); group.add(ring);
  scene.add(new THREE.AmbientLight(0xffffff,2)); const light=new THREE.PointLight(0xffffff,10,12); light.position.set(2,3,4); scene.add(light);
  let mx=0,my=0; window.addEventListener('pointermove',e=>{mx=(e.clientX/innerWidth-.5)*.45;my=(e.clientY/innerHeight-.5)*.35},{passive:true});
  const resize=()=>{const r=canvas.getBoundingClientRect();renderer.setSize(r.width,r.height,false);camera.aspect=r.width/r.height;camera.updateProjectionMatrix()}; addEventListener('resize',resize); resize();
  let onScreen=true; const obs=new IntersectionObserver(([entry])=>onScreen=entry.isIntersecting); obs.observe(canvas);
  const tick=()=>{requestAnimationFrame(tick); if(!onScreen||document.hidden)return; group.rotation.y+=(mx-group.rotation.y)*.035;group.rotation.x+=(my-group.rotation.x)*.035;torus.rotation.x+=.003;torus.rotation.z+=.004;orb.rotation.y+=.009;cube.rotation.x+=.008;cube.rotation.y+=.006;renderer.render(scene,camera)}; tick();
} else if(canvas){ canvas.style.background='radial-gradient(circle at 55% 45%, #f76dd5 0 15%, #075bfa 16% 36%, transparent 37%)'; }

const menu=document.querySelector('.menu-toggle'), links=document.querySelector('.nav-links'); menu?.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',open)}); links?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
const reveals=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');reveals.unobserve(e.target)}}),{threshold:.12}); document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i%4,3)*70}ms`;reveals.observe(el)});
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('.project').forEach(card=>card.classList.toggle('hide',filter!=='all'&&card.dataset.category!==filter))}));
document.querySelector('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const form=e.currentTarget,status=form.querySelector('.form-status');if(!form.checkValidity()){status.textContent='Lengkapi field yang wajib diisi dulu ya.';status.style.color='#ffdf8a';form.reportValidity();return}status.textContent='Terima kasih — inquiry kamu sudah tercatat di demo form ini.';form.reset()});
