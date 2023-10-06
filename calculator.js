const resultLine = document.querySelector(".result")
const numbers = document.querySelector(".numbers")
const button0 = document.querySelector(".zero")
const dot = document.querySelector(".dot")
const clear = document.querySelector(".clear")
const back = document.querySelector(".back")
const operators = document.querySelector(".operators")

function init() {
    let result1, result2, result3, operation1, operation2
    let emptyResult = false
    let changedOperation = false

    console.log(result1, result2, result3, operation1, operation2)

    operators.addEventListener("click", function (event) {
        emptyResult = true

        let currentOperation = event.target.id
    
        if (result1 === 0 && (operation1 === "division" || operation1 === "multiply")) {
            resultLine.innerHTML = 0
        } else if (result1 != null) {
            if (changedOperation) {
                result2 = parseFloat(resultLine.innerHTML)
            }

            if (currentOperation === "equal" && (operation2 === null || operation2 === undefined)) {
                if (operation1 === "plus") {
                    resultLine.innerHTML = addition(result1, result2)
                } else if (operation1 === "minus") {
                    resultLine.innerHTML = subtraction(result1, result2)
                } else if (operation1 === "multiply") {
                    resultLine.innerHTML = multiply(result1, result2)
                } else if (operation1 === "division") {
                    resultLine.innerHTML = division(result1, result2)
                }
                resetCalculator()
            } else if (operation1 && (operation2 === null || operation2 === undefined)) {
                if (currentOperation != "multiply" && currentOperation != "division") {
                    if (operation1 === "plus") {
                        resultLine.innerHTML = addition(result1, result2)
                    } else if (operation1 === "minus") {
                        resultLine.innerHTML = subtraction(result1, result2)
                    } else if (operation1 === "multiply") {
                        resultLine.innerHTML = multiply(result1, result2)
                    } else if (operation1 === "division") {
                        resultLine.innerHTML = division(result1, result2)
                    }
                    updateCalculator(event)
                } else if (operation1 && (operation2 === null || operation2 === undefined) && (currentOperation === "multiply" || currentOperation === "division")) {
                    result3 = parseFloat(resultLine.innerHTML)
                    operation2 = currentOperation
                }
            }
            else if (operation1 === "multiply" || operation1 === "division") {
                if (operation1 === "multiply") {
                    resultLine.innerHTML = multiply(result1, result2)
                } else if (operation1 === "division") {
                    resultLine.innerHTML = division(result1, result2)
                }
                updateCalculator(event)
            } else if (operation2) {
                if (operation1 === "plus" && operation2 === "multiply") {
                    resultLine.innerHTML = addition(result1, multiply(result3, result2))
                } else if (operation1 === "plus" && operation2 === "division") {
                    resultLine.innerHTML = addition(result1, division(result3, result2))
                } if (operation1 === "minus" && operation2 === "multiply") {
                    resultLine.innerHTML = subtraction(result1, multiply(result3, result2))
                } else if (operation1 === "minus" && operation2 === "division") {
                    resultLine.innerHTML = subtraction(result1, division(result3, result2))
                }
                resetCalculator()
            } 
        } else {
            result1 = parseFloat(resultLine.innerHTML)
            operation1 = currentOperation
        }

    })
            
    numbers.addEventListener("click", function (event) {
        changedOperation = true
        if (emptyResult && !event.target.classList.contains("back")) {
            resultLine.innerHTML = null
            emptyResult = false
        }
    
        if ((!event.target.classList.contains("zero") 
            && !event.target.classList.contains("back")) 
            && resultLine.innerHTML === '0') {
            resultLine.innerHTML = null
        }
    
        if (event.target.classList.contains("back")) {
            let currentNumber = resultLine.innerHTML
            if ((currentNumber[0] === "-" && currentNumber.length <= 2) || currentNumber.length === 1) {
                resultLine.innerHTML = 0
            } else {
                resultLine.innerHTML = currentNumber.slice(0, -1)
            }
        } else if (event.target.classList.contains("clear")) {
            resultLine.innerHTML = 0
            resetCalculator()
        } else {
            resultLine.innerHTML += event.target.innerText
        }
    })
    
    button0.addEventListener("click", function () {
        if (resultLine.innerHTML != '0') {
            resultLine.innerHTML += 0
        } 
    })

    dot.addEventListener("click", function() {
        if (resultLine.innerHTML === 0) {
            resultLine.innerHTML = 0.
        } else {
            resultLine.innerHTML += "."
        }
    })

    function updateCalculator(event) {
        operation1 = event.target.id
        operation2 = null
        result1 = parseFloat(resultLine.innerHTML)
        result2 = null
        changedOperation = false
    }
    
    function resetCalculator() {
        console.log("resetting")
        result1 = null
        result2 = null
        result3 = null
        operation1 = null
        operation2 = null
    }

    function division(numb1, numb2) {
        let firstResult = numb1 / numb2
        let result = roundOff(firstResult)
        
        return result
    }
    
    function multiply(numb1, numb2) {
        let firstResult = numb1 * numb2
        let result = roundOff(firstResult)
        return result
    }
    
    function subtraction(numb1, numb2) {
        let firstResult = numb1 - numb2
        let result = roundOff(firstResult)
        
        return result
    }
    
    function addition(numb1, numb2) {
        let firstResult = numb1 + numb2
        let result = roundOff(firstResult)
        return result
    }

    function roundOff(tempResult) {
        tempResult = parseFloat(tempResult)
        let stringResult = tempResult.toString()
        let result 
        if (stringResult.includes('.')) {
            let splittedResult = stringResult.split(".")
            console.log(typeof(tempResult), splittedResult[1].length)
            if (splittedResult[1].length >= 6) {
                console.log(splittedResult[1][2])
                if (splittedResult[1][2] === '9') {
                    console.log(tempResult.toFixed(2))
                    result = tempResult.toFixed(2)
                } else {
                    result = tempResult.toFixed(6)
                }
            } else {
                result = tempResult.toFixed(splittedResult[1].length)
            }
        } else {
            result = tempResult
        }

        return result
    }
}

init()



