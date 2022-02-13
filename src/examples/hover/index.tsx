import React from "react";
import { useSpring, animated } from 'react-spring';
import { merge } from 'lodash';
import { SpringAnimationProps, AnimatableStylesPartial } from '../../@types';

interface HoverProps extends SpringAnimationProps, AnimatableStylesPartial {
    lift?: boolean;
    invert?: boolean;
    emphasize?: boolean;
};

enum OOBHoverStyles {
    lift,
    invert,
    emphasize
}

const liftPreset = {
    from: {
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.8)',
    },
    to: {
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.8)',
        transition: 'box-shadow 0.1s'
    }
}

interface EmphasizeArgs {
    initHeight: string | number;
    initWidth: string | number;
    finHeight: string | number;
    finWidth: string | number;
    t: number; // in seconds / recommended 0.1
}

const emphasizePreset = ({ 
    initHeight, 
    initWidth, 
    finHeight, 
    finWidth, 
    t
}: EmphasizeArgs) => ({
    from: {
        height: initHeight,
        width: initWidth
    },
    to: {
        height: finHeight,
        width: finWidth,
        transition: `height ${t}s, width ${t}s`
    }
});

const invertPreset = ({ bg, color, font = null, t = 0.5 }: { bg: string, color: string, font?: string, t?: number }) => ({
    from: {
        background: bg,
        color,
        font: font ?? 'Quicksand, sans-serif'
    },
    to: {
        background: color,
        color: bg,
        font: font ?? 'Quicksand, sans-serif',
        transition: `background ${t}s, color ${t}s`
    }
});


/**
 * fromStyle: { cssAttributes that are going to be changed in the animation }
 * toStyle: { what to change the css attributes to }
 * styles directly as props: styles we dont plan on changing at all
 */
export const Hover: React.FC<HoverProps> = ({ 
    children, 
    toStyle = {}, 
    fromStyle = {},
    emphasize = false,
    invert = false,
    lift = false,
    ...customStyles
}) => {
    const [active, setActive] = React.useState(false);
    const activateHover = () => setActive(true);
    const deactivateHover = () => setActive(false);
    const styles = merge({}, fromStyle, customStyles);

    if (lift) {
        let finalTransitionString: string | null | undefined;
        if (toStyle.transition) {
            finalTransitionString = liftPreset.to.transition + ', ' + toStyle.transition;
        } else {
            finalTransitionString = liftPreset.to.transition;
        }
        // from
        merge(
            styles,
            {
                boxShadow: liftPreset.from.boxShadow
            }
        )
        // to 
        merge(
            toStyle,
            {
                boxShadow: liftPreset.to.boxShadow,
                transition: finalTransitionString
            }
        )
    }

    if (invert) {
        let finalTransitionString: string | null | undefined;
        const invertObj = invertPreset({
            bg: styles.background ?? styles.backgroundColor,
            color: styles.color,
            font: styles.font ?? ''
        });

        if (toStyle.transition) {
            finalTransitionString = invertObj.to.transition + ', ' + toStyle.transition;
        } else {
            finalTransitionString = invertObj.to.transition;
        }
        // from
        merge(
            styles,
            {
                ...invertObj.from
            }
        );
        // to 
        merge(
            toStyle,
            {
                ...invertObj.to,
                transition: finalTransitionString
            }
        );
    }

    const animatedStyles = useSpring({
        to: active ? { ...toStyle } : { ...styles },
        from: { ...styles }
    });
    return (
        <animated.div 
            style={animatedStyles} 
            onMouseEnter={activateHover} 
            onMouseLeave={deactivateHover}
        >
            {children}
        </animated.div>
    );
};

export const hoverExampleStyles = {
    from: {
        borderRadius: '4px',
        backgroundColor: 'cyan',
        padding: '1rem',
        margin: '1rem',
        height: '200px',
        width: '200px',
        boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.8)',
        color: 'purple'
    },
    to: {
        height: '220px',
        width: '220px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.8)',
        padding: '1rem',
        margin: '1rem',
        backgroundColor: 'violet',
        transition: 'height 0.1s, width 0.1s, background 0.1s, box-shadow 0.1s'
    }
}