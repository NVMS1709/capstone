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
    wrapAlgorithmInput
}
