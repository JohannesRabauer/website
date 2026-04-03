export const legalContact = {
  fullName: 'Johannes Rabauer',
  streetAddress: '[Bitte Straße und Hausnummer ergänzen]',
  postalCodeCity: '[Bitte PLZ und Ort ergänzen]',
  country: 'Deutschland',
  email: 'johannes@rabauer.dev',
  updatedAt: '03.04.2026',
};

export const hasPlaceholderAddress =
  legalContact.streetAddress.startsWith('[') ||
  legalContact.postalCodeCity.startsWith('[');

export const giscusDiscussionUrl =
  'https://github.com/JohannesRabauer/website/discussions';
