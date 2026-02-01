import { useState } from 'react'
import { Download, Eye, Send } from 'lucide-react'
import '../Students/Students.css'

const ReportCards = () => {
  const [reportCards] = useState([
    { id: 1, rollNo: '001', name: 'Rahul Kumar', class: 'X-A', exam: 'Mid Term', status: 'Generated', generatedDate: '2026-01-20' },
    { id: 2, rollNo: '002', name: 'Priya Sharma', class: 'X-A', exam: 'Mid Term', status: 'Generated', generatedDate: '2026-01-20' },
    { id: 3, rollNo: '003', name: 'Amit Singh', class: 'X-B', exam: 'Mid Term', status: 'Pending', generatedDate: '-' },
  ])

  return (
    <div className="module-container">
      <div className="module-header">
        <h2>Report Cards</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>Select Class</option>
            <option>X-A</option>
            <option>X-B</option>
          </select>
          <select style={{ padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <option>Mid Term</option>
            <option>Final Term</option>
          </select>
          <button className="btn-primary">Generate All</button>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Class</th>
              <th>Exam</th>
              <th>Generated Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportCards.map((card) => (
              <tr key={card.id}>
                <td>{card.rollNo}</td>
                <td>{card.name}</td>
                <td><span className="badge badge-primary">{card.class}</span></td>
                <td>{card.exam}</td>
                <td>{card.generatedDate}</td>
                <td>
                  <span className={`badge ${card.status === 'Generated' ? 'badge-success' : 'badge-warning'}`}>
                    {card.status}
                  </span>
                </td>
                <td>
                  {card.status === 'Generated' ? (
                    <div className="action-buttons">
                      <button className="btn-icon btn-view" title="View">
                        <Eye size={16} />
                      </button>
                      <button className="btn-icon btn-edit" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="btn-icon" style={{ color: '#667eea' }} title="Send Email">
                        <Send size={16} />
                      </button>
                    </div>
                  ) : (
                    <button className="btn-action">Generate</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ReportCards
