"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type SilkFlowProps = {
  /** Ribbon tint. */
  color?: string;
  /** Flow rate. 0.12 = calm, 0.30+ = energetic. */
  speed?: number;
  /** UV scale. Higher = more, thinner ribbons. */
  scale?: number;
  /** Domain-warp magnitude. 0 = raw FBM, 4–5 = silk, 6–8 = dramatic. */
  warpStrength?: number;
  /** 0 = soft wash, 1 = binary edges. ~0.55 matches Unizen. */
  contrast?: number;
  /** Flow angle in degrees. 0 = right, 90 = down, 180 = left. */
  flowDirection?: number;
  hueShift?: number;
  noiseIntensity?: number;
  scanlineIntensity?: number;
  scanlineFrequency?: number;
  /** Internal buffer scale. <1 lowers fragment cost without changing CSS size. */
  resolutionScale?: number;
};

const vertexShader = `attribute vec2 position;
void main(){gl_Position=vec4(position,0.0,1.0);}`;

const fragmentShader = `#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uWarpStrength;
uniform float uContrast;
uniform float uFlowDirection;
uniform float uHueShift;
uniform float uNoise;
uniform float uScan;
uniform float uScanFreq;

float hash(vec2 p){
    return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);
}

// Value noise with cubic Hermite interpolation between 4 corner hashes.
float vnoise(vec2 p){
    vec2 i=floor(p);
    vec2 f=fract(p);
    vec2 u=f*f*(3.0-2.0*f);
    return mix(
        mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),
        mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),
        u.y
    );
}

float fbm(vec2 p){
    float v=0.0;
    float a=0.5;
    for(int i=0;i<6;i++){
        v+=a*vnoise(p);
        p*=2.0;
        a*=0.5;
    }
    return v;
}

mat3 rgb2yiq=mat3(0.299,0.587,0.114,0.596,-0.274,-0.322,0.211,-0.523,0.312);
mat3 yiq2rgb=mat3(1.0,0.956,0.621,1.0,-0.272,-0.647,1.0,-1.106,1.703);

vec3 hueShiftRGB(vec3 col,float deg){
    vec3 yiq=rgb2yiq*col;
    float rad=radians(deg);
    float cosh=cos(rad),sinh=sin(rad);
    vec3 yiqShift=vec3(yiq.x,yiq.y*cosh-yiq.z*sinh,yiq.y*sinh+yiq.z*cosh);
    return clamp(yiq2rgb*yiqShift,0.0,1.0);
}

float rand(vec2 c){return fract(sin(dot(c,vec2(12.9898,78.233)))*43758.5453);}

void main(){
    // Aspect-correct UV so ribbons don't squash on wide viewports.
    vec2 uv=gl_FragCoord.xy/uResolution.xy;
    uv.x*=uResolution.x/uResolution.y;
    uv*=uScale;

    // Directional drift: angle in degrees, polar to cartesian.
    float angle=radians(uFlowDirection);
    vec2 flowDir=vec2(cos(angle),sin(angle));
    vec2 flow=flowDir*uTime*uSpeed;

    // Domain warp pass 1 — bend the field with itself.
    vec2 q=vec2(
        fbm(uv+flow),
        fbm(uv+flow+vec2(5.2,1.3))
    );

    // Domain warp pass 2 — bend the bent field. This is the silk step.
    vec2 r=vec2(
        fbm(uv+q*uWarpStrength+flow+vec2(1.7,9.2)),
        fbm(uv+q*uWarpStrength+flow+vec2(8.3,2.8))
    );

    // Final FBM sample on twice-warped coords.
    float silk = fbm(uv + r * uWarpStrength);

    float centerLine =
        uScale * 0.5 +
        sin(uv.x * 4.0 + uTime * 0.15) * 0.15;

    float dist = abs(uv.y - centerLine);

    float ribbon =
        smoothstep(0.80, 0.0, dist);

    float v = silk * ribbon;

    // Contrast: symmetric smoothstep band around 0.5.
    // contrast=0 → linear; 0.5 → moderate; 1 → binary cut.
    float halfWidth=(1.0-uContrast)*0.5;
    v=smoothstep(0.5-halfWidth,0.5+halfWidth,v);

    // Transparent ribbon — alpha = ribbon mask so whatever sits behind shows through.
    vec3 final=hueShiftRGB(uColor,uHueShift);

    // Optional FX.
    float scanline_val=sin(gl_FragCoord.y*uScanFreq)*0.5+0.5;
    final*=1.0-(scanline_val*scanline_val)*uScan;
    final+=(rand(gl_FragCoord.xy+uTime)-0.5)*uNoise;

    gl_FragColor=vec4(clamp(final,0.0,1.0),v);
}`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return [r, g, b];
}

export default function SilkFlow({
  color = "#1a6fd4",
  speed = 0.15,
  scale = 2.5,
  warpStrength = 4.0,
  contrast = 0.6,
  flowDirection = 0,
  hueShift = 0,
  noiseIntensity = 0,
  scanlineIntensity = 0,
  scanlineFrequency = 128,
  resolutionScale = 1,
}: SilkFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable mirror so the render loop reads the latest props without recreating WebGL.
  const propsRef = useRef({
    color,
    speed,
    scale,
    warpStrength,
    contrast,
    flowDirection,
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    scanlineFrequency,
    resolutionScale,
  });
  propsRef.current = {
    color,
    speed,
    scale,
    warpStrength,
    contrast,
    flowDirection,
    hueShift,
    noiseIntensity,
    scanlineIntensity,
    scanlineFrequency,
    resolutionScale,
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // alpha:true — ribbon mask is the alpha channel so layers behind show through.
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas as HTMLCanvasElement;

    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const [r0, g0, b0] = hexToRgb(propsRef.current.color);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      uniforms: {
        uResolution: { value: [1, 1] },
        uTime: { value: 0 },
        uColor: { value: [r0, g0, b0] },
        uSpeed: { value: propsRef.current.speed },
        uScale: { value: propsRef.current.scale },
        uWarpStrength: { value: propsRef.current.warpStrength },
        uContrast: { value: propsRef.current.contrast },
        uFlowDirection: { value: propsRef.current.flowDirection },
        uHueShift: { value: propsRef.current.hueShift },
        uNoise: { value: propsRef.current.noiseIntensity },
        uScan: { value: propsRef.current.scanlineIntensity },
        uScanFreq: { value: propsRef.current.scanlineFrequency },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = container.clientWidth || 1;
      const h = container.clientHeight || 1;
      const scaleFactor = propsRef.current.resolutionScale;
      renderer.setSize(w * scaleFactor, h * scaleFactor);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      program.uniforms.uResolution.value = [canvas.width, canvas.height];
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    let rafId = 0;
    let lastT = performance.now();
    let simT = 0;
    const tick = (now: number) => {
      const dt = (now - lastT) / 1000;
      lastT = now;
      // uSpeed handles flow rate inside the shader; simT advances at wall-clock.
      simT += dt;

      const [r, g, b] = hexToRgb(propsRef.current.color);
      program.uniforms.uColor.value = [r, g, b];
      program.uniforms.uTime.value = simT;
      program.uniforms.uSpeed.value = propsRef.current.speed;
      program.uniforms.uScale.value = propsRef.current.scale;
      program.uniforms.uWarpStrength.value = propsRef.current.warpStrength;
      program.uniforms.uContrast.value = propsRef.current.contrast;
      program.uniforms.uFlowDirection.value = propsRef.current.flowDirection;
      program.uniforms.uHueShift.value = propsRef.current.hueShift;
      program.uniforms.uNoise.value = propsRef.current.noiseIntensity;
      program.uniforms.uScan.value = propsRef.current.scanlineIntensity;
      program.uniforms.uScanFreq.value = propsRef.current.scanlineFrequency;

      renderer.render({ scene: mesh });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      const loseCtx = gl.getExtension("WEBGL_lose_context");
      loseCtx?.loseContext();
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
}
