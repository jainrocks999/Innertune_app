import React, {createContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer, {Event} from 'react-native-track-player';
import {setupPlayer} from '../utils/Setup';
import {Alert} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
// import playPlalist from '../Context/affirmation';
export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({children}) => {
  const {playPlalist, bgSound, playItem} = useSelector(state => state.home);
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
  }, [playPlalist]);
  useEffect(() => {});

  const initializeTrackPlayer = async () => {
    setEnded(false);
    await setupPlayer();
    const tracks = await getSounds();
    await TrackPlayer.reset();
    await TrackPlayer.add(tracks);
    // TrackPlayer.setRepeatMode(1);
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
      if (!isPaused) {
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
          await TrackPlayer.reset();
        }
      } else {
        await TrackPlayer.pause();
      }
    }, 1000);

    if (!isPaused) {
      TrackPlayer.play();
      SoundPlayer.play();
    }

    return () => {
      clearInterval(intervalForProgress);
    };
  }, [maxTimeInMinutes, isPaused]);

  // useEffect(() => {
  //   const trackChangeListener = TrackPlayer.addEventListener(
  //     Event.PlaybackTrackChanged,
  //     async data => {
  //       if (data.nextTrack != null) {
  //         setVisibleIndex(prev => {
  //           const nexIndx = prev % playPlalist.length;
  //           if (
  //             flatListRef.current &&
  //             nexIndx >= 0 &&
  //             nexIndx < playPlalist.length
  //           ) {
  //             flatListRef.current.scrollToIndex({
  //               animated: true,
  //               index: nexIndx,
  //               viewPosition: 0.5,
  //               viewOffset: 0,
  //             });
  //           }
  //           return nexIndx;
  //         });
  //       }
  //     },
  //   );

  //   const trackPlayerEvent = TrackPlayer.addEventListener(
  //     Event.PlaybackPlayWhenReadyChanged,
  //     dat => {},
  //   );
  //   return () => {
  //     trackChangeListener.remove();
  //     trackPlayerEvent.remove();
  //   };
  // }, [playPlalist, visibleIndex]);
  useEffect(() => {
    TrackPlayer.addEventListener(Event.PlaybackTrackChanged, even => {
      if (even.nextTrack != null) {
        setVisibleIndex(prev => {
          const nexIndx = even.nextTrack % playPlalist.length;
          if (
            flatListRef.current &&
            nexIndx >= 0 &&
            nexIndx < playPlalist.length
          ) {
            flatListRef.current.scrollToIndex({
              animated: true,
              index: nexIndx,
              viewPosition: 0.5,
              viewOffset: 0,
            });
          }
          return nexIndx;
        });
      }
    });
  }, [visibleIndex, playPlalist.length]);

  const queueEndedListener = TrackPlayer.addEventListener(
    Event.PlaybackQueueEnded,
    async data => {
      return () => {
        queueEndedListener.remove();
        trackChangeListener.remove();
      };
    },
    [playPlalist, visibleIndex],
  );

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
    alert('called');
    TrackPlayer.skipToNext();
  };

  const skipToPrevious = async => {
    TrackPlayer.skipToNext();
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollDirection == 'up') {
        skipToNext();
      } else {
        skipToPrevious();
      }
    }, 60);
    return () => {
      clearTimeout(timeout);
    };
  }, [scrollDirection]);

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
    setIsPaused(false);
    setVisibleIndex(0);
  };
  const [backgroundSound, setBackgroundSound] = useState('');
  const playBackondSound = sound => {
    SoundPlayer.playUrl(sound);
    setBackgroundSound(sound);
  };

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
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
