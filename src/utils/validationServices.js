// validationService.js

// Custom validation rule for email
export function createEmailRules() {
    return [
      (v) => !!v || 'Adresse mail est requise',
      (v) => /@/.test(v) || 'Adresse mail doit contenir le caractère "@"',
    ];
  }
  
  // Custom validation rule for telephone
  export function createTelephoneRules() {
    return [
      (v) => !!v || 'Téléphone est requis',
      (v) =>
        /^(?:\d{2} ?){4,}\d{2}$/g.test(v) ||
        'Format de téléphone invalide.',
    ];
  }
  
  // Custom validation rule for name
  export function createNameRule() {
    return [(v) => !!v || 'Ce champ est requis'];
  }