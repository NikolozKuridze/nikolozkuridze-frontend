export interface AnimationVariants {
    hidden: any;
    visible: any;
    exit?: any;
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