import React from 'react'
//cannot drag horizontal scrollbar
const CustomOutput = props => (
  <div id="customoutput-scroll-viewer" >
    <pre className="raw-output">
      {props.testResult.map((result, idx) => (
        <p
          key={idx}
          style={
            result.outcome === 'passed' ? { color: 'green' } : { color: 'red' }
          }
        >
          {result.title + ' ' + result.outcome}
        </p>
      ))}
    </pre>
  </div>
)

export default CustomOutput
