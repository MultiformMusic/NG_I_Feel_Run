
import { Activity } from '../models/Activity';
import { ActivityDoc } from '../models/ActivityDoc';
import { convertDateStringToSeconds, convertTimeSecondsToString } from './HepersFunctions';

export const generateStatistics = (datas: [ActivityDoc]) => {

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

    console.log(mapActivtiesByType);

    for (let [key, value] of mapActivtiesByType) {
        processActivities(key, value[key]);      
    }
}

const processActivities = (type: string, activities: [Activity]) => {

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

    let averageSpeed = 0;
    let totalDistance = 0;
    let totalCalories = 0;
    let totalTime = 0;
    let numberCompetition = 0;
    let cityStarts: string[] = [];

    for (const activity of activities) {

        averageSpeed += activity.averageSpeed;
        totalDistance += activity.distance;
        totalCalories += activity.calories ? activity.calories : 0;
        numberCompetition += activity.competition ? 1 : 0;

        if (!cityStarts.includes(activity.cityStart)) cityStarts.push(activity.cityStart);

        // temps
        totalTime = totalTime + convertDateStringToSeconds(activity.chrono);
    }

    averageSpeed = averageSpeed / activities.length;
    const averageDistance = totalDistance / activities.length;
    const averageTime = Math.round(totalTime / activities.length);

    const totalTimeString = convertTimeSecondsToString(totalTime);
    const averageTimeString = convertTimeSecondsToString(averageTime);

    console.log("fin");
    
}