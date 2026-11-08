import PropTypes from 'prop-types'

export default function NeuCard({ children, className = '', inset = false, as: Component = 'div', ...props }) {
  return (
    <Component className={`${inset ? 'neu-inset' : 'neu-raised'} ${className}`} {...props}>
      {children}
    </Component>
  )
}

NeuCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  inset: PropTypes.bool,
  as: PropTypes.elementType,
}
