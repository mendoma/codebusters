module.exports = {
	addNumbers: function (a, b) {
		return a + b
	},
	fizzBuzz: function (a) {
		if (a % 3 === 0) {
			return 'Fizz'
		} else if (a % 5 === 0) {
			return 'Buzz'
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
	missingNum: function (arr) {
		const numArr = arr
		const num = numArr.length
		const totalSum = (num + 1) * (num + 2) / 2
		const numArrSum = numArr.reduce((a, b) => a + b, 0)
		const answer = totalSum - numArrSum
		return answer
	},
	oddNum: function(a){
		const result = a % 2
		if (result === 0)
			return true
		else
			return false
	},
	primeCheck: function(number) {
		// Loop to check to see if a number has divisors other than one and itself.
		// Note: Loops from two to one less than the number we're checking.
		for (var i = 2; i < number; i++) {      
			// If the number is evenly divisible
			// by a number between two and one less than itself,
			// then it is not prime.
			if (number % i === 0) {      
				// So return false.
				return false
			}
		}  
		// A prime number has to be greater than one,
		// even if it has a divisor other than one and itself.
		return number > 1
	},
	//swap() is used by bubblesort
	swap: function(arr, i1, i2) {
		var temp = arr[i1]
		arr[i1] = arr[i2]
		arr[i2] = temp
	},
	//bubblesort calls swap()
	bubblesort: function (arr) {
		var swapped = true        
		// keep going unless no elements can be swapped anymore
		while (swapped) {          
			// set swapped to false so that the loop stops
			// unless two element are actually swapped
			swapped = false      
			// loop through the whole array swapping adjacent elements
			for (var i = 1; i < arr.length; i++) {
				if (arr[i-1] > arr[i]) {                
					var temp = arr[i-1]
					arr[i-1] = arr[i]
					arr[i] = temp              
					//swap(arr, i-1, i);
					swapped = true
				}
			}          
		}        
		return arr               
	},
	ArrayAdditionI: function (arr) {
		// get largest number and remove it from array
		var sum = Math.max.apply(null, arr)
		arr.splice(arr.indexOf(sum), 1)        
		// power set
		var sets = [[]]      
		// generate the power set and for each new set
		// check if the temporary sum equals our sum above
		for (var i = 0; i < arr.length; i++) {
			for (var j = 0, len = sets.length; j < len; j++) {
				var temp = sets[j].concat(arr[i])
				sets.push(temp)
				var s = temp.reduce(function(p, c) { return p + c })
				if (s === sum) { return 'true' }
			}
		}       
		return 'false'             
	},
	simple_clock_angle:function (num)
	{
		//This method returns the angle made by the minute hand and the hour hand given that the hour hand is at 12
		if (num <= 30)
			return 6 * num
		else
			return 180 - (num - 30) * 6   
		//This allows for measuring the angle on the top half of the hour (between 31 - 59)
	},
	lucky_sevens:function (arr) {
  
		// if less than 3 elements then this challenge is not possible
		if (arr.length < 3) {
			return 'not possible'
		}     
		// because we know there are at least 3 elements we can
		// start the loop at the 3rd element in the array (i=2)
		// and check it along with the two previous elements (i-1) and (i-2)
		for (var i = 2; i < arr.length; i++) {
			if (arr[i] + arr[i-1] + arr[i-2] === 7) {
				return true 
			}
		}     
		// if loop is finished and no elements summed to 7
		return false     
	}
}