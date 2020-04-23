import { h, Ref } from '@vue/runtime-dom'
import { css } from 'emotion'
import { useCssVar } from '../../src'

export interface ResizebarProps {
  axis: 'x' | 'y'
  bounds: {
    min: Ref<number> | number
    max: Ref<number> | number
  }
  rootSelector: string
}
export default {
  props: ['axis', 'bounds', 'rootSelector'],
  setup(props: ResizebarProps) {
    let { axis, rootSelector, bounds } = props

    const refCssVar = useCssVar(rootSelector)

    const checkPosition = (e: MouseEvent | TouchEvent) => {
      const touch = e instanceof TouchEvent ? e.touches[0] : e
      const barPosition =
        axis === 'x' ? touch.pageX : window.innerHeight - touch.pageY

      if (bounds && (bounds.min >= barPosition || bounds.max <= barPosition))
        return false

      refCssVar.value = barPosition + 'px'
    }

    const dragstart = () => {
      document.onselectstart = () => false

      window.addEventListener('mousemove', checkPosition)
      window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', checkPosition)
        dragend()
      })
      window.addEventListener('touchmove', checkPosition)
      window.addEventListener('touchend', () => {
        window.removeEventListener('touchmove', checkPosition)
        dragend()
      })
    }

    const dragend = () => {
      document.onselectstart = () => true
    }

    return () =>
      h('div', {
        class: styles[axis],
        onMouseDown: dragstart,
        onTouchStart: dragstart
      })
  }
}

const styles = {
  x: css`
    height: 100vh;
    width: 10px;
    position: absolute;
    bottom: 0;
    right: -5px;
    cursor: ew-resize;
  `,
  y: css`
    height: 10px;
    width: 100%;
    position: absolute;
    top: -5px;
    left: 0;
    cursor: ns-resize;
  `
}
