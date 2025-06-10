import styles from './WinnersDisplay.module.css';
import { DrawResult } from '../types';

interface WinnerDisplayProps {
  drawResult: DrawResult;
}

export const WinnersDisplay = ({ drawResult }: WinnerDisplayProps) => {
  const { drawDate, winners, participantCount } = drawResult;
  return (
    <div>
      <h3>Last Draw Results</h3>
      <p><strong>Draw Date: </strong>
        {drawDate ? new Date(drawDate).toLocaleString() : 'N/A'}
      </p>
      <p><strong>Participants: </strong> {participantCount}</p>
      <h4>Winners: </h4>
      {drawResult.winners.length > 0 ? (
        <ul className={styles.winnersList}>
          {winners.map((winner, index) => (
            <li key={index} className={styles.winnerItem}>{winner}</li>
          ))}
        </ul>
      ) : (
        <p>No Winner yet.</p>
      )}
    </div>
  )
}