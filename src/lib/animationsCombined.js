import { keyframes, css } from 'styled-components'

const AnimationLevelBarInner = keyframes`
 0%{
     width: 0%;
 }
 100% {
     width: 100%;
 }
`
const AnimationBlinking = keyframes`
 0%{
     opacity: .1;
 }
 50% {
     opacity: 1;
 }
 100%{
     opacity: .1;
 }
`
const animationsCombined = (props) => {
    return props.level < 20
        ? css`${AnimationLevelBarInner} 800ms, ${AnimationBlinking} 1000ms infinite;`
        : css`
              ${AnimationLevelBarInner} 800ms;
          `
}

export default animationsCombined
