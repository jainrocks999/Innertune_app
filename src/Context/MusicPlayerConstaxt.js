import React, {createContext, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Tts from 'react-native-tts';
import TrackPlayer from 'react-native-track-player';
import {Alert} from 'react-native';
// import affirmations from './affirmation';
export const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({children}) => {
  const {affirmations} = useSelector(state => state.home);
  const dispatch = useDispatch();
  const [currentTrack, setCurrentTrack] = useState(null);
  const [maxTimeInMinutes, setMaxTimeInMinutes] = useState(1);
  const [progress, setProgress] = useState(0);
  const currentTimeRef = useRef(0);
  const [isPaused, setIsPaused] = useState(true);
  const [voices, setVoices] = useState([]);
  const [ttsStatus, setTtsStatus] = useState('initializing');
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [speechRate, setSpeechRate] = useState(0.4);
  const [speechPitch, setSpeechPitch] = useState(1);
  const flatListRef = useRef(null);
  const [visibleIndex, setVisibleIndex] = useState(0);

  useEffect(() => {
    if (affirmations.length === 0) return; // Early return if affirmations array is empty

    const maxTimeInSeconds = maxTimeInMinutes * 60;
    let currentTime = currentTimeRef.current || 0;
    const initialProgress = (currentTime / maxTimeInSeconds) * 100;
    setProgress(initialProgress);

    const intervalForProgress = setInterval(async () => {
      if (!isPaused) {
        if (currentTime < maxTimeInSeconds) {
          currentTime++;
          const newProgress = (currentTime / maxTimeInSeconds) * 100;
          setProgress(newProgress);
          currentTimeRef.current = currentTime;
        } else if (progress < 100) {
          clearInterval(intervalForProgress);
          setProgress(100);
          setIsPaused(true);
          Tts.stop();
          await TrackPlayer.pause();
        }
      } else {
        Tts.pause();
        await TrackPlayer.pause();
      }
    }, 1000);
    if (!isPaused) {
      readText(affirmations[visibleIndex].affirmation_text);
      TrackPlayer.play();
    }

    return () => {
      clearInterval(intervalForProgress);
      Tts.stop();
    };
  }, [maxTimeInMinutes, isPaused, affirmations.length]);

  useEffect(() => {
    Tts.getInitStatus().then(initTts);
    Tts.addEventListener('tts-finish', handleTTSFinish);
    Tts.setDefaultRate(speechRate);
    Tts.setDefaultPitch(speechPitch);
    TrackPlayer.setVolume(0.5);

    return () => {
      Tts.removeEventListener('tts-finish', handleTTSFinish);
      Tts.stop();
    };
  }, []);

  const handlePlayPauseClick = () => {
    if (affirmations.length === 0) return; // Early return if affirmations array is empty

    setIsPaused(prevIsPaused => !prevIsPaused);
    if (isPaused && progress >= 100) {
      setProgress(0);
      if (flatListRef.current != null) {
        currentTimeRef.current = 0;
        flatListRef.current.scrollToIndex({
          animated: true,
          index: 0,
          viewPosition: 0.5,
          viewOffset: 0,
          duration: 500,
        });
      }
      setVisibleIndex(0);
    }
  };

  const readText = async text => {
    if (!isPaused && text) {
      Tts.stop();
      Tts.speak(text);
    }
  };

  const player = async sound => {
    if (affirmations.length === 0) return; // Early return if affirmations array is empty

    const isSetup = await setupPlayer();
    if (isSetup) {
      const track = {
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/98/BGFOUR.mp3',
        title: 'Titel',
        artist: 'Innertune',
        artwork: `asset:/files/backOne.wav`,
        duration: null,
      };
      await TrackPlayer.reset();
      await TrackPlayer.add(sound?.music ?? track);
      await TrackPlayer.setRepeatMode(1);
      await TrackPlayer.play();
    }
  };

  const setVolume = async value => {
    await TrackPlayer.setVolume(value);
  };

  const updateSpeechRate = async rate => {
    await Tts.setDefaultRate(rate);
    setSpeechRate(rate);
  };

  const updateSpeechPitch = async rate => {
    await Tts.setDefaultPitch(rate);
    setSpeechPitch(rate);
  };

  const onVoicePress = async voice => {
    try {
      await Tts.setDefaultLanguage(voice.language);
      if (isPaused && progress >= 100) {
        setIsPaused(false);
        setProgress(0);
        currentTimeRef.current = 0;
        if (flatListRef.current != null) {
          flatListRef.current.scrollToIndex({
            animated: true,
            index: 0,
            viewPosition: 0.5,
            viewOffset: 0,
            duration: 500,
          });
        }
        setVisibleIndex(0);
        await Tts.setDefaultVoice(voice.id);
        readText(affirmations[visibleIndex]?.affirmation_text);
        setSelectedVoice(voice.id);
      } else {
        await Tts.setDefaultVoice(voice.id);
        readText(affirmations[visibleIndex]?.affirmation_text);
        setSelectedVoice(voice.id);
      }
    } catch (err) {
      console.log(`setDefaultLanguage error `, err);
    }
  };

  const initTts = async () => {
    const voices = await Tts.voices();
    const availableVoices = voices
      .filter(v => !v.networkConnectionRequired && !v.notInstalled)
      .map(v => {
        return {id: v.id, name: v.name, language: v.language};
      });

    let selectedVoice = null;
    if (voices && voices.length > 0) {
      selectedVoice = 'en-au-x-auc-local';
      try {
        await Tts.setDefaultLanguage('en-AU');
      } catch (err) {
        console.log(`setDefaultLanguage error `, err);
      }

      await Tts.setDefaultVoice('en-au-x-auc-local');
      if (affirmations.length > 0) {
        readText(affirmations[0].affirmation_text);
        player('sleeping.waw');
      }
      setVoices(availableVoices);
      setSelectedVoice(selectedVoice);
      setTtsStatus('initialized');
    } else {
      setTtsStatus('initialized');
    }
  };

  const handleTTSFinish = () => {
    if (affirmations.length === 0) return;

    setVisibleIndex(prevIndex => {
      const newIndex = (prevIndex + 1) % affirmations.length;
      readText(affirmations[newIndex]?.affirmation_text);
      return newIndex;
    });
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
        voices,
        ttsStatus,
        selectedVoice,
        setSelectedVoice,
        speechRate,
        setSpeechRate,
        speechPitch,
        setSpeechPitch,
        affirmations,
        readText,
        player,
        setVolume,
        updateSpeechRate,
        updateSpeechPitch,
        onVoicePress,
        handlePlayPauseClick,
        flatListRef,
        visibleIndex,
        setVisibleIndex,
      }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};
