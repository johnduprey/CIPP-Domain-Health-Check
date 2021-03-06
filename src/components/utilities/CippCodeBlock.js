import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CButton } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faClipboard } from '@fortawesome/free-regular-svg-icons'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useSelector } from 'react-redux'

function CippCodeBlock({
  code,
  language,
  showLineNumbers = true,
  startingLineNumber,
  wrapLongLines = true,
}) {
  const [codeCopied, setCodeCopied] = useState(false)
  const currentTheme = useSelector((state) => state.app.currentTheme)

  let codeStyle = atomOneDark
  if (currentTheme === 'cyberdrain') {
    codeStyle = atomOneLight
  }
  const onCodeCopied = () => {
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  return (
    <>
      {code !== undefined && (
        <div className="cipp-code">
          <CopyToClipboard text={code} onCopy={() => onCodeCopied()}>
            <CButton
              color={codeCopied ? 'success' : 'info'}
              className="cipp-code-copy-button"
              size="sm"
              variant="ghost"
            >
              {codeCopied ? (
                <FontAwesomeIcon icon={faClipboard} />
              ) : (
                <FontAwesomeIcon icon={faCopy} />
              )}
            </CButton>
          </CopyToClipboard>

          <SyntaxHighlighter
            language={language}
            showLineNumbers={showLineNumbers}
            startingLineNumber={startingLineNumber}
            wrapLongLines={wrapLongLines}
            wrapLines={wrapLongLines}
            style={codeStyle}
            className="cipp-code-block"
          >
            {code}
          </SyntaxHighlighter>
        </div>
      )}
    </>
  )
}

export default CippCodeBlock

CippCodeBlock.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  showLineNumbers: PropTypes.bool,
  startingLineNumber: PropTypes.number,
  wrapLongLines: PropTypes.bool,
}
