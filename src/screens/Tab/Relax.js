import {
  Clipboard,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {
  heightPercent as hp,
  widthPrecent as wp,
} from '../../components/atoms/responsive';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import {fonts} from '../../Context/Conctants';
import {MusicPlayerProvider} from '../../Context/MusicPlayerConstaxt';
import {MusicPlayerContext} from '../../Context/backup';
import LinearGradient from 'react-native-linear-gradient';
const Img = [
  {
    id: '1',
    image: require('../../assets/music.jpg'),
    title: 'John cena',
    title2: '90 affirmations',
  },
  {
    id: '2',
    image: require('../../assets/music.jpg'),
    title: 'Annie sharma',
    title2: '90 affirmations',
  },
  {
    id: '3',
    image: require('../../assets/music.jpg'),
    title: 'Lilly barde',
    title2: '90 affirmations',
  },
  {
    id: '4',
    image: require('../../assets/music.jpg'),
    title: 'maxvell',
    title2: '90 affirmations',
  },
  {
    id: '5',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '6',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '7',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '8',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '9',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
  {
    id: '10',
    image: require('../../assets/music.jpg'),
    title: 'max',
    title2: '90 affirmations',
  },
];
const data = [
  {
    id: 1,
    bgsound_name: 'Volume One',
    sound: 'test',
    status: '1',
    is_premium: 0,
    created_at: '2024-03-21 10:59:26',
    updated_at: '2024-04-30 10:04:08',
    deleted_at: null,
    bgsound_image: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
      },
      {
        id: 99,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: 'ab3b9b77-b5d9-46cc-abdf-fac95529da2b',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE',
        file_name: 'BGTHREE.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 2080557,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 9,
        created_at: '2024-04-30T06:36:35.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/99/BGTHREE.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 2,
    bgsound_name: 'Volume Two',
    sound: 'test',
    status: '1',
    is_premium: 1,
    created_at: '2024-03-21 11:00:16',
    updated_at: '2024-04-30 10:11:59',
    deleted_at: null,
    bgsound_image: [
      {
        id: 8,
        model_type: 'App\\Models\\Bgsound',
        model_id: 2,
        uuid: 'a0c842f3-df6f-4b23-9327-1771f6845c3d',
        collection_name: 'bgsound_bgsound_image',
        name: 'hollybood1',
        file_name: 'hollybood1.jpg',
        mime_type: 'image/jpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 60927,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:30:10.000000Z',
        updated_at: '2024-06-11T07:27:43.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/8/hollybood1.jpg',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/8/hollybood1.jpg',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/8/conversions/hollybood1-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/8/conversions/hollybood1-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 8,
        model_type: 'App\\Models\\Bgsound',
        model_id: 2,
        uuid: 'a0c842f3-df6f-4b23-9327-1771f6845c3d',
        collection_name: 'bgsound_bgsound_image',
        name: 'hollybood1',
        file_name: 'hollybood1.jpg',
        mime_type: 'image/jpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 60927,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:30:10.000000Z',
        updated_at: '2024-06-11T07:27:43.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/8/hollybood1.jpg',
        preview_url: '',
      },
      {
        id: 145,
        model_type: 'App\\Models\\Bgsound',
        model_id: 2,
        uuid: 'f8b9a4a3-41bd-4414-b1a5-04b88c835330',
        collection_name: 'bgsound_sound',
        name: 'BGFOUR_2',
        file_name: 'BGFOUR_2.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 842736,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 10,
        created_at: '2024-06-11T07:27:38.000000Z',
        updated_at: '2024-06-11T07:27:43.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/145/BGFOUR_2.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 3,
    bgsound_name: 'Volume Three',
    sound: 'test',
    status: '1',
    is_premium: 1,
    created_at: '2024-03-21 12:07:30',
    updated_at: '2024-04-30 10:15:10',
    deleted_at: null,
    bgsound_image: [
      {
        id: 87,
        model_type: 'App\\Models\\Bgsound',
        model_id: 3,
        uuid: 'bdd0ddf2-de89-4163-b62d-893445df7ad6',
        collection_name: 'bgsound_bgsound_image',
        name: 'download (1)',
        file_name: 'download-(1).png',
        mime_type: 'image/png',
        disk: 'public',
        conversions_disk: 'public',
        size: 3323,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 8,
        created_at: '2024-04-30T04:42:54.000000Z',
        updated_at: '2024-06-11T07:27:16.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/87/download-(1).png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/87/download-(1).png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/87/conversions/download-(1)-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/87/conversions/download-(1)-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 87,
        model_type: 'App\\Models\\Bgsound',
        model_id: 3,
        uuid: 'bdd0ddf2-de89-4163-b62d-893445df7ad6',
        collection_name: 'bgsound_bgsound_image',
        name: 'download (1)',
        file_name: 'download-(1).png',
        mime_type: 'image/png',
        disk: 'public',
        conversions_disk: 'public',
        size: 3323,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 8,
        created_at: '2024-04-30T04:42:54.000000Z',
        updated_at: '2024-06-11T07:27:16.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/87/download-(1).png',
        preview_url: '',
      },
      {
        id: 144,
        model_type: 'App\\Models\\Bgsound',
        model_id: 3,
        uuid: '47b7f2c5-9acc-44fc-bd76-07b196575ef1',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE_2',
        file_name: 'BGTHREE_2.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 926781,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 10,
        created_at: '2024-06-11T07:27:13.000000Z',
        updated_at: '2024-06-11T07:27:16.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/144/BGTHREE_2.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 1,
    bgsound_name: 'Volume One',
    sound: 'test',
    status: '1',
    is_premium: 0,
    created_at: '2024-03-21 10:59:26',
    updated_at: '2024-04-30 10:04:08',
    deleted_at: null,
    bgsound_image: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
      },
      {
        id: 99,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: 'ab3b9b77-b5d9-46cc-abdf-fac95529da2b',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE',
        file_name: 'BGTHREE.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 2080557,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 9,
        created_at: '2024-04-30T06:36:35.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/99/BGTHREE.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 1,
    bgsound_name: 'Volume One',
    sound: 'test',
    status: '1',
    is_premium: 0,
    created_at: '2024-03-21 10:59:26',
    updated_at: '2024-04-30 10:04:08',
    deleted_at: null,
    bgsound_image: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
      },
      {
        id: 99,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: 'ab3b9b77-b5d9-46cc-abdf-fac95529da2b',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE',
        file_name: 'BGTHREE.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 2080557,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 9,
        created_at: '2024-04-30T06:36:35.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/99/BGTHREE.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 1,
    bgsound_name: 'Volume One',
    sound: 'test',
    status: '1',
    is_premium: 0,
    created_at: '2024-03-21 10:59:26',
    updated_at: '2024-04-30 10:04:08',
    deleted_at: null,
    bgsound_image: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
      },
      {
        id: 99,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: 'ab3b9b77-b5d9-46cc-abdf-fac95529da2b',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE',
        file_name: 'BGTHREE.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 2080557,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 9,
        created_at: '2024-04-30T06:36:35.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/99/BGTHREE.mp3',
        preview_url: '',
      },
    ],
  },
  {
    id: 1,
    bgsound_name: 'Volume One',
    sound: 'test',
    status: '1',
    is_premium: 0,
    created_at: '2024-03-21 10:59:26',
    updated_at: '2024-04-30 10:04:08',
    deleted_at: null,
    bgsound_image: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
        url: 'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-thumbnail.jpg',
        preview_thumbnail:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/conversions/gugsali8_happy-faces_625x300_20_March_23-preview_thumbnail.jpg',
      },
    ],
    media: [
      {
        id: 7,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: '1a236276-484d-4f71-bc57-e3ee00728afa',
        collection_name: 'bgsound_bgsound_image',
        name: 'gugsali8_happy-faces_625x300_20_March_23',
        file_name: 'gugsali8_happy-faces_625x300_20_March_23.png',
        mime_type: 'image/webp',
        disk: 'public',
        conversions_disk: 'public',
        size: 149008,
        manipulations: [],
        custom_properties: [],
        generated_conversions: {thumbnail: true, preview_thumbnail: true},
        responsive_images: [],
        order_column: 1,
        created_at: '2024-03-21T05:29:20.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/7/gugsali8_happy-faces_625x300_20_March_23.png',
        preview_url: '',
      },
      {
        id: 99,
        model_type: 'App\\Models\\Bgsound',
        model_id: 1,
        uuid: 'ab3b9b77-b5d9-46cc-abdf-fac95529da2b',
        collection_name: 'bgsound_sound',
        name: 'BGTHREE',
        file_name: 'BGTHREE.mp3',
        mime_type: 'audio/mpeg',
        disk: 'public',
        conversions_disk: 'public',
        size: 2080557,
        manipulations: [],
        custom_properties: [],
        generated_conversions: [],
        responsive_images: [],
        order_column: 9,
        created_at: '2024-04-30T06:36:35.000000Z',
        updated_at: '2024-04-30T06:36:39.000000Z',
        original_url:
          'https://stimuli.forebearpro.co.in/storage/app/public/99/BGTHREE.mp3',
        preview_url: '',
      },
    ],
  },
];
const Relax = ({onPress, backgroundSound}) => {
  return (
    <View style={{backgroundColor: '#191919', flex: 1}}>
      <View style={{width: '100%', alignItems: 'center', marginTop: '5%'}}>
        <FlatList
          data={data}
          numColumns={2}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                // const obj = {
                //   ...item,
                //   music: {
                //     url: item.media[1]?.original_url,
                //     title: 'Titel',
                //     artist: 'Innertune',
                //     artwork: item.media[0]?.original_url,
                //     duration: null,
                //   },
                // };
                // onPress(obj);
                console.log(item.media[1]?.original_url);
                onPress(item.media[1]?.original_url);
              }}
              activeOpacity={0.7}
              style={{alignItems: 'center'}}>
              <View style={styles.listContainer}>
                {/*  ( */}
                <Image
                  source={{uri: item?.bgsound_image[0]?.original_url}}
                  style={styles.imageee}
                />
                {backgroundSound == item.media[1]?.original_url ? (
                  <View
                    style={{
                      position: 'absolute',
                      height: '100%',
                      width: '100%',
                      zIndex: 4,
                      backgroundColor: 'rgba(25, 25, 25, 0.5)',
                      borderRadius: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0.8,
                    }}>
                    <AntDesign name="checkcircle" size={25} color={'#fff'} />
                  </View>
                ) : null}
              </View>
              <Text style={styles.texttt}>{item?.bgsound_name}</Text>
            </TouchableOpacity>
          )}
        />
        <LinearGradient
          start={{x: 0.5, y: 1}}
          end={{x: 0.5, y: 0}}
          locations={[0, 0.7, 1]}
          colors={[
            'rgba(25, 25, 25, 0.9)',
            'rgba(25, 25, 25, 0.9)',
            'rgba(25, 25, 25, 0)',
          ]}
          style={{
            height: hp(2),
            position: 'absolute',
            bottom: -4,
            zIndex: 1,
            borderColor: '#fff',
            width: '100%',
          }}
        />
      </View>
    </View>
  );
};

export default Relax;

const styles = StyleSheet.create({
  imageContainerrr: {
    width: hp(20),
    height: hp(15),
    borderRadius: 20,
    marginVertical: hp(3.5),
  },
  imageee: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  texttt: {
    color: 'white',
    fontSize: wp(4.5),
    fontWeight: '500',
    marginBottom: hp(3),
    fontFamily: fonts.medium,
  },
  listContainer: {
    // borderWidth: 1,
    borderColor: 'white',
    height: hp(18),
    width: wp(45),
    marginHorizontal: wp(2),
    marginVertical: wp(2),
    borderRadius: 20,
  },
});
