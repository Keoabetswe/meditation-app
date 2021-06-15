const app = () => {
    const sound = document.querySelector('.sound');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.default-vid video');

    //sounds
    const selectedSound = document.querySelectorAll('.select-sound button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.select-time button');
    //get outline length
    const outlineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //different sounds
    selectedSound.forEach(sound => {
        sound.addEventListener('click', function() {
            sound.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            isPlaying(sound);
        });
    });

    //play sound
    play.addEventListener('click', () => {
        isPlaying(sound);
    });

    //select sound
    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //stop/play sound function
    const isPlaying = sound => {
        if(sound.paused) {
            sound.play();
            video.play();
            play.src = "images/pause.svg";
        }
        else {
            sound.pause();
            video.pause();
            play.src = "images/play.svg";
        }
    }

    //circle animation
    sound.ontimeupdate = () => {
        let currentTime = sound.currentTime;
        let elapsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        //animate text
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if(currentTime >= fakeDuration) {
            sound.pause();
            sound.currentTime = 0;
            play.src = 'images/play.svg';
            video.pause();
        }
    };
};

app();