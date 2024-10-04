// fonts.js
import { Nunito } from 'next/font/google';

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'], // Add weights you need
  style: ['normal', 'italic'], // Add styles you need
});