/**
 * Images and icons from TravelPro reference site (travelpro-laravel.laralink.com).
 * Use these URLs to match the reference design. If hotlinking is blocked, download
 * and host in /public/images/ and update paths here.
 */
const BASE = 'https://travelpro-laravel.laralink.com/storage/media';

export const referenceAssets = {
  hero: `${BASE}/s6nzKW9AtfggWwD314yY4nQHgKv0vY6t1lDzV5qn.jpg`,
  about: `${BASE}/9nfTIjDg501UMPsatnYGJBI7CIt6lADER2EUpgXa.png`,
  coreValueBg: `${BASE}/YBae10ZMCB7wrVIhxIAkXeb7NqV1sF68JSEXh6lF.jpg`,
  coreValueIcons: {
    customerDelight: `${BASE}/X4WqxX09ijq4OBtbLrmYT6wLsuOv70isWLhrX2J2.svg`,
    trustedAdventure: `${BASE}/5TfXAtVDr8KeOOghcbdARxqcEYkw9lfaCBBpcD2R.svg`,
    expertGuides: `${BASE}/z5OKoxbyaF0dVHovdmmfl2bwqh9nZIMox2DlnTLh.svg`,
    timeFlexibility: `${BASE}/31VsTJtpkwNycWaj5uvct61evtiXa7c57qPEALul.svg`,
  },
  funfactImage: `${BASE}/w4ZF1EytAWjvVaMvEDmn2dW63CfIMBK8aOyTZ7Pb.png`,
  funfactBg: `${BASE}/I3ritR01r8NXzp53UwbFq7eiTGRTBDctSzQ9AJ6N.png`,
  testimonialBanner: `${BASE}/9cehVV8xeoBKfnrgpBPWwCARwuZLQ8dinyugW1AE.jpg`,
  howItWorks: [
    `${BASE}/nEBCuH9FlYd657RbZ8sdM5u77IDpi8jqr1yHXTzo.png`, // Get Travel Insurance
    `${BASE}/mwaElp4ajRY3FRJMJGVsu6HFt9fvlFSXcUNhO1BN.png`, // Compare & Book
    `${BASE}/mpU3w8gTsT8BdBgmj4jJgRXPniBmQGQxxfKsMIFg.png`, // Book a Room
  ],
  destinations: [
    { title: 'Eiffel Tower', subtitle: 'Paris, 24 Trips', image: `${BASE}/XG0STLf1FvTenSGHmfw7itGUEIZg9jiOXPLinamx.jpg` },
    { title: 'Pryde Mountains', subtitle: 'Prydelands, 100 Trips', image: `${BASE}/xOdOP3krWjooEMYtvXaScy6HaKAnbSvEH0r9TUpq.jpg` },
    { title: 'Lao Lading Island', subtitle: 'Krabal, 12 Trips', image: `${BASE}/09Mw3sdRhw80EzdkbUnr0ycmiXCUzP3altIhup6w.jpg` },
    { title: 'Ton Kwen Temple', subtitle: 'Thailand, 20 Trips', image: `${BASE}/Rs1MyDIOU0e5v7DDtjFntJyIDGzU6EqTN2rHSJC2.jpg` },
    { title: 'Bali, Indonesia', subtitle: 'Thailand, 50 Trips', image: `${BASE}/hlFhDm96O3saurq7itp3ZrMT4Z8adTuR2LktccTK.jpg` },
  ],
};
