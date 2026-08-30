import { useRef } from 'react'
import PropTypes from 'prop-types'

export default function VerticalScrollCard({ children, className = '' }) {
  const scrollRef = useRef(null)

  const handleWheel = (e) => {
    const el = scrollRef.current
    if (!el) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const delta = e.deltaY

    // Check if container has vertical overflow to begin with
    const hasOverflow = scrollHeight > clientHeight
    if (!hasOverflow) return

    const isAtTop = scrollTop <= 0
    const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight

    // Scrolling down and not at bottom -> scroll card internally
    const scrollingDownWithinBounds = delta > 0 && !isAtBottom
    // Scrolling up and not at top -> scroll card internally
    const scrollingUpWithinBounds = delta < 0 && !isAtTop

    if (scrollingDownWithinBounds || scrollingUpWithinBounds) {
      // Prevent parent Lenis/Window/rail from converting this scroll into horizontal movement
      e.stopPropagation()
    }
  }

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      data-lenis-prevent="true"
      style={{ overscrollBehavior: 'contain' }}
      className={`max-h-[65vh] shrink-0 overflow-y-auto pr-3 ${className}`}
    >
      {children}
    </div>
  )
}

VerticalScrollCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
