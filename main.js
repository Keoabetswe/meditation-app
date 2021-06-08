const app = () => {
    const sound = document.querySelector('.sound');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.default-vid video');

    //sounds
    const selectedSound = document.querySelector('.select-sound button');

    //time display
    const timeDisplay = document.querySelector('.time-display');

    //get outline length
    const outlineLength = outline.getTotalLength();
    // console.log(outlineLength);

    //duration
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //play sound
    play.addEventListener('click', () => {
        isPlaying(sound);
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
    };

};


app();