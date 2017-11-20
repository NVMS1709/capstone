import React from 'react'
//cannot drag horizontal scrollbar
const RawOutput = (props) => (
  <div className="scroll-viewer" >
    <pre className="raw-output">
      {props.testResult}
    </pre>
  </div>
)


export default RawOutput
