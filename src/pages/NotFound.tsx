import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found-page">
      <p className="not-found-page__code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="pill-btn pill-btn--dark">
        Back to home
      </Link>
    </div>
  )
}
