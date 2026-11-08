import PropTypes from 'prop-types'

export default function NeuButton({ children, className = '', type = 'button', ...props }) {
  return (
    <button type={type} className={`neu-button ${className}`} {...props}>
      {children}
    </button>
  )
}

NeuButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
}
