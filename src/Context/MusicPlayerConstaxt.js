import React, {createContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer, {Event, RepeatMode, State} from 'react-native-track-player';
import {setupPlayer} from '../utils/Setup';
import {Alert} from 'react-native';
import SoundPlayer from 'react-native-sound-player';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({children}) => {
  const {playPlalist, bgSound, togglePlay, playItem} = useSelector(
    state => state.home,
  );
  const dispatch = useDispatch();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [maxTimeInMinutes, setMaxTimeInMinutes] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentTimeRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [onMainPage, setOnMainPage] = useState(true);
  const playPlalistRef = useRef(playPlalist);
  const timeOutRef = useRef(null);
  const [voiceVolume, setVoiceVolume] = useState(0.5);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [ended, setEnded] = useState(false);
  const [backgroundSoundVolume, setBackgroundSoundsVolume] = useState(0.3);
  const [queended, setQueended] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [PlayerLoading, setPlayerLoading] = useState(true);
  useEffect(() => {
    playPlalistRef.current = playPlalist;
  }, [playPlalist]);

  const getSounds = () => {
    return new Promise((resolve, reject) => {
      try {
        const sounds = playPlalist.map(item => ({
          url: item.voice_one[0].original_url,
          title: item.affirmation_text,
          artist: 'Innertune',
          artwork: `asset:/files/backOne.wav`,
          duration: 5000,
        }));
        resolve(sounds);
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    if (playPlalist.length > 0) {
      reset();
      initializeTrackPlayer();
    }
  }, [togglePlay]);

  const initializeTrackPlayer = async () => {
    setEnded(false);
    await setupPlayer();
    const tracks = await getSounds();
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    TrackPlayer.setRepeatMode(RepeatMode.Queue);
    if (playPlalist.length > 0) {
      TrackPlayer.play();
    }
  };

  useEffect(() => {
    TrackPlayer.setVolume(0.5);
    SoundPlayer.setVolume(0.4);
  }, []);

  const handleOnBackgroundSoundVolume = value => {
    SoundPlayer.setVolume(value);
    setBackgroundSoundsVolume(value);
  };

  useEffect(() => {
    const intervalForProgress = setInterval(async () => {
      if (!isPaused && !PlayerLoading) {
        const maxTimeInSeconds = maxTimeInMinutes * 60;
        let currentTime = currentTimeRef.current || 0;
        setProgress((currentTime / maxTimeInSeconds) * 100);

        if (currentTime < maxTimeInSeconds) {
          currentTime++;
          currentTimeRef.current = currentTime;
        } else {
          clearInterval(intervalForProgress);
          setProgress(100);
          setIsPaused(true);
          await TrackPlayer.pause();
        }
      } else if (PlayerLoading) {
        // Skip updating progress while loading
      } else {
        await TrackPlayer.pause();
      }
    }, 1000);

    if (!isPaused) {
      TrackPlayer.play();
    }

    return () => {
      clearInterval(intervalForProgress);
    };
  }, [maxTimeInMinutes, isPaused, PlayerLoading]);
  useEffect(() => {
    const track = TrackPlayer.addEventListener(Event.PlaybackState, state => {
      if (state === State.Loading) {
        setPlayerLoading(true);
      } else {
        setPlayerLoading(false);
      }
    });

    return () => {
      track.remove();
    };
  }, [isPaused]);

  useEffect(() => {
    const trackChangeListener = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      event => {
        if (event.nextTrack != null) {
          setVisibleIndex(prev => {
            const nextIndex = event.nextTrack % playPlalist.length;
            if (
              flatListRef.current &&
              nextIndex >= 0 &&
              nextIndex < playPlalist.length
            ) {
              flatListRef.current.scrollToIndex({
                animated: true,
                index: nextIndex,
                viewPosition: 0.5,
                viewOffset: 0,
              });
            }
            return nextIndex;
          });
        }
      },
    );

    return () => {
      trackChangeListener.remove();
    };
  }, [playPlalist.length]);

  useEffect(() => {
    const queueEndedListener = TrackPlayer.addEventListener(
      Event.PlaybackQueueEnded,
      async data => {
        setQueended(true);
        if (playPlalist.length > 0) {
          initializeTrackPlayer();
        }
      },
    );

    return () => {
      queueEndedListener.remove();
    };
  }, [playPlalist]);

  const handlePlayPauseClick = async () => {
    if (playPlalist.length === 0) return;
    if (!ended) {
      if (isPaused) {
        SoundPlayer.play();
        await TrackPlayer.play();
      } else {
        SoundPlayer.pause();
        await TrackPlayer.pause();
        if (timeOutRef.current != null) {
          clearTimeout(timeOutRef.current);
          timeOutRef.current = null;
        }
      }
      setIsPaused(!isPaused);

      if (isPaused && progress >= 100) {
        reset();
      }
    } else {
      if (isPaused) {
        if (isPaused && progress >= 100) {
          reset();
        }
        initializeTrackPlayer();
        if (timeOutRef.current != null) {
          clearTimeout(timeOutRef.current);
          timeOutRef.current = null;
        }
        SoundPlayer.play();
        setIsPaused(false);
      } else {
        if (isPaused && progress >= 100) {
          reset();
        }
        setIsPaused(true);
        await TrackPlayer.pause();
        SoundPlayer.pause();
      }
    }
  };

  const skipToNext = async () => {
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = async () => {
    TrackPlayer.skipToPrevious();
  };

  const setVolume = async value => {
    setVoiceVolume(value);
    await TrackPlayer.setVolume(value);
  };

  const getNameImage = () => {
    return {
      image:
        playItem?.categories_image[0]?.original_url ??
        'https://images.unsplash.com/photo-1616356607338-fd87169ecf1a',
      name: playItem?.categories_name ?? 'raju',
      title: 'By Stimuili',
    };
  };

  const reset = () => {
    setProgress(0);
    currentTimeRef.current = 0;
    setRepeatMode(RepeatMode.Off);
    setIsPaused(false);
    setVisibleIndex(0);
    initializeTrackPlayer();
  };

  const [backgroundSound, setBackgroundSound] = useState(
    'https://stimuli.forebearpro.co.in/storage/app/public/95/BGTWO.mp3',
  );
  const playBackondSound = sound => {
    setBackgroundSound(sound);
    if (!isPaused) {
      SoundPlayer.playUrl(sound);
    } else {
      SoundPlayer.loadUrl(sound);
    }
  };
  // useEffect(() => {
  //   if (backgroundSound) {
  //     SoundPlayer.loadUrl(backgroundSound);
  //   }
  // }, [backgroundSound]);
  // useEffect(() => {
  //   const handleFinishedLoading = data => {
  //     if (isPaused) {
  //       SoundPlayer.pause();
  //     } else {
  //       SoundPlayer.play();
  //     }
  //   };
  //   const soundEvent = SoundPlayer.addEventListener(
  //     'FinishedLoadingURL',
  //     handleFinishedLoading,
  //   );
  // const soundEndedEvet = SoundPlayer.addEventListener(
  //   'FinishedPlaying',
  //   data => {
  //     SoundPlayer.loadUrl(backgroundSound);
  //   },
  // );

  //   return () => {
  //     soundEvent.remove();
  //     // soundEndedEvet.remove();
  //   };
  // }, [backgroundSound]);
  // useEffect(() => {
  //   if (isPaused) {
  //     SoundPlayer.pause();
  //   } else {
  //     SoundPlayer.play();
  //   }
  // }, [isPaused]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        maxTimeInMinutes,
        setMaxTimeInMinutes,
        progress,
        setProgress,
        isPaused,
        setIsPaused,
        playPlalist,
        player: handlePlayPauseClick,
        setVolume,
        flatListRef,
        visibleIndex,
        setVisibleIndex,
        getNameImage,
        reset,
        setOnMainPage,
        skipToNext,
        skipToPrevious,
        handlePlayPauseClick,
        voiceVolume,
        setVoiceVolume,
        playBackondSound,
        backgroundSoundVolume,
        handleOnBackgroundSoundVolume,
        backgroundSound,
        scrollDirection,
        setScrollDirection,
        repeatMode,
        setRepeatMode,
        PlayerLoading,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
