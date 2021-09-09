import { getReviews } from '../api/getReviews';

export class ReviewModel {
    newReview(isbn13) {
        return {
            id: null,
            title: '',
            isbn13,
            stars: 0,
            description: '',
            completed: false,
            recommend_to_friends: false,
            topics: [],
            started_on: null,
        };
    }

    getList() {
        return getReviews();
    }

    add(setStore, review) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const reviews = { ...store.books.reviews };
                    // this action is usually done in the database side
                    review.id = Math.max(Object.values(reviews).map((r) => r.id)) + 1;
                    reviews[review.id] = review;
                    return { ...store, books: { ...store.books, reviews } };
                });
                resolve();
            }, 1000);
        });
    }

    save(setStore, review) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const reviews = { ...store.books.reviews };
                    reviews[review.id] = review;
                    return { ...store, books: { ...store.books, reviews } };
                });
                resolve();
            }, 1000);
        });
    }

    delete(setStore, id) {
        return new Promise((resolve) => {
            // Simulate some delay
            setTimeout(() => {
                setStore((store) => {
                    const reviews = { ...store.books.reviews };
                    delete reviews[id];
                    return { ...store, books: { ...store.books, reviews } };
                });
                resolve();
            }, 1000);
        });
    }
}

export const reviewsModel = new ReviewModel();
