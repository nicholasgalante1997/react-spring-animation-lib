import * as CSS from 'csstype';
import { SpringValue } from 'react-spring';

export type SpringSafeOptionalCSS = EmbedSpringValue<CSS.Properties>;

export type RecursivePartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

export type EmbedSpringValue<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? EmbedSpringValue<U> : 
    T[P] extends object ? EmbedSpringValue<T[P]> :
    SpringValue<T[P]>;
}

export type AnimatableStylesPartial = RecursivePartial<AnimatableStyles>;

export interface SpringAnimationProps {
    toStyle?: AnimatableStylesPartial;
    fromStyle?: AnimatableStylesPartial;
}

interface AnimatableStyles {
    width: number | string;
    height: number | string;
    background: string;
    backgroundColor: string;
    boxShadow: string;
    margin: string | number;
    padding: string | number;
    borderRadius: string | number;
    transition: string;
    font: string;
    color: string;
}