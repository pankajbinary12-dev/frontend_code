import { useState } from 'react'
import { Download } from 'lucide-react'
import '../Students/Students.css'

const FeesReport = () => {
  const [report] = useState([
    { id: 1, class: 'X-A', totalStudents: 45, totalFees: 225000, collected: 200000, pending: 25000, percentage: 88.9 },
    { id: 2, class: 'X-B', totalStudents: 42, totalFees: 210000, collected: 210000, pending: 0, percentage: 100 },
    { id: 3, class: 'IX-A', totalStudents: 48, totalFees: 240000, collected: 180000, pending: 60000, percentage: 75 },
  ])

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Fees Collection Report</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>January 2026</option>
            <option>December 2025</option>
          </select>
          <button className="btn-primary">
            <Download size={18} style={{ marginRight: '8px' }} />
            Export Report
          </button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Class</th>
              <th>Total Students</th>
              <th>Total Fees</th>
              <th>Collected</th>
              <th>Pending</th>
              <th>Collection %</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item) => (
              <tr key={item.id}>
                <td><span className="badge badge-primary">{item.class}</span></td>
                <td>{item.totalStudents}</td>
                <td>₹{item.totalFees.toLocaleString()}</td>
                <td><span className="badge badge-success">₹{item.collected.toLocaleString()}</span></td>
                <td>
                  {item.pending > 0 ? (
                    <span className="badge badge-danger">₹{item.pending.toLocaleString()}</span>
                  ) : (
                    <span className="badge badge-success">₹0</span>
                  )}
                </td>
                <td>
                  <span className={`badge ${item.percentage >= 90 ? 'badge-success' : item.percentage >= 75 ? 'badge-warning' : 'badge-danger'}`}>
                    {item.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#f7fafc', borderRadius: '12px' }}>
        <h3 style={{ marginBottom: '15px', color: '#2d3748' }}>Summary</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <p style={{ color: '#718096', fontSize: '14px' }}>Total Fees</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d3748' }}>₹6,75,000</p>
          </div>
          <div>
            <p style={{ color: '#718096', fontSize: '14px' }}>Collected</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#48bb78' }}>₹5,90,000</p>
          </div>
          <div>
            <p style={{ color: '#718096', fontSize: '14px' }}>Pending</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f56565' }}>₹85,000</p>
          </div>
          <div>
            <p style={{ color: '#718096', fontSize: '14px' }}>Collection Rate</p>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>87.4%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeesReport
