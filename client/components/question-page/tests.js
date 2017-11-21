import React from 'react'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/mode/python'
import 'brace/theme/chrome'

const Tests = (props) => (
    <div className="bottom-code-editor">
        <AceEditor
            className="bottom-ace-editor"
            mode={props.language}
            theme="chrome"
            readOnly={true}
            name="user-input"
            editorProps={{ $blockScrolling: true }}
            value={props.tests}
            width="100%"
        />
    </div>
)

export default Tests
