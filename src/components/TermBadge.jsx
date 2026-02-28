function TermBadge({ type }) {
  return (
    <span className={`badge ${type}`}>
      {type.toUpperCase()}
    </span>
  );
}

export default TermBadge;