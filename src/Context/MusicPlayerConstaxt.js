import React, {createContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
  TrackPlayerEvents,
} from 'react-native-track-player';
import {setupPlayer} from '../utils/Setup';
import playPlalist from './affirmation';

export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({children}) => {
  const {playItem} = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [maxTimeInMinutes, setMaxTimeInMinutes] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentTimeRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [onMainPage, setOnmainPage] = useState(true);
  const playPlalistRef = useRef(playPlalist);

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
    playPlalistRef.current = playPlalist;
  }, [playPlalist]);

  useEffect(() => {
    if (playPlalist.length === 0) return;

    const maxTimeInSeconds = maxTimeInMinutes * 60;
    let currentTime = currentTimeRef.current || 0;
    setProgress((currentTime / maxTimeInSeconds) * 100);

    const intervalForProgress = setInterval(async () => {
      if (!isPaused) {
        if (currentTime < maxTimeInSeconds) {
          currentTime++;
          setProgress((currentTime / maxTimeInSeconds) * 100);
          currentTimeRef.current = currentTime;
        } else {
          clearInterval(intervalForProgress);
          setProgress(100);
          setIsPaused(true);
          await TrackPlayer.pause();
        }
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
  }, [maxTimeInMinutes, isPaused, playPlalist.length, visibleIndex]);

  useEffect(() => {
    const initializeTrackPlayer = async () => {
      await setupPlayer();
      const tracks = await getSounds();
      await TrackPlayer.reset();
      await TrackPlayer.add(tracks);
      if (playPlalist.length > 0) {
        TrackPlayer.play();
      }
    };

    initializeTrackPlayer();

    return () => {
      TrackPlayer.remove(); // Uncomment if needed
    };
  }, [playPlalist]);

  useEffect(() => {}, [playPlalist.length]);

  useEffect(() => {
    const trackChangeListener = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      async data => {
        if (data.nextTrack != null) {
          // TrackPlayer.pause();
          setTimeout(() => {
            setVisibleIndex(data.nextTrack);
            if (
              flatListRef.current &&
              visibleIndex >= 0 &&
              visibleIndex < playPlalist.length
            ) {
              flatListRef.current.scrollToIndex({
                animated: true,
                index: data.nextTrack,
                viewPosition: 0.5,
                viewOffset: 0,
              });
              TrackPlayer.play();
            }
          }, 2000);
        }
      },
    );
    const tackplayeEvent = TrackPlayer.addEventListener(
      Event.PlaybackPlayWhenReadyChanged,
      dat => {
        // setTimeout(() => {
        //   TrackPlayer.pause();
        // }, 100);
        console.log('thisissi', dat);
      },
    );

    const queueEndedListener = TrackPlayer.addEventListener(
      Event.PlaybackQueueEnded,
      async data => {
        if (data.position !== null && data.track !== null) {
          await TrackPlayer.reset();
          const tracks = await getSounds();
          await TrackPlayer.add(tracks);
          await TrackPlayer.play();
          setVisibleIndex(0);
        }
      },
    );

    return () => {
      trackChangeListener.remove();
      queueEndedListener.remove();
      tackplayeEvent.remove();
    };
  }, []);

  const handlePlayPauseClick = async () => {
    if (playPlalist.length === 0) return;

    if (isPaused) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
    setIsPaused(!isPaused);

    if (isPaused && progress >= 100) {
      reset();
    }
  };

  const skipToNext = async () => {
    try {
      await TrackPlayer.skipToNext();
      // setVisibleIndex(prevIndex => (prevIndex + 1) % playPlalist.length);
    } catch (error) {
      console.error('No more next tracks available', error);
    }
  };

  const skipToPrevious = async index => {
    try {
      TrackPlayer.skip(index);
    } catch (error) {
      console.error('No more previous tracks available', error);
    }
  };

  const setVolume = async value => {
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
        setOnmainPage,
        skipToNext,
        skipToPrevious,
        handlePlayPauseClick,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
