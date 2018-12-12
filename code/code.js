module.exports = [{
	id: 1,
	code: function add (a, b) {
		return a + b
	},
	answer: 4
},
{
	id: 2,
	code: function check (num) {
		if (num <= 0) return
		if (num % 3 === 0) {
			console.log('Fizz')
		} else if (num % 5 === 0) {
			console.log('Buzz')
		} else if (num % 3 === 0 && num % 5 === 0) {
			console.log('FizzBuzz')
		}
		check(num - 1)
	},
	answer: 50
},
{
	id: 3,
	code: function (str) {
		let reversed = ''
		for (char of str) {
			reversed = char + reversed
		}
		return reversed
	},
	answer: 'SJedoN'
},
{
	id: 4,
	code: function (arr) {
		const numArr = arr
		const num = numArr.length
		const totalSum = (num + 1) * (num + 2) / 2
		const numArrSum = numArr.reduce((a, b) => a + b, 0)
		const answer = totalSum - numArrSum
		return answer
	},
	answer: 4
},
// answer: this.code([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20])
{
	id: 5,
	code: function (a) {
		const result = a % 2
		if (result === 0)
			return true
		else
			return false
	},
	answer: 4
},
// answer: this.code()
{
	id: 6,
	code: function (number) {
		for (var i = 2; i < number; i++) {
			if (number % i === 0) {
				return false
			}
		}
		return number > 1
	},
	answer: 4
},
// answer: 5
{
	id: 7,
	code: function (arr, i1, i2) {
		var temp = arr[i1]
		arr[i1] = arr[i2]
		arr[i2] = temp
	},
	answer: 4
},
// answer: 5
{
	id: 8,
	code: function (arr) {
		var swapped = true
		while (swapped) {
			swapped = false
			for (var i = 1; i < arr.length; i++) {
				if (arr[i - 1] > arr[i]) {
					var temp = arr[i - 1]
					arr[i - 1] = arr[i]
					arr[i] = temp
					swapped = true
				}
			}
		}
		return arr
	},
	answer: 4
},
// answer: 5
{
	id: 9,
	code: function (arr) {
		var sum = Math.max.apply(null, arr)
		arr.splice(arr.indexOf(sum), 1)
		var sets = [
			[]
		]
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0, len = sets.length; j < len; j++) {
				var temp = sets[j].concat(arr[i])
				sets.push(temp)
				var s = temp.reduce(function (p, c) {
					return p + c
				})
				if (s === sum) {
					return 'true'
				}
			}
		}
		return 'false'
	},
	answer: 4
},
// answer: 5
{
	id: 10,
	code: function (num) {
		if (num <= 30)
			return 6 * num
		else
			return 180 - (num - 30) * 6
	},
	answer: 4
}]