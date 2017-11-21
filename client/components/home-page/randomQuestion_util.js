const getRandomQuestion = (questionsSolvedIds, questions) => {
    let questionsUnsolvedIds = questions.reduce((acc, cur) => {
        if (!questionsSolvedIds.includes(cur.id)) acc.push(cur.id)
        return acc;
    }, [])
    let randomIdx = Math.floor(Math.random() * questionsUnsolvedIds.length)
    return questions.find(question => question.id === questionsUnsolvedIds[randomIdx])
}

export default getRandomQuestion
