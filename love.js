document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const buttonsContainer = document.querySelector('.buttons');
    const replyGiftSection = document.getElementById('reply-gift-section');
    const replySubmitBtn = document.getElementById('reply-submit-btn');
    const replyInput = document.getElementById('reply-input');
    const giftBtn = document.getElementById('gift-btn');
    const giftModal = document.getElementById('gift-modal');
    const closeModal = document.getElementById('close-modal');
    const nextBtn = document.getElementById('next-video-btn');
    const videos = document.querySelectorAll('.gift-video');
    let currentVideoIndex = 0;
    let isYesActive = true;

    // Initially hide the "reply and gift" section and modal
    replyGiftSection.style.display = 'none';
    giftModal.style.display = 'none';

    // Swap button labels when hovering over "No" button
    noBtn.addEventListener('mouseover', () => {
        if (isYesActive) {
            yesBtn.textContent = 'No';
            yesBtn.style.backgroundColor = '#716e6e';

            noBtn.textContent = 'Yes';
            noBtn.style.backgroundColor = '#64e25b';

            isYesActive = false;
        }
    });

    noBtn.addEventListener('mouseleave', () => {
        if (!isYesActive) {
            yesBtn.textContent = 'Yes';
            yesBtn.style.backgroundColor = '#64e25b';

            noBtn.textContent = 'No';
            noBtn.style.backgroundColor = '#716e6e';

            isYesActive = true;
        }
    });

    // Show the "reply and gift" section with a delay when the "Yes" or "No" button is clicked
    buttonsContainer.addEventListener('click', (event) => {
        const clickedButton = event.target;
        if (clickedButton.id === 'yes-btn' || clickedButton.id === 'no-btn') {
            setTimeout(() => {
                document.querySelector('.card').style.display = 'none';  // Hide the love proposal section
                replyGiftSection.style.display = 'block';  // Show the reply and gift section after 1 seconds
            }, 2000);  // 1000 milliseconds =  1seconds
        }
    });

    // Reply submission
    replySubmitBtn.addEventListener('click', () => {
        const replyText = replyInput.value.trim();
        if (replyText) {
            alert(`You replied: ${replyText}`);
            replyInput.value = '';
        } else {
            alert('Please enter your reply.');
        }
    });

    // Show the gift modal when the "See My Gift" button is clicked
    giftBtn.addEventListener('click', () => {
        replyGiftSection.style.display = 'none';  // Hide the reply and gift section
        giftModal.style.display = 'block';  // Show the gift modal
        showVideo(currentVideoIndex);
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
        giftModal.style.display = 'none';  // Hide the gift modal
        replyGiftSection.style.display = 'block';  // Show the reply and gift section
        videos.forEach(video => video.pause());
    });

    // Close the modal if clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === giftModal) {
            giftModal.style.display = 'none';  // Hide the gift modal
            replyGiftSection.style.display = 'block';  // Show the reply and gift section
            videos.forEach(video => video.pause());
        }
    });

    // Navigate to the next video
    nextBtn.addEventListener('click', () => {
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        showVideo(currentVideoIndex);
    });

    // Display the correct video
    function showVideo(index) {
        videos.forEach((video, i) => {
            if (i === index) {
                video.style.display = 'block';
                video.play();
            } else {
                video.style.display = 'none';
                video.pause();
            }
        });
    }
});
