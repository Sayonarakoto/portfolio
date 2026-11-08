import PropTypes from 'prop-types'

export default function NeuInput({ label, className = '', as: Component = 'input', ...props }) {
  return (
    <label className={`neu-field ${className}`}>
      <span>{label}</span>
      <Component className="neu-input" {...props} />
    </label>
  )
}

NeuInput.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
}
