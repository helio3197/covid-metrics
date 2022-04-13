const countries = [
  {
    name: 'US',
    id: 'us',
    continent: 'North America',
  },
  {
    name: 'Chad',
    id: 'chad',
    continent: 'Africa',
  },
  {
    name: 'Cuba',
    id: 'cuba',
    continent: 'North America',
  },
  {
    name: 'Fiji',
    id: 'fiji',
    continent: 'Oceania',
  },
  {
    name: 'Iran',
    id: 'iran',
    continent: 'Asia',
  },
  {
    name: 'Iraq',
    id: 'iraq',
    continent: 'Asia',
  },
  {
    name: 'Laos',
    id: 'laos',
    continent: 'Asia',
  },
  {
    name: 'Mali',
    id: 'mali',
    continent: 'Africa',
  },
  {
    name: 'Oman',
    id: 'oman',
    continent: 'Asia',
  },
  {
    name: 'Peru',
    id: 'peru',
    continent: 'South America',
  },
  {
    name: 'Togo',
    id: 'togo',
    continent: 'Africa',
  },
  {
    name: 'Benin',
    id: 'benin',
    continent: 'Africa',
  },
  {
    name: 'Burma',
    id: 'burma',
    continent: 'Asia',
  },
  {
    name: 'Chile',
    id: 'chile',
    continent: 'South America',
  },
  {
    name: 'China',
    id: 'china',
    continent: 'Asia',
  },
  {
    name: 'Egypt',
    id: 'egypt',
    continent: 'Africa',
  },
  {
    name: 'Gabon',
    id: 'gabon',
    continent: 'Africa',
  },
  {
    name: 'Ghana',
    id: 'ghana',
    continent: 'Africa',
  },
  {
    name: 'Haiti',
    id: 'haiti',
    continent: 'North America',
  },
  {
    name: 'India',
    id: 'india',
    continent: 'Asia',
  },
  {
    name: 'Italy',
    id: 'italy',
    continent: 'Europe',
  },
  {
    name: 'Japan',
    id: 'japan',
    continent: 'Asia',
  },
  {
    name: 'Kenya',
    id: 'kenya',
    continent: 'Africa',
  },
  {
    name: 'Libya',
    id: 'libya',
    continent: 'Africa',
  },
  {
    name: 'Malta',
    id: 'malta',
    continent: 'Europe',
  },
  {
    name: 'Nepal',
    id: 'nepal',
    continent: 'Asia',
  },
  {
    name: 'Niger',
    id: 'niger',
    continent: 'Africa',
  },
  {
    name: 'Qatar',
    id: 'qatar',
    continent: 'Asia',
  },
  {
    name: 'Samoa',
    id: 'samoa',
    continent: 'Oceania',
  },
  {
    name: 'Spain',
    id: 'spain',
    continent: 'Europe',
  },
  {
    name: 'Sudan',
    id: 'sudan',
    continent: 'Africa',
  },
  {
    name: 'Syria',
    id: 'syria',
    continent: 'Asia',
  },
  {
    name: 'Yemen',
    id: 'yemen',
    continent: 'Asia',
  },
  {
    name: 'Angola',
    id: 'angola',
    continent: 'Africa',
  },
  {
    name: 'Belize',
    id: 'belize',
    continent: 'North America',
  },
  {
    name: 'Bhutan',
    id: 'bhutan',
    continent: 'Asia',
  },
  {
    name: 'Brazil',
    id: 'brazil',
    continent: 'South America',
  },
  {
    name: 'Brunei',
    id: 'brunei',
    continent: 'Asia',
  },
  {
    name: 'Canada',
    id: 'canada',
    continent: 'North America',
  },
  {
    name: 'Cyprus',
    id: 'cyprus',
    continent: 'Europe',
  },
  {
    name: 'France',
    id: 'france',
    continent: 'Europe',
  },
  {
    name: 'Gambia',
    id: 'gambia',
    continent: 'Africa',
  },
  {
    name: 'Greece',
    id: 'greece',
    continent: 'Europe',
  },
  {
    name: 'Guinea',
    id: 'guinea',
    continent: 'Africa',
  },
  {
    name: 'Guyana',
    id: 'guyana',
    continent: 'South America',
  },
  {
    name: 'Israel',
    id: 'israel',
    continent: 'Asia',
  },
  {
    name: 'Jersey',
    id: 'jersey',
    continent: 'Europe',
  },
  {
    name: 'Jordan',
    id: 'jordan',
    continent: 'Asia',
  },
  {
    name: 'Kosovo',
    id: 'kosovo',
    continent: 'Europe',
  },
  {
    name: 'Kuwait',
    id: 'kuwait',
    continent: 'Asia',
  },
  {
    name: 'Latvia',
    id: 'latvia',
    continent: 'Europe',
  },
  {
    name: 'Malawi',
    id: 'malawi',
    continent: 'Africa',
  },
  {
    name: 'Mexico',
    id: 'mexico',
    continent: 'North America',
  },
  {
    name: 'Monaco',
    id: 'monaco',
    continent: 'Europe',
  },
  {
    name: 'Norway',
    id: 'norway',
    continent: 'Europe',
  },
  {
    name: 'Panama',
    id: 'panama',
    continent: 'North America',
  },
  {
    name: 'Poland',
    id: 'poland',
    continent: 'Europe',
  },
  {
    name: 'Russia',
    id: 'russia',
    continent: 'Europe',
  },
  {
    name: 'Rwanda',
    id: 'rwanda',
    continent: 'Africa',
  },
  {
    name: 'Serbia',
    id: 'serbia',
    continent: 'Europe',
  },
  {
    name: 'Sweden',
    id: 'sweden',
    continent: 'Europe',
  },
  {
    name: 'Turkey',
    id: 'turkey',
    continent: 'Asia',
  },
  {
    name: 'Uganda',
    id: 'uganda',
    continent: 'Africa',
  },
  {
    name: 'Zambia',
    id: 'zambia',
    continent: 'Africa',
  },
  {
    name: 'Albania',
    id: 'albania',
    continent: 'Europe',
  },
  {
    name: 'Algeria',
    id: 'algeria',
    continent: 'Africa',
  },
  {
    name: 'Andorra',
    id: 'andorra',
    continent: 'Europe',
  },
  {
    name: 'Armenia',
    id: 'armenia',
    continent: 'Asia',
  },
  {
    name: 'Austria',
    id: 'austria',
    continent: 'Europe',
  },
  {
    name: 'Bahamas',
    id: 'bahamas',
    continent: 'North America',
  },
  {
    name: 'Bahrain',
    id: 'bahrain',
    continent: 'Asia',
  },
  {
    name: 'Belarus',
    id: 'belarus',
    continent: 'Europe',
  },
  {
    name: 'Belgium',
    id: 'belgium',
    continent: 'Europe',
  },
  {
    name: 'Bolivia',
    id: 'bolivia',
    continent: 'South America',
  },
  {
    name: 'Burundi',
    id: 'burundi',
    continent: 'Africa',
  },
  {
    name: 'Comoros',
    id: 'comoros',
    continent: 'Africa',
  },
  {
    name: 'Croatia',
    id: 'croatia',
    continent: 'Europe',
  },
  {
    name: 'Czechia',
    id: 'czechia',
    continent: 'Europe',
  },
  {
    name: 'Denmark',
    id: 'denmark',
    continent: 'Europe',
  },
  {
    name: 'Ecuador',
    id: 'ecuador',
    continent: 'South America',
  },
  {
    name: 'Eritrea',
    id: 'eritrea',
    continent: 'Africa',
  },
  {
    name: 'Estonia',
    id: 'estonia',
    continent: 'Europe',
  },
  {
    name: 'Finland',
    id: 'finland',
    continent: 'Europe',
  },
  {
    name: 'Georgia',
    id: 'georgia',
    continent: 'Asia',
  },
  {
    name: 'Germany',
    id: 'germany',
    continent: 'Europe',
  },
  {
    name: 'Grenada',
    id: 'grenada',
    continent: 'North America',
  },
  {
    name: 'Hungary',
    id: 'hungary',
    continent: 'Europe',
  },
  {
    name: 'Iceland',
    id: 'iceland',
    continent: 'Europe',
  },
  {
    name: 'Ireland',
    id: 'ireland',
    continent: 'Europe',
  },
  {
    name: 'Jamaica',
    id: 'jamaica',
    continent: 'North America',
  },
  {
    name: 'Lebanon',
    id: 'lebanon',
    continent: 'Asia',
  },
  {
    name: 'Lesotho',
    id: 'lesotho',
    continent: 'Africa',
  },
  {
    name: 'Liberia',
    id: 'liberia',
    continent: 'Africa',
  },
  {
    name: 'Moldova',
    id: 'moldova',
    continent: 'Europe',
  },
  {
    name: 'Morocco',
    id: 'morocco',
    continent: 'Africa',
  },
  {
    name: 'Namibia',
    id: 'namibia',
    continent: 'Africa',
  },
  {
    name: 'Nigeria',
    id: 'nigeria',
    continent: 'Africa',
  },
  {
    name: 'Romania',
    id: 'romania',
    continent: 'Europe',
  },
  {
    name: 'Senegal',
    id: 'senegal',
    continent: 'Africa',
  },
  {
    name: 'Somalia',
    id: 'somalia',
    continent: 'Africa',
  },
  {
    name: 'Taiwan*',
    id: 'taiwan*',
  },
  {
    name: 'Tunisia',
    id: 'tunisia',
    continent: 'Africa',
  },
  {
    name: 'Ukraine',
    id: 'ukraine',
    continent: 'Europe',
  },
  {
    name: 'Uruguay',
    id: 'uruguay',
    continent: 'South America',
  },
  {
    name: 'Vanuatu',
    id: 'vanuatu',
    continent: 'Oceania',
  },
  {
    name: 'Vietnam',
    id: 'vietnam',
    continent: 'Asia',
  },
  {
    name: 'Barbados',
    id: 'barbados',
    continent: 'North America',
  },
  {
    name: 'Botswana',
    id: 'botswana',
    continent: 'Africa',
  },
  {
    name: 'Bulgaria',
    id: 'bulgaria',
    continent: 'Europe',
  },
  {
    name: 'Cambodia',
    id: 'cambodia',
    continent: 'Asia',
  },
  {
    name: 'Cameroon',
    id: 'cameroon',
    continent: 'Africa',
  },
  {
    name: 'Colombia',
    id: 'colombia',
    continent: 'South America',
  },
  {
    name: 'Djibouti',
    id: 'djibouti',
    continent: 'Africa',
  },
  {
    name: 'Dominica',
    id: 'dominica',
    continent: 'North America',
  },
  {
    name: 'Eswatini',
    id: 'eswatini',
    continent: 'Africa',
  },
  {
    name: 'Ethiopia',
    id: 'ethiopia',
    continent: 'Africa',
  },
  {
    name: 'Guernsey',
    id: 'guernsey',
    continent: 'Europe',
  },
  {
    name: 'Holy See',
    id: 'holy_see',
    continent: 'Europe',
  },
  {
    name: 'Honduras',
    id: 'honduras',
    continent: 'North America',
  },
  {
    name: 'Kiribati',
    id: 'kiribati',
    continent: 'Oceania',
  },
  {
    name: 'Malaysia',
    id: 'malaysia',
    continent: 'Asia',
  },
  {
    name: 'Maldives',
    id: 'maldives',
    continent: 'Asia',
  },
  {
    name: 'Mongolia',
    id: 'mongolia',
    continent: 'Asia',
  },
  {
    name: 'Pakistan',
    id: 'pakistan',
    continent: 'Asia',
  },
  {
    name: 'Paraguay',
    id: 'paraguay',
    continent: 'South America',
  },
  {
    name: 'Portugal',
    id: 'portugal',
    continent: 'Europe',
  },
  {
    name: 'Slovakia',
    id: 'slovakia',
    continent: 'Europe',
  },
  {
    name: 'Slovenia',
    id: 'slovenia',
    continent: 'Europe',
  },
  {
    name: 'Suriname',
    id: 'suriname',
    continent: 'South America',
  },
  {
    name: 'Tanzania',
    id: 'tanzania',
    continent: 'Africa',
  },
  {
    name: 'Thailand',
    id: 'thailand',
    continent: 'Asia',
  },
  {
    name: 'Zimbabwe',
    id: 'zimbabwe',
    continent: 'Africa',
  },
  {
    name: 'Argentina',
    id: 'argentina',
    continent: 'South America',
  },
  {
    name: 'Australia',
    id: 'australia',
    continent: 'Oceania',
  },
  {
    name: 'Guatemala',
    id: 'guatemala',
    continent: 'North America',
  },
  {
    name: 'Indonesia',
    id: 'indonesia',
    continent: 'Asia',
  },
  {
    name: 'Lithuania',
    id: 'lithuania',
    continent: 'Europe',
  },
  {
    name: 'Mauritius',
    id: 'mauritius',
    continent: 'Africa',
  },
  {
    name: 'Nicaragua',
    id: 'nicaragua',
    continent: 'North America',
  },
  {
    name: 'Singapore',
    id: 'singapore',
    continent: 'Asia',
  },
  {
    name: 'Sri Lanka',
    id: 'sri_lanka',
    continent: 'Asia',
  },
  {
    name: 'Venezuela',
    id: 'venezuela',
    continent: 'South America',
  },
  {
    name: 'Azerbaijan',
    id: 'azerbaijan',
    continent: 'Asia',
  },
  {
    name: 'Bangladesh',
    id: 'bangladesh',
    continent: 'Asia',
  },
  {
    name: 'Cabo Verde',
    id: 'cabo_verde',
    continent: 'Africa',
  },
  {
    name: 'Costa Rica',
    id: 'costa_rica',
    continent: 'North America',
  },
  {
    name: 'East Timor',
    id: 'east_timor',
    continent: 'Oceania',
  },
  {
    name: 'Kazakhstan',
    id: 'kazakhstan',
    continent: 'Asia',
  },
  {
    name: 'Kyrgyzstan',
    id: 'kyrgyzstan',
    continent: 'Asia',
  },
  {
    name: 'Luxembourg',
    id: 'luxembourg',
    continent: 'Europe',
  },
  {
    name: 'Madagascar',
    id: 'madagascar',
    continent: 'Africa',
  },
  {
    name: 'Mauritania',
    id: 'mauritania',
    continent: 'Africa',
  },
  {
    name: 'Micronesia',
    id: 'micronesia',
    continent: 'Oceania',
  },
  {
    name: 'Montenegro',
    id: 'montenegro',
    continent: 'Europe',
  },
  {
    name: 'Mozambique',
    id: 'mozambique',
    continent: 'Africa',
  },
  {
    name: 'San Marino',
    id: 'san_marino',
    continent: 'Europe',
  },
  {
    name: 'Seychelles',
    id: 'seychelles',
    continent: 'Africa',
  },
  {
    name: 'Tajikistan',
    id: 'tajikistan',
    continent: 'Asia',
  },
  {
    name: 'Uzbekistan',
    id: 'uzbekistan',
    continent: 'Asia',
  },
  {
    name: 'Afghanistan',
    id: 'afghanistan',
    continent: 'Asia',
  },
  {
    name: 'El Salvador',
    id: 'el_salvador',
    continent: 'North America',
  },
  {
    name: 'Netherlands',
    id: 'netherlands',
    continent: 'Europe',
  },
  {
    name: 'New Zealand',
    id: 'new_zealand',
    continent: 'Oceania',
  },
  {
    name: 'Philippines',
    id: 'philippines',
    continent: 'Asia',
  },
  {
    name: 'Saint Lucia',
    id: 'saint_lucia',
    continent: 'North America',
  },
  {
    name: 'South Sudan',
    id: 'south_sudan',
    continent: 'Africa',
  },
  {
    name: 'Switzerland',
    id: 'switzerland',
    continent: 'Europe',
  },
  {
    name: 'Timor-Leste',
    id: 'timor-leste',
    continent: 'Asia',
  },
  {
    name: 'Burkina Faso',
    id: 'burkina_faso',
    continent: 'Africa',
  },
  {
    name: 'Korea, South',
    id: 'korea,_south',
    continent: 'Asia',
  },
  {
    name: 'Saudi Arabia',
    id: 'saudi_arabia',
    continent: 'Asia',
  },
  {
    name: 'Sierra Leone',
    id: 'sierra_leone',
    continent: 'Africa',
  },
  {
    name: 'South Africa',
    id: 'south_africa',
    continent: 'Africa',
  },
  {
    name: "Cote d'Ivoire",
    id: 'cote_divoire',
    continent: 'Africa',
  },
  {
    name: 'Guinea-Bissau',
    id: 'guinea-bissau',
    continent: 'Africa',
  },
  {
    name: 'Liechtenstein',
    id: 'liechtenstein',
    continent: 'Europe',
  },
  {
    name: 'United Kingdom',
    id: 'united_kingdom',
    continent: 'Europe',
  },
  {
    name: 'Western Sahara',
    id: 'western_sahara',
    continent: 'Africa',
  },
  {
    name: 'North Macedonia',
    id: 'north_macedonia',
    continent: 'Europe',
  },
  {
    name: 'Congo (Kinshasa)',
    id: 'congo_(kinshasa)',
    continent: 'Africa',
  },
  {
    name: 'Papua New Guinea',
    id: 'papua_new_guinea',
    continent: 'Oceania',
  },
  {
    name: 'Equatorial Guinea',
    id: 'equatorial_guinea',
    continent: 'Africa',
  },
  {
    name: 'Dominican Republic',
    id: 'dominican_republic',
    continent: 'North America',
  },
  {
    name: 'Antigua and Barbuda',
    id: 'antigua_and_barbuda',
    continent: 'North America',
  },
  {
    name: 'Congo (Brazzaville)',
    id: 'congo_(brazzaville)',
    continent: 'Africa',
  },
  {
    name: 'Trinidad and Tobago',
    id: 'trinidad_and_tobago',
    continent: 'North America',
  },
  {
    name: 'United Arab Emirates',
    id: 'united_arab_emirates',
    continent: 'Asia',
  },
  {
    name: 'Saint Kitts and Nevis',
    id: 'saint_kitts_and_nevis',
    continent: 'North America',
  },
  {
    name: 'Sao Tome and Principe',
    id: 'sao_tome_and_principe',
    continent: 'Africa',
  },
  {
    name: 'Bosnia and Herzegovina',
    id: 'bosnia_and_herzegovina',
    continent: 'Europe',
  },
  {
    name: 'Central African Republic',
    id: 'central_african_republic',
    continent: 'Africa',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    id: 'saint_vincent_and_the_grenadines',
    continent: 'North America',
  },
];

export default countries;
