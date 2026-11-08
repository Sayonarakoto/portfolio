import PropTypes from 'prop-types'

export default function OrganicBlob({ className = '' }) {
  return <div aria-hidden="true" className={`organic-blob ${className}`} />
}

OrganicBlob.propTypes = {
  className: PropTypes.string,
}
