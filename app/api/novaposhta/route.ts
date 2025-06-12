import { NextResponse } from 'next/server';
import { config } from '@/shared/config/config';

export async function POST(req: Request) {
  try {
    const { type, query, city } = await req.json();

    if (!type || (type === 'cities' && !query) || (type === 'departments' && !city)) {
      return NextResponse.json({ error: 'Некоректні параметри запиту' }, { status: 400 });
    }
  
    const requestData = {
      apiKey: config.NEW_POST_KEY,
      modelName: 'Address',
      calledMethod: type === 'cities' ? 'getCities' : 'getWarehouses',
      methodProperties: type === 'cities' ? { FindByString: query } : { CityName: city, FindByString: query },
    };
  
    const response = await fetch(config.NEW_POST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
  
    if (!response.ok) {
      throw new Error('Помилка при отриманні даних від API');
    }
  
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Невідома помилка";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
