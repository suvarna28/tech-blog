const editCommentPostFormHandler = async (event) => {
    event.preventDefault();

    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const content = document.querySelector('#content').value.trim();

        if (content) {
            const response = await fetch(`/api/comments/edit/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ content }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const comment = await response.json();
                // console.log("^^^^^^^^^^^^^", comment);
                document.location.replace(`/post/${comment["post_id"]}`);
            } else {
                alert(response.statusText);
            }
        }
    }
};

document
    .querySelector('#editcomment')
    .addEventListener('click', editCommentPostFormHandler);


