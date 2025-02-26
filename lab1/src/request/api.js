import instance from '@/request/http';

export const addv1 = ()=>instance.post('/api/v1/visit');

export const getv1 = ()=>instance.get('/api/v1/visit');