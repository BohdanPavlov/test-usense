import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss'],
})
export class PasswordStrengthComponent implements OnChanges {
  @Input() public passwordToCheck!: string;

  public fields = {
    0: '',
    1: '',
    2: '',
  };
  private colors: Array<string> = ['red', 'yellow', 'green'];

  checkStrength (p: string): number {
    let passedMatches = 0;

    if (p.length <= 7) return passedMatches;

    const symbols = /[$-\/:-?{-~!"^_@`\[\]]/g.test(p);
    const numbers = /[0-9]/g.test(p);
    const letters = /[a-zA-Z|а-яА-Я]/g.test(p);

    const flags = [letters, numbers, symbols];

    for (const flag of flags) {
      passedMatches += flag ? 1 : 0;
    }

    return passedMatches;
  }

  ngOnChanges (changes: { [propName: string]: SimpleChange }): void {
    const password = changes['passwordToCheck'].currentValue;
    this.setBarColors(3, '#DDD');
    if (password) {
      const c = this.getColor(this.checkStrength(password));
      this.setBarColors(c.count, c.color);
    }
  }

  private getColor (matches: number) {
    console.log(matches);
    if (matches === 0) {
      return {
        count: 3,
        color: this.colors[0],
      };
    }

    return {
      count: matches,
      color: this.colors[matches - 1],
    };
  }

  private setBarColors (count: number, col: string): void {
    for (let n = 0; n < count; n++) {
      this.fields[n as keyof typeof this.fields] = col;
    }
  }
}
