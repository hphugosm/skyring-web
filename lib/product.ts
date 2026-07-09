export const PRODUCT = {
  name: 'SkyRing 400',
  edition: 'Blue Edition',
  tagline: 'Kulatá zahradní trampolína, na kterou se můžete spolehnout.',
};

export type CameraKeyframe = {
  at: number; // scroll progress 0–1
  position: [number, number, number];
  target: [number, number, number];
  title: string;
  text: string;
  image?: string; // průhledný close-up do panelu
};

// Kamera pracuje s modelem normalizovaným na poloměr ~1 se středem v počátku.
export const KEYFRAMES: CameraKeyframe[] = [
  {
    at: 0,
    position: [0, 0.35, 2.6],
    target: [0, 0.2, 0],
    title: 'SkyRing 400 – Blue Edition',
    text: 'Průměr 396 cm, nosnost 150 kg. Prémiové zpracování za rozumnou cenu – bezpečnost a zábava pro celou rodinu.',
  },
  {
    at: 0.17,
    position: [1.6, -0.3, 1.9],
    target: [0, -0.45, 0],
    title: 'Rám a nohy',
    text: '8 W-noh z pozinkované oceli drží trampolínu stabilně i na nerovném terénu. Záruka 5 let na rám.',
    image: '/assets/cutout_leg_joint.webp',
  },
  {
    at: 0.33,
    position: [0.55, -0.15, 1.75],
    target: [0.1, -0.12, 0.5],
    title: 'Pružinový systém',
    text: '96 pozinkovaných pružin s antikorozní úpravou. Tlumený, a přitom vysoký odraz.',
    image: '/assets/cutout_springs.webp',
  },
  {
    at: 0.5,
    position: [0, 2.4, 0.9],
    target: [0, 0, 0],
    title: 'Skákací plocha',
    text: 'UV odolná černá PP tkanina s modrým prošitím. Prodyšná, propustná pro vodu, dlouhá životnost.',
  },
  {
    at: 0.67,
    position: [1.15, 0.55, 1.85],
    target: [0.45, 0.05, 0.75],
    title: 'Ochranný límec',
    text: '25mm PVC pěna s UV odolným potahem kryje všechny pružiny a brání zachycení nohy.',
  },
  {
    at: 0.83,
    position: [-1.5, 0.8, 2.1],
    target: [0, 0.5, 0],
    title: 'Bezpečnostní síť',
    text: 'Výška 180 cm, vstup na zip, modré polstrované tyče. Děti skáčou, vy jste v klidu.',
    image: '/assets/cutout_zip.webp',
  },
];

export const SPECS: [string, string][] = [
  ['Typ', 'Kulatá zahradní trampolína'],
  ['Průměr', '396 cm (13 ft)'],
  ['Nosnost', '150 kg'],
  ['Výška odrazové plochy', '65 cm nad zemí'],
  ['Rám', 'Pozinkovaná ocel, 8× „W" nohy'],
  ['Pružiny', '96× pozinkované, antikorozní úprava, tlumený odraz'],
  ['Skákací plocha', 'Černá PP tkanina s modrým prošitím, UV stabilizovaná, propustná pro vodu'],
  ['Ochranný límec', 'Modrý, 25 mm PVC pěna, UV odolný potah'],
  ['Ochranná síť', 'Výška 180 cm, modré polstrované tyče, vstup na zip'],
  ['Příslušenství', 'Žebřík v balení, kotvicí sada proti větru za příplatek'],
  ['Záruka', '5 let na rám, 2 roky na plachtu a síť'],
];

export const GALLERY = [
  { src: '/assets/master_34_front.webp', alt: 'SkyRing 400 – čelní pohled' },
  { src: '/assets/angle_34_left.webp', alt: 'SkyRing 400 – pohled zleva' },
  { src: '/assets/angle_34_right.webp', alt: 'SkyRing 400 – pohled zprava' },
  { src: '/assets/angle_side.webp', alt: 'SkyRing 400 – boční pohled' },
  { src: '/assets/angle_top.webp', alt: 'SkyRing 400 – pohled shora' },
  { src: '/assets/detail_springs.webp', alt: 'Detail pružinového systému' },
  { src: '/assets/detail_leg_joint.webp', alt: 'Detail spoje nohy s rámem' },
  { src: '/assets/detail_zip.webp', alt: 'Detail zipového vstupu do sítě' },
  { src: '/assets/garden_scene.webp', alt: 'SkyRing 400 v zahradě' },
];

// Placeholder recenze – demo obsah, nejde o skutečné zákazníky.
export const REVIEWS = [
  {
    name: 'Petra N.',
    rating: 5,
    text: 'Skvělá stabilita a síť drží perfektně. Děti z ní nejdou dostat dolů. Montáž ve dvou lidech za odpoledne.',
  },
  {
    name: 'Martin K.',
    rating: 5,
    text: 'Po dvou sezónách venku bez známky rzi. Odraz je měkčí než u levnějších trampolín, klouby to ocení.',
  },
  {
    name: 'Lucie a Tomáš',
    rating: 4,
    text: 'Kvalitní zpracování, límec opravdu drží tvar. Jen kotvicí sada by mohla být rovnou v balení.',
  },
];
