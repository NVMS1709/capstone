const getTestCaseOutcomes = (rawOutputStr) => {
    const start = rawOutputStr.indexOf('*****Eventually the testCaseOutcomes')
    const end = rawOutputStr.indexOf('*****End the testCaseOutcomes')
    const testCaseStr = rawOutputStr.slice(start + 37, end - 1)
    const revisedStdoutStr = rawOutputStr.slice(0, start - 1) + rawOutputStr.slice(end + 29)
    return {
        testCasesStr: testCaseStr,
        revisedStdoutStr: revisedStdoutStr
    }
}

module.exports = getTestCaseOutcomes
