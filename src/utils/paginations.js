

export const pagination = (array, page, limitPerPage) => {
 
  const sliceEnd = page * limitPerPage;
  const sliceStart = sliceEnd - limitPerPage;
  const itemsInPage = array.slice(sliceStart, sliceEnd);

  const lastPage = Math.ceil(array.length / limitPerPage);

  return { itemsInPage, lastPage };
}