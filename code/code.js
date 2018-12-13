module.exports = [{
	id: 1,
	code: function () {
		return 2 + 2
	}
},
{
	id: 2,
	code: function () {
		for (var i = 1; i < 50; i++) {
			if (i % 15 == 0) console.log('FizzBuzz')
			else if (i % 3 == 0) console.log('Fizz')
			else if (i % 5 == 0) console.log('Buzz')
			else console.log(i)
		}
	}
},
{
	id: 3,
	code: function () {
		return 'SJedoN'
	}
},
{
	id: 4,
	code: function () {
		const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]
		const num = numArr.length
		const totalSum = (num + 1) * (num + 2) / 2
		const numArrSum = numArr.reduce((a, b) => a + b, 0)
		const answer = totalSum - numArrSum
		return answer
	}
},
{
	id: 5,
	code: function () {
		for (var i = 0; i < 50; i++) {
			if (i % 2 === 0) {
				return true
			} else {
				return false
			}
		}
	}
},
{
	id: 6,
	code: function () {
		let number = 17
		if (number % 2 === 0) {
			return false
		} else {
			return true
		}
	}
},
{
	id: 7,
	code: function () {
		let arr = [4, 2, 5, 3]
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
	}
},
{
	id: 8,
	code: function () {
		let arr = [1, 2, 3]
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
					return true
				}
			}
		}
		return false
	}
},
{
	id: 9,
	code: function () {
		let num = 15
		if (num <= 30)
			return 6 * num
		else
			return 180 - (num - 30) * 6   
	}
},
{
	id: 10,
	code: function () {
		let arr = [2, 1, 5, 1, 0]
		for (var i = 2; i < arr.length; i++) {
			if (arr[i] + arr[i - 1] + arr[i - 2] === 7) {
				return true
			}
		}
		return false
	}
}
]