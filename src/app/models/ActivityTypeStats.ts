import { Activity } from './Activity';

export interface ActivityTypeStats {
    type: string;
    numberActivities: number;
    dateMin: string;
    dateMax: string;
    cityStarts: string[];
    totalDistance: number;
    averageDistance: number;
    averageSpeed: number;
    totalTimeString: string;
    averageTimeString: string;
    totalCalories: number;
    numberCompetition: number;
    activities: [Activity]
}