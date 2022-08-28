import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  // find the starting index of the items on this page
  const startIndex = (pageNumber - 1) * pageSize;
  // use lodash to get all items for page
  // slice array of items starting from startIndex
  //_.slice(items, startIndex)
  // take the number of items you need from said new array
  //_.take();
  // but first convert items array to a lodash wrapper object
  // do functions, and convert back to array with value()
  return _(items)
    .slice(startIndex) // slice array of items starting from startIndex
    .take(pageSize) // take the number of items you need from said new array
    .value(); // convert back to array with value()
}
