import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => 
    initializeApp({
      "projectId":"simple-crm-c0e55",
      "apiKey":"AIzaSyDn9HiY5oHogCmW8qd-P6dB2fnCe_LQEWw",
      "authDomain":"simple-crm-c0e55.firebaseapp.com",
      "storageBucket":"simple-crm-c0e55.appspot.com",
      "messagingSenderId":"573803951200",
      "appId": "1:573803951200:web:ae7e5e77e8aedeae553f05"
      }))), 
      importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideDatabase(() => getDatabase())), importProvidersFrom(provideStorage(() => getStorage()))]
};