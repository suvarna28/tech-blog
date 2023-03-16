const addCommentFormHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const content = document.querySelector('#content').value.trim();

        if (content) {
            const response = await fetch(`/api/comments/${id}`, {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace(`/post/${id}`);
            } else {
                alert(response.statusText);
            }
        }
    }
};

document.querySelector('#addcomment')
    .addEventListener('click', addCommentFormHandler);