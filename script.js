document.getElementById('rsvp-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const response = document.getElementById('response').value;

    if (response === 'yes') {
        document.getElementById('thank-you-message').textContent = `Thank you, ${name}! I can't wait to see you! ❤️`;
    } else if (response === 'no') {
        document.getElementById('thank-you-message').textContent = `Thank you, ${name}. I'm sad you can't make it. 😢`;
    }

    document.getElementById('thank-you-message').classList.remove('hidden');
    document.getElementById('rsvp-form').reset();
});