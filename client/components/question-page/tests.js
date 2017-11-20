import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/chrome'

const Tests = (props) => (
    <AceEditor
        className="ace-editor"
        mode="javascript"
        theme="chrome"
        readOnly={true}
        name="user-input"
        editorProps={{ $blockScrolling: true }}
        value={props.tests}
    />
)

export default Tests
