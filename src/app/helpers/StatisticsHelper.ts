
import { Activity } from '../models/Activity';
import { ActivityDoc } from '../models/ActivityDoc';
import { convertDateStringToSeconds, convertTimeSecondsToString } from './HepersFunctions';
import { ActivityTypeStats } from '../models/ActivityTypeStats';

/**
 * 
 * Genere les statistiques classées par type d'activité
 * 
 * @param datas 
 */
export const generateStatistics = (datas: [ActivityDoc]): ActivityTypeStats[] => {

    let activitiesStats = [{}];
    let mapActivtiesByType = new Map();

    /*const runnings = datas.filter(activity => activity.activityDoc.activityType === ActivitiesEnum.RUNNING);
    mapActivtiesByType.set(ActivitiesEnum.RUNNING, runnings);
    
    const walkings = datas.filter(activity => activity.activityDoc.activityType === ActivitiesEnum.WALKING);
    mapActivtiesByType.set(ActivitiesEnum.WALKING, walkings);

    const cyclings = datas.filter(activity => activity.activityDoc.activityType === ActivitiesEnum.CYCLING);
    mapActivtiesByType.set(ActivitiesEnum.CYCLING, cyclings);*/

    /** constuction map(type activité, tableau activité) */
    for (const data of datas) {

        const key = data.activityDoc.activityType;
        const value = mapActivtiesByType.get(key);

        if (!value) {

            let newValue = {};
            newValue[key] = [data.activityDoc];
            mapActivtiesByType.set(key, newValue);
        
        } else {

            value[key] = [...value[key], data.activityDoc];
            mapActivtiesByType.set(key, value);
        }
    }

    // construction du tableau des stats par activité
    // le tableau est triè suivant l'activité qui a le plus d'items au moins
    let activityTypeStats: ActivityTypeStats[] = [];

    for (let [key, value] of mapActivtiesByType) {
        activityTypeStats.push(processActivities(key, value[key]));      
    }

    activityTypeStats.sort((a, b) => b.numberActivities - a.numberActivities);

    return activityTypeStats;
}

/**
 * 
 * Calcule les infos pour un type d'activité donnée et les données (tableau d'activité)
 * 
 * @param type 
 * @param activities 
 */
const processActivities = (type: string, activities: [Activity]): ActivityTypeStats => {

    console.log("processActivities " + type + " -- activities = " + activities.length); 

    // activityType: "RUNNING"
    // averageSpeed: 11.699999809265137
    // calories: 186
    // chrono: "00:32:26"
    // cityStart: "Pessac"
    // comment: ""
    // competition: false
    // date: "30/09/2020"
    // distance: 6327
    // heightDifference: 9.170000076293945
    // mapSnapShot: ""
    // numberOfPoints: 389
    // placeName: ""
    // timeStartActivity: 1601478721690

    const numberActivities = activities.length;
    let averageSpeed = 0;
    let totalDistance = 0;
    let totalCalories = 0;
    let totalTime = 0;
    let numberCompetition = 0;
    let cityStarts: string[] = [];
    let maxDinivele = 0;
    let dateMin = '';
    let dateMax = ''

    for (const [i, activity] of activities.entries()) {

        averageSpeed += activity.averageSpeed;
        totalDistance += activity.distance;
        totalCalories += activity.calories ? activity.calories : 0;
        numberCompetition += activity.competition ? 1 : 0;

        if (!cityStarts.includes(activity.cityStart)) cityStarts.push(activity.cityStart);

        // temps
        totalTime = totalTime + convertDateStringToSeconds(activity.chrono);

        // denivelé
        if (maxDinivele < activity.heightDifference) maxDinivele = activity.heightDifference;

        // date min/max
        if (i === 0) dateMin = activity.date;
        if ( i === numberActivities - 1) dateMax = activity.date;

    }

    cityStarts.sort();
    
    averageSpeed = averageSpeed / activities.length;
    const averageDistance = parseFloat((totalDistance / activities.length).toFixed(1));
    const averageTime = Math.round(totalTime / activities.length);

    const totalTimeString = convertTimeSecondsToString(totalTime);
    const averageTimeString = convertTimeSecondsToString(averageTime);

    const activityTypeStats: ActivityTypeStats = {

        type,
        numberActivities,
        dateMin,
        dateMax,
        cityStarts,
        totalDistance,
        averageDistance,
        totalTimeString,
        averageTimeString,
        totalCalories,
        numberCompetition,
        activities

    }

    return activityTypeStats;
    
}