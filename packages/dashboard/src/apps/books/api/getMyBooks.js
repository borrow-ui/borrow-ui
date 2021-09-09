/**
 * This shuold come from the database!
 *
 * For this example, just take the first n books from one call
 * https://api.itbook.store/1.0/search/react
 *
 * The result is saved in the json file in this folder, to speed up
 * development and for the purpose of this demo.
 */

export async function getMyBooks() {
    // const response = await fetch('https://api.itbook.store/1.0/search/react');
    // const { books } = await response.json();
    const { books } = require('./getMyBooks.json');
    // Return by "id" (which is isbn13)
    return books.slice(0, 10).reduce((all, book) => ({ ...all, [book.isbn13]: book }), {});
}
