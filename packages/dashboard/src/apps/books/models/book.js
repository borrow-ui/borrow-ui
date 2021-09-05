export class BookModel {
    delete(setStore, isbn13) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const books = { ...store.books };
                    delete books[isbn13];
                    return { ...store, books };
                });
                resolve();
            }, 1000);
        });
    }
}

export const booksModel = new BookModel();
