const getTestCaseOutcomes = (rawOutputStr) => {
    const start = rawOutputStr.indexOf('*****Eventually the testCaseOutcomes')
    const end = rawOutputStr.indexOf('*****End the testCaseOutcomes')
    const testCasesStr = rawOutputStr.slice(start + 37, end - 1)
    const revisedStdoutStr = rawOutputStr.slice(0, start) + rawOutputStr.slice(end + 29)
    return {
        testCasesStr: testCasesStr,
        revisedStdoutStr: revisedStdoutStr
    }
}

const getPythonTestCaseOutcomes = (rawOutputStr) => {

    const start = rawOutputStr.indexOf('test_case_1 (__main__.TestProgram) ...')
    const end = rawOutputStr.indexOf('test_case_9 (__main__.TestProgram) ...')
    const testCasesStr = rawOutputStr.slice(start, end + 41)


    // var separators = ['ok', 'FAIL']
    // var testCases = testCasesStr.split(new RegExp(separators.join('|'), 'g'))
    let testCases = testCasesStr.split('\n')
    console.log("TEST CASES IN UTIL_________", testCases, "____________TEST CASES IN UTIL")
    let testCasesArr = []

    if (testCases[0]) {
        for (let i = 1; i < testCases.length; i++) {
            const testCaseStr = testCases.find(testCase => testCase.includes(`test_case_${i}`))
            testCasesArr.push({
                title: `Test Case #${i}`,
                outcome: testCaseStr.includes('ok') ? 'passed' : 'failed'
            })
        }
    }
    console.log("TEST CASES ARR IN UTIL_______", testCasesArr, "_______TEST CASES ARR IN UTIL")

    return testCasesArr

}

const wrapTestfile = (testFile, functionName) => {
    return `
describe('${functionName}', function () {
    const ${functionName} = require('./algorithm-input');

    let testCaseOutcomes = [];

    afterEach(function(){
        testCaseOutcomes.push({title: this.currentTest.title, outcome: this.currentTest.state});
    });

    after(function(){
        console.log("*****Eventually the testCaseOutcomes", JSON.stringify(testCaseOutcomes), "*****End the testCaseOutcomes")
    })
` + testFile + `
});
`
}

const wrapAlgorithmInput = (algorithmInput, functionName) => {
    return algorithmInput + `\nmodule.exports = ${functionName}`
}

module.exports = {
    getTestCaseOutcomes,
    wrapTestfile,
    wrapAlgorithmInput,
    getPythonTestCaseOutcomes
}
