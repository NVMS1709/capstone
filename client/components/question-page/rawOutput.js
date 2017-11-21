import React from 'react'
//cannot drag horizontal scrollbar
const RawOutput = (props) => (
  <div className="scroll-viewer" style={{borderColor: props.color}}>
    <pre className="raw-output" style={{color: props.color}}>
      {props.testResult}
    </pre>
  </div>
)


export default RawOutput
