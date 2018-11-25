module.exports = {
    addNumbers: function (a, b) {
        return a + b
    },
    fizzBuzz: function (a) {
        if (a % 3 === 0) {
            return 'Fizz'
        } else if (a % 5 === 0) {
            return 'Bizz'
        } else if (a % 3 === 0 && a % 5 === 0) {
            return 'FizzBuzz'
        }
    },
    reverse: function (str) {
        let reversed = ''
        for (char of str) {
            reversed = char + reversed
        }
        return reversed
    },
    missingNum: function () {
        const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        const num = numArr.length

        const totalSum = (num + 1) * (num + 2) / 2
        const numArrSum = numArr.reduce((a, b) => a + b, 0)
        const num = totalSum - numArrSum

        return num
    }
}