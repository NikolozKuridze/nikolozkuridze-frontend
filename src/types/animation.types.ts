export interface VariantProperties {
    opacity?: number;
    x?: number;
    y?: number;
    scale?: number;
    rotate?: number;
    [key: string]: unknown;
}

export interface AnimationVariants {
    hidden: VariantProperties;
    visible: VariantProperties;
    exit?: VariantProperties;
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