import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avis',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avis.html',
  styleUrls: ['./avis.scss'],
})
export class AvisComponent {
  /** L'image Élie peek depuis la gauche */
  peeking = false;
  peeking2 = false;

  /** Modale de confirmation "Non" */
  confirming = false;

  /** État final : tout le monde dit Oui */
  allYes = false;

  // ── Bouton OUI ─────────────────────────────────────────────────────────────
  onOui(): void {
    if (this.allYes) return;
    this.allYes = true;
  }

  // ── Bouton NON — hover ─────────────────────────────────────────────────────
  onNonHover(): void {
    if (this.allYes) return;
    this.peeking = true;
  }

  onNonLeave(): void {
    // On laisse l'image disparaître seulement si la modale n'est pas ouverte
    if (!this.confirming) {
      this.peeking = false;
      this.peeking2 = false;
    }
  }

  // ── Bouton NON — clic ──────────────────────────────────────────────────────
  onNon(): void {
    if (this.allYes) return;
    this.confirming = true;
    this.peeking = true; // garde l'image visible pendant la modale
    this.peeking2 = true;
  }

  // ── Confirmation ───────────────────────────────────────────────────────────
  /** L'utilisateur confirme son "Non" → on le convertit quand même 😈 */
  onConfirmYes(): void {
    this.confirming = false;
    this.peeking = false;
    this.peeking2 = false;
    this.allYes = true; // les deux boutons deviennent "Oui"
  }

  /** L'utilisateur se rétracte → on referme juste la modale */
  onConfirmNo(): void {
    this.confirming = false;
    this.peeking = false;
    this.peeking2 = false;
  }

  /** Clic en dehors de la card = annuler */
  onConfirmBackground(event: MouseEvent): void {
    this.onConfirmNo();
  }
}