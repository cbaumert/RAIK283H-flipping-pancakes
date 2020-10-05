/*
 * This function shuffles an array into a random order.
 */
function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

/*
 * This function generates an array of shuffled odd integers of length n,
 * with values from 1 to n.
 */
function generateRandomArray(n) {
	a = [...Array(n + 1).keys()].slice(1, n + 1);
	for (let i = 0; i < a.length; i++) {
		a[i] = a[i] * 2 + 1;
	}
	shuffle(a);
	return a;
}

/*
 * Performs a flip operation, with the element at the provided index as the bottom
 * of the flipped pile. The flip operation is performed in place (the original 
 * array is modified), but the array is returned to the user for convenience.
 */
function flip(arr, flipIndex) {

	// iterate through the first half of the array past flipIndex
	for (let i = 0; i < flipIndex / 2; i++) {
		// get the mirrored index on the opposite side of the working half of the array
		let indexToSwap = flipIndex - i;

		// store the current value at i
		let temp = arr[i];
		// set the value at i to the value at indexToSwap
		arr[i] = arr[indexToSwap];
		// update the value at indexToSwap
		arr[indexToSwap] = temp;
	}

	return arr;
}

function arrangePancakesHelper(arr, unsortedIndex) {
	// check if the array (before unsortedIndex) is length 1 or fewer for base case
	if (unsortedIndex <= 1) {
		// do nothing, it’s sorted
		return;
	}

	// find the largest element in the array
	let largestIndex = 0;
	for (let i = 1; i <= unsortedIndex; i++) {
		if (arr[i] > arr[largestIndex]) {
			largestIndex = i;
		}
	}

	// move the largest pancake to the top (if it’s not already there)
	arr = flip(arr, largestIndex);

	// flip the whole stack of pancakes
	arr = flip(arr, unsortedIndex);

	// recurse and sort the rest of the pancakes in the stack
	return arrangePancakesHelper(arr, unsortedIndex - 1);
}

/*
 * Flips groups of pancakes such that, when the function returns, every pancake
 * is smaller than the pancake below it. Assume the top pancake has index 0.
 * The arrange operation is performed in place (the original array is modified), 
 * but the array is returned to the user for convenience.
 */
function arrangePancakes(arr) {

	arrangePancakesHelper(arr, arr.length - 1);

	return arr;
}
