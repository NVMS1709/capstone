import React from 'react'
//cannot drag horizontal scrollbar
const RawOutput = (props) => (
  <div id="rawoutput-scroll-viewer">
    <pre className="raw-output" style={{ color: 'black' }}>
      {props.testResult}
    </pre>
  </div>
)

export default RawOutput
