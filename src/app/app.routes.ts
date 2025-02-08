import { Routes } from '@angular/router';
import { EditorComponent } from './components/editor/editor.component';

export const routes: Routes = [
  { path: 'editor', component: EditorComponent }, // Ruta para el EditorComponent
  { path: '**', redirectTo: 'editor' }, // Redirección por defecto
];
