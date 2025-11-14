export interface AnimationVariant {
    opacity?: number;
    x?: number | string;
    y?: number | string;
    scale?: number;
    rotate?: number;
    transition?: TransitionProps;
    [key: string]: unknown;
}

export interface AnimationVariants {
    hidden: AnimationVariant;
    visible: AnimationVariant;
    exit?: AnimationVariant;
}

export interface TransitionProps {
    duration?: number;
    delay?: number;
    ease?: string | number[];
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
}

export interface AnimationConfig {
    initial: string | object;
    animate: string | object;
    exit?: string | object;
    transition?: TransitionProps;
    variants?: AnimationVariants;
}