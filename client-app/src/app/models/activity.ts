import { ActivityCategory } from './activityCategory';

export type Activity = {
  id: string
  title: string
  date: string
  description: string
  category: ActivityCategory
  city: string
  venue: string
};
