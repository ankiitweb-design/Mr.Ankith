// ── postprocessing shim ───────────────────────────────────
// The @react-three/postprocessing package re-exports everything
// from postprocessing. If postprocessing types aren't installed,
// this shim provides the BlendFunction enum we use.
declare module 'postprocessing' {
  export enum BlendFunction {
    ADD = 'add',
    NORMAL = 'normal',
    SCREEN = 'screen',
    MULTIPLY = 'multiply',
  }
}

// ── GSAP SplitText shim (Club GSAP - optional) ────────────
declare module 'gsap/SplitText' {
  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(target: Element | string, vars?: Record<string, unknown>);
    revert(): void;
  }
}
