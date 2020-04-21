/**
 * Breaks down an Array into arrays of specified sizes and an array of the remaining values.
 *
 * @param initialArray is the original array you want broken down
 * @param newArrayLength is the length you want the smaller arrays to be
 *
 * @returns An array of the smaller arrays
 */
function splitArray (initialArray, newArrayLength) {
    const numOfNewArrays = Math.ceil(initialArray.length / newArrayLength);
    let newArray = [];
    for (let i = 0; i < numOfNewArrays; i++) {
        let smallArray = initialArray.slice((i * newArrayLength), ((i * newArrayLength) + newArrayLength));
        newArray.push(smallArray);
    }
    return newArray;
}