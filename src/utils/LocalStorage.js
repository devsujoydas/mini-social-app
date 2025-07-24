
function getArrayFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    try {
        return data ? JSON.parse(data) : [];
    } catch {
        localStorage.removeItem(key);
        return [];
    }
}


export function saveUserEmail(userEmail) {
    const key = 'email';

    const email = getArrayFromLocalStorage(key);

    if (!email.includes(userEmail)) {
        email.push(userEmail);

        localStorage.setItem(key, JSON.stringify(email));
        return true;
    }
    return false;
}
// Get all wishlist product IDs (array)
export function getUserEmail() {
    const amarEmail = getArrayFromLocalStorage('email');
    console.log(amarEmail);
    return
}

// Remove productId from wishlist
export function removeFromWishlist(productId) {
    const key = 'wishlist';
    let wishlist = getArrayFromLocalStorage(key);
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem(key, JSON.stringify(wishlist));
}
