import PropTypes from 'prop-types'

export default function NeuSection({ children, className = '', id }) {
  return (
    <section id={id} className={`neu-section ${className}`}>
      {children}
    </section>
  )
}

NeuSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
}
