import { Injectable, Logger } from '@nestjs/common';
export interface DrawResult {
  drawDate: Date | null;
  winners: string[];
  participantCount: number;
}

@Injectable()
export class DrawService {
  private readonly logger = new Logger(DrawService.name);
  private registrants = new Map<string, Date>();
  private lastDrawResult: DrawResult = {
    drawDate: null,
    winners: [],
    participantCount: 0,
  };

  constructor() {
    // Short interval for demonstration purpose
    const drawInterval = 30 * 1000;
    // Realistic interval
    // const drawInterval = 7 * 24 * 60 * 60 * 1000;
    this.logger.log(
      `Draw scheduled to run every ${drawInterval / 1000} seconds.`,
    );
    setInterval(() => this.performDraw(), drawInterval);
  }

  register(email: string): { success: boolean; message: string } {
    if (this.registrants.has(email)) {
      return {
        success: false,
        message: "Email already registered for this week's draw.",
      };
    }
    this.registrants.set(email, new Date());
    this.logger.log(`${email} has registered for the draw.`);
    return {
      success: true,
      message: 'Successfully registered for the lucky draw!',
    };
  }

  getWinners(): DrawResult {
    return this.lastDrawResult;
  }

  private performDraw(): void {
    this.logger.log('=== Performing Weekly Draw ===');
    const participantsList = Array.from(this.registrants.keys());
    const participantCount = participantsList.length;

    let winners: string[] = [];

    // need 3 winners, skip if not enough participants
    if (participantsList.length >= 3) {
      winners = this._selectWinners(participantsList, 3);
      this.logger.log("This week's winners are: " + winners.join(', '));
    } else {
      this.logger.warn(
        'Not enough participants for a full draw. Skipping this week.',
      );
    }
    this._commitDrawResults(winners, participantCount);

    this.logger.log('=== Weekly Draw Complete ===');
    this.logger.log('Registrations are open for next week.');
  }

  private _selectWinners(participants: string[], count: number): string[] {
    const shuffled = [...participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  private _commitDrawResults(
    winners: string[],
    participantCount: number,
  ): void {
    this.lastDrawResult = {
      drawDate: new Date(),
      winners: winners,
      participantCount,
    };
    this.registrants.clear();
  }
}
