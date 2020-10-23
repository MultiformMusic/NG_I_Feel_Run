
import { Activity } from '../models/Activity';
import { ActivityDoc } from '../models/ActivityDoc';
import { ActivitiesEnum } from './ActivitiesEnum';

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
    let averageTime = 0;
    let totalDistance = 0;
    let totalCalories = 0;
    let numberOfActivities = 0;
    let numberCompetition = 0;
    let cityStarts: [string];

    for (const activity of activities) {

    }
    
}