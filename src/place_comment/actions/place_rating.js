exports.addPlaceRating = async (place, rating) => {
    switch (rating) {
        case 1:
            place.count_rating_1 = place.count_rating_1 + 1;
            break;
        case 2:
            place.count_rating_2 = place.count_rating_2 + 1;
            break;
        case 3:
            place.count_rating_3 = place.count_rating_3 + 1;
            break;
        case 4:
            place.count_rating_4 = place.count_rating_4 + 1;
            break;
        case 5:
            place.count_rating_5 = place.count_rating_5 + 1;
            break;
    }
    
    place.total_rating = place.total_rating + 1;
    place.avg_rating = ((place.count_rating_1 * 1) + (place.count_rating_2 * 2) + (place.count_rating_3 * 3) + (place.count_rating_4 * 4) + (place.count_rating_5 * 5)) / place.total_rating;
    return place;
}

exports.removePlaceRating = async (place, rating) => {
    switch (rating) {
        case 1:
            place.count_rating_1 = place.count_rating_1 - 1;
            break;
        case 2:
            place.count_rating_2 = place.count_rating_2 - 1;
            break;
        case 3:
            place.count_rating_3 = place.count_rating_3 - 1;
            break;
        case 4:
            place.count_rating_4 = place.count_rating_4 - 1;
            break;
        case 5:
            place.count_rating_5 = place.count_rating_5 - 1;
            break;
    }

    place.total_rating = place.total_rating - 1;
    if (place.total_rating === 0) {
        place.avg_rating = 0;
    } else {
        place.avg_rating = ((place.count_rating_1 * 1) + (place.count_rating_2 * 2) + (place.count_rating_3 * 3) + (place.count_rating_4 * 4) + (place.count_rating_5 * 5)) / place.total_rating;
    }
    return place;
}