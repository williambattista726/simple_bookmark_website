// Function to save bookmarks to localStorage
function saveBookmarksToLocalStorage() {
    const bookmarks = [];
    document.querySelectorAll('.bookmark-btn').forEach(bookmark => {
        const name = bookmark.textContent.trim();
        const url = bookmark.querySelector('a').href;
        bookmarks.push({ name, url });
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Function to load bookmarks from localStorage
function loadBookmarksFromLocalStorage() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarkList = document.getElementById('bookmarkList');
    bookmarks.forEach(bookmark => {
        const li = document.createElement('li');
        li.classList.add('bookmark-btn');
        li.innerHTML = `<a href="${bookmark.url}" target="_blank">${bookmark.name}</a>`;
        bookmarkList.appendChild(li);
    });
}

// Add event listeners
document.getElementById('addBookmarkBtn').addEventListener('click', function() {
    document.getElementById('addBookmarkModal').style.display = 'flex';
});

document.getElementById('removeBookmarkBtn').addEventListener('click', function() {
    document.getElementById('removeBookmarkModal').style.display = 'flex';
});

document.getElementById('closeAddModal').addEventListener('click', function() {
    document.getElementById('addBookmarkModal').style.display = 'none';
});

document.getElementById('closeRemoveModal').addEventListener('click', function() {
    document.getElementById('removeBookmarkModal').style.display = 'none';
});

document.getElementById('saveBookmarkBtn').addEventListener('click', function() {
    const name = document.getElementById('bookmarkName').value;
    const url = document.getElementById('bookmarkUrl').value;
    if (name && url) {
        const bookmarkList = document.getElementById('bookmarkList');
        const li = document.createElement('li');
        li.classList.add('bookmark-btn');
        li.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        bookmarkList.appendChild(li);
        saveBookmarksToLocalStorage();
    }
    document.getElementById('addBookmarkModal').style.display = 'none';
});

document.getElementById('deleteBookmarkBtn').addEventListener('click', function() {
    const nameToRemove = document.getElementById('removeBookmarkName').value;
    const bookmarks = document.querySelectorAll('.bookmark-btn');

    bookmarks.forEach(bookmark => {
        if (bookmark.textContent.trim() === nameToRemove.trim()) {
            bookmark.remove();
        }
    });

    saveBookmarksToLocalStorage();
    document.getElementById('removeBookmarkModal').style.display = 'none';
});

// Load bookmarks when the page loads
window.addEventListener('load', loadBookmarksFromLocalStorage);
