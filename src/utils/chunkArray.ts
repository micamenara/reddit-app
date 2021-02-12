export default function chunkArray(list: Array<any>, chunkSize: number) {
  var index = 0;
  let arrayLength = list.length;
  let tempArray = [];

  for (index = 0; index < arrayLength; index += chunkSize) {
    let myChunk = list.slice(index, index + chunkSize);
    tempArray.push(myChunk);
  }

  return tempArray;
}
