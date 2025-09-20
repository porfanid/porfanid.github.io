import React from 'react'

function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`main-tab-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
