module.exports = [
	{
		id: 1,
		question: 'Write a function that will return the sum of two numbers equal to 4',
		previous: null,
		next: 2
	},
	{
		id: 2,
		question: 'Write a function that will return "Fizz" if it is divisible by 3; "Buzz" if it is divisible by 5; "FizzBuzz" if it is divisible by 3 and 5',
		previous: 1,
		next: 3
	},
	{
		id: 3,
		question: 'Write a function to reverse the following string: "NodeJS"',
		previous: 2,
		next: 4
	},
	{
		id: 4,
		question: 'Write a function that will find the missing number in the array: \n[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20]',
		previous: 3,
		next: 5
	},
	{
		id: 5,
		question: 'Write a function that returns all even numbers up to 50',
		previous: 4,
		next: 6
	},
	{
		id: 6,
		question: 'Write a function to return "true" if there is a prime number in a list of array. A prime number is greater than 1. e.g. 17',
		previous: 5,
		next: 7
	},
	{
		id: 7,
		question: 'Implement bubble sort. e.g. arr = [4,2,5,3]',
		previous: 6,
		next: 8
	},
	{
		id: 8,
		question: 'This challenge is to determine if there is some subset of numbers in an array that can sum number S. Naive solution: generate every possible set(the power set), and then check if the sum of any of these sets equals the sum S. e.g. arr = [1,2,3] sum = 5',
		previous: 7,
		next: 9
	},
	{
		id: 9,
		question: 'Given a number N that represents where the minute hand currently is on a clock. Your program should return the angle that is formed by the minute hand and the 12 o\'clock mark on the clock. e.g. 15',
		previous: 8,
		next: 10
	},
	{
		id: 10,
		question: 'Write a function which takes an array of integers and returns true if any three consecutive elements sum to 7. e.g. [2, 1, 5, 1, 0]',
		previous: 9,
		next: '11'
	}
]