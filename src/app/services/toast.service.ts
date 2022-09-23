import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  constructor(private toastController: ToastController) {}

  toast: any;
  async show({ message = "", duration = 4000, type = "success", position = "top" }) {
    this.toast = await this.toastController.create({
      message,
      duration,
      color: type === "error" ? "danger" : "light",
      cssClass: type === "success" ? "toast-success" : "toast-error",
      animated: true,
      mode: "ios",
      position: position === "top" ? "top" : "middle",
    });
    await this.toast.present();
  }

  async hide() {
    (await this.toast).dismiss();
  }
}