export function filterAndSortReviews(
  reviews,
  searchTerm,
  sortBy,
  sortDirection
) {
  let filteredReviews = reviews;

  // Filter by search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredReviews = reviews.filter(
      (review) =>
        review.title.toLowerCase().includes(searchLower) ||
        review.author.toLowerCase().includes(searchLower) ||
        review.reviewText.toLowerCase().includes(searchLower)
    );
  }

  // Sort reviews
  return filteredReviews.sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        break;
      case 'rating':
        comparison = b.rating - a.rating;
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
    }

    return sortDirection === 'asc' ? -comparison : comparison;
  });
}