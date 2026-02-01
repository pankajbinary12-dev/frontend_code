import './StatsCard.css'

const StatsCard = ({ icon: Icon, title, value, color, trend }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-icon" style={{ background: `${color}20`, color: color }}>
        <Icon size={28} />
      </div>
      <div className="stats-info">
        <p className="stats-title">{title}</p>
        <h2 className="stats-value">{value}</h2>
        {trend && (
          <span className={`stats-trend ${trend > 0 ? 'positive' : 'negative'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
    </div>
  )
}

export default StatsCard
