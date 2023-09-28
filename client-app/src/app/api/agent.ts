import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

export type ActivityDto = Omit<Activity, 'id'>;

axios.defaults.baseURL = 'http://localhost:5000/api';
const ACTIVITIES_ENDPOINT = '/activities';

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const request = {
    getList: <T> (url: string) => axios.get<T>(url).then(responseBody),
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: ActivityDto) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: ActivityDto) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: () => request.getList<Activity[]>(ACTIVITIES_ENDPOINT),
    get: (id: string) => request.get<Activity>(`${ACTIVITIES_ENDPOINT}/${id}`),
    create: (dto: ActivityDto) => request.post<Activity>(ACTIVITIES_ENDPOINT, dto),
    update: (id: string, dto: ActivityDto) => request.put<Activity>(`${ACTIVITIES_ENDPOINT}/${id}`, dto),
    delete: (id: string) => request.delete<Activity>(`${ACTIVITIES_ENDPOINT}/${id}`),
};

export const agent = {
    Activities,
};
