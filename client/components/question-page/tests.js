import React from 'react'
import AceEditor from 'react-ace'

const Tests = (props) => (
    <AceEditor
        className="ace-editor"
        mode="javascript"
        theme="github"
        readOnly={true}
        name="user-input"
        editorProps={{ $blockScrolling: true }}
        value={props.tests}
    />
)

export default Tests
