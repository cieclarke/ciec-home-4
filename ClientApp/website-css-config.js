const colors = require('tailwindcss/colors')

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
      extend: {
          colors: {
              brand: '#33403C',
              darkseagreen: {
                  '50': '#f9faf9',
                  '100': '#f4f8f2',
                  '200': '#e6eede',
                  '300': '#d2ddc1',
                  '400': '#a6bd8e',
                  '500': '#74995a',
                  '600': '#51743a',
                  '700': '#3f5932',
                  '800': '#31432c',
                  '900': '#263526',
              },
              rosybrown: {
                  '50': '#fafafa',
                  '100': '#f7f7f5',
                  '200': '#ede9e6',
                  '300': '#e0d3d2',
                  '400': '#caabad',
                  '500': '#ac8180',
                  '600': '#825b59',
                  '700': '#5d4646',
                  '800': '#423538',
                  '900': '#322a2e',
              },
              lightslategray: {
                  '50': '#f9fafb',
                  '100': '#f5f6f7',
                  '200': '#e8e8ec',
                  '300': '#d8d2df',
                  '400': '#bca9c7',
                  '500': '#987fa7',
                  '600': '#705a80',
                  '700': '#514563',
                  '800': '#3b3549',
                  '900': '#2d2a3a',
              },
              mediumpurple: {
                  '50': '#f8fafb',
                  '100': '#f3f5f9',
                  '200': '#e3e6f2',
                  '300': '#d0ceeb',
                  '400': '#b1a4df',
                  '500': '#8a79ce',
                  '600': '#6454b1',
                  '700': '#4a418a',
                  '800': '#373263',
                  '900': '#2b294c',
              },
              slateblue: {
                  '50': '#f9fafb',
                  '100': '#f4f5f9',
                  '200': '#e6e3f3',
                  '300': '#d5caec',
                  '400': '#bc9ee1',
                  '500': '#9c72d3',
                  '600': '#754eb7',
                  '700': '#553c90',
                  '800': '#3e2f67',
                  '900': '#2f264f',
              },
              orchid: {
                  '50': '#f9fafb',
                  '100': '#f5f4f9',
                  '200': '#e9e2f3',
                  '300': '#dcc7ec',
                  '400': '#c999e1',
                  '500': '#b06cd2',
                  '600': '#8949b7',
                  '700': '#62388f',
                  '800': '#462c67',
                  '900': '#35244e',
              },
              hotpink: {
                  '50': '#fbfafa',
                  '100': '#f9f4f7',
                  '200': '#f2e0ed',
                  '300': '#ecc3e0',
                  '400': '#e591c9',
                  '500': '#dc64ac',
                  '600': '#bd4185',
                  '700': '#8a3266',
                  '800': '#60274b',
                  '900': '#48203a',
              },
              palevioletred: {
                  '50': '#fbfafa',
                  '100': '#faf5f4',
                  '200': '#f5e2e6',
                  '300': '#f1c4d2',
                  '400': '#ec93ab',
                  '500': '#e66680',
                  '600': '#cc4258',
                  '700': '#993246',
                  '800': '#6b2737',
                  '900': '#50202d',
              },
              salmon: {
                  '50': '#fcfaf9',
                  '100': '#fbf5f2',
                  '200': '#f6e4df',
                  '300': '#f2c8c2',
                  '400': '#ed988f',
                  '500': '#e76c5c',
                  '600': '#ce483b',
                  '700': '#9b3632',
                  '800': '#6e2a2b',
                  '900': '#522225',
              },
              darksalmon: {
                  '50': '#fbfaf9',
                  '100': '#faf6f2',
                  '200': '#f4e7de',
                  '300': '#eecebf',
                  '400': '#e6a18a',
                  '500': '#db7656',
                  '600': '#bb5036',
                  '700': '#883d2f',
                  '800': '#5f2e29',
                  '900': '#472523',
              },
          },
          fontFamily: {
              sans: ['courier new', 'sans-serif'],
              serif: ['courier new', 'serif'],
          },
          backgroundImage: theme => ({
              'home-page': "url('https://live.staticflickr.com/4777/38983619730_220155925a_k.jpg')"
          })
      }
  },
  variants: {},
  plugins: [],
}

/*
*blue
 
   shade 0 = #1E41C1 = rgb( 30, 65,193) = rgba( 30, 65,193,1) = rgb0(0.118,0.255,0.757)
   shade 1 = #718DF5 = rgb(113,141,245) = rgba(113,141,245,1) = rgb0(0.443,0.553,0.961)
   shade 2 = #788DDB = rgb(120,141,219) = rgba(120,141,219,1) = rgb0(0.471,0.553,0.859)
   shade 3 = #091E6D = rgb(  9, 30,109) = rgba(  9, 30,109,1) = rgb0(0.035,0.118,0.427)
   shade 4 = #061034 = rgb(  6, 16, 52) = rgba(  6, 16, 52,1) = rgb0(0.024,0.063,0.204)

*red

   shade 0 = #DF0A6F = rgb(223, 10,111) = rgba(223, 10,111,1) = rgb0(0.875,0.039,0.435)
   shade 1 = #FA61A9 = rgb(250, 97,169) = rgba(250, 97,169,1) = rgb0(0.98,0.38,0.663)
   shade 2 = #EC73AD = rgb(236,115,173) = rgba(236,115,173,1) = rgb0(0.925,0.451,0.678)
   shade 3 = #86003F = rgb(134,  0, 63) = rgba(134,  0, 63,1) = rgb0(0.525,0,0.247)
   shade 4 = #40001E = rgb( 64,  0, 30) = rgba( 64,  0, 30,1) = rgb0(0.251,0,0.118)

*green

   shade 0 = #95F00B = rgb(149,240, 11) = rgba(149,240, 11,1) = rgb0(0.584,0.941,0.043)
   shade 1 = #C0FC62 = rgb(192,252, 98) = rgba(192,252, 98,1) = rgb0(0.753,0.988,0.384)
   shade 2 = #C4F678 = rgb(196,246,120) = rgba(196,246,120,1) = rgb0(0.769,0.965,0.471)
   shade 3 = #599300 = rgb( 89,147,  0) = rgba( 89,147,  0,1) = rgb0(0.349,0.576,0)
   shade 4 = #2B4600 = rgb( 43, 70,  0) = rgba( 43, 70,  0,1) = rgb0(0.169,0.275,0)

*yellow

   shade 0 = #FFB50B = rgb(255,181, 11) = rgba(255,181, 11,1) = rgb0(1,0.71,0.043)
   shade 1 = #FFD063 = rgb(255,208, 99) = rgba(255,208, 99,1) = rgb0(1,0.816,0.388)
   shade 2 = #FFD77C = rgb(255,215,124) = rgba(255,215,124,1) = rgb0(1,0.843,0.486)
   shade 3 = #A06F00 = rgb(160,111,  0) = rgba(160,111,  0,1) = rgb0(0.627,0.435,0)
   shade 4 = #4C3500 = rgb( 76, 53,  0) = rgba( 76, 53,  0,1) = rgb0(0.298,0.208,0)

*/