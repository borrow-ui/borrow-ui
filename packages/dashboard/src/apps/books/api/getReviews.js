/**
 * This shuold come from the database!
 *
 * For this example, we are setting a review for the first book of the list.
 * Value is hard coded.
 */

export async function getReviews() {
    return {
        1: {
            id: 1,
            isbn13: '1001592396277',
            stars: 4,
            title: 'Good introduction',
            description: `This book is a great guide to start learning React again.

Probably as good as the tutorial!`,
            started_on: '2021-05-25',
            completed: true,
            recommend_to_friends: true,
            topics: ['react', 'front-end'],
        },
    };
}
