import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = ""; // Almacena el correo electrónico ingresado
  password: string = ""; // Almacena la contraseña ingresada

  constructor(private navController: NavController, private toastController: ToastController) {}

  // Método para validar si el correo electrónico tiene un formato válido
  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email); // Valida y retorna true si es válido
  }
  
  // Método para validar si la contraseña cumple con los requisitos
  validatePassword(password: string): boolean {
    // La contraseña debe tener:
    // - Al menos 8 caracteres
    // - Al menos una letra
    // - Al menos un número
    // - Al menos un carácter especial
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password); // Valida y retorna true si es válido
  }

  // Método para manejar el proceso de inicio de sesión
  async login() {
    // Validar si los campos están vacíos
    if (!this.email || !this.password) {
      this.presentToast('top', 'Por favor ingresa ambos campos (correo y contraseña).');
      return;
    }

    // Validar si el correo tiene un formato válido
    if (!this.validateEmail(this.email)) {
      this.presentToast('top', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    // Validar si la contraseña cumple con los requisitos
    if (!this.validatePassword(this.password)) {
      this.presentToast('top', 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial.');
      return;
    }

    // Si todas las validaciones pasan, redirigir al menú
    console.log("Correo y contraseña válidos, redirigiendo...");
    this.navController.navigateRoot('/menu');
  }

  // Método para mostrar mensajes emergentes (toasts)
  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message, // Mensaje a mostrar
      duration: 1500,   // Duración en milisegundos
      position: position, // Posición en pantalla
    });

    await toast.present(); // Muestra el mensaje emergente
  }
}
