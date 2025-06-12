'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type City = { Ref: string; Description: string };
type Department = { Ref: string; Description: string };

const NovaPoshtaCheckout = () => {  
  const [city, setCity] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isCityInputActive, setIsCityInputActive] = useState<boolean>(false);
  const [isDepartmentInputActive, setIsDepartmentInputActive] = useState<boolean>(false);

  const cityInputRef = useRef<HTMLInputElement>(null);
  const departmentInputRef = useRef<HTMLInputElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_NOVA_POSHTA_API_KEY || '4c8f4324cd4a27f4e2226ab11e0a946f';

  useEffect(() => {
    if (isCityInputActive && city.length >= 1) {
      axios
        .post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: { FindByString: city },
        })
        .then((response) => setCities(response.data.data))
        .catch((error) => console.error('Помилка отримання міст:', error));
    } else {
      setCities([]);
    }
  }, [city, isCityInputActive]);

  useEffect(() => {
    if (city && isDepartmentInputActive) {
      axios
        .post('https://api.novaposhta.ua/v2.0/json/', {
          apiKey,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: { CityName: city, FindByString: department },
        })
        .then((response) => setDepartments(response.data.data))
        .catch((error) => console.error('Помилка отримання відділень:', error));
    } else {
      setDepartments([]);
    }
  }, [city, department, isDepartmentInputActive]);

  useEffect(() => {
    if (isCityInputActive && cityInputRef.current) cityInputRef.current.focus();
  }, [isCityInputActive]);

  useEffect(() => {
    if (isDepartmentInputActive && departmentInputRef.current) departmentInputRef.current.focus();
  }, [isDepartmentInputActive]);

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setIsCityInputActive(false);
    setCities([]);
    setDepartment('');
    setDepartments([]);
  };

  const handleDepartmentSelect = (selectedDepartment: string) => {
    setDepartment(selectedDepartment);
    setIsDepartmentInputActive(false);
    setDepartments([]);
  }
  

  return (
    <div className="mt-4">
      <h2 className="mt-2 mb-6 text-[20px]">Доставка Новою Поштою</h2>

      {/* Вибір міста */}
      <div>
        <label className="text-[#8e8e8e] block">Місто</label>
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsCityInputActive(true)}
            ref={cityInputRef}
            className="border block w-[412px] h-12 border-[#C6C6C6] bg-[#F6F6F6] rounded-lg mb-4 py-2.5 px-3"
          />
          {cities.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 max-h-48 overflow-y-auto">
              {cities.map((cityItem) => (
                <li
                  key={cityItem.Ref}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleCitySelect(cityItem.Description)}
                >
                  {cityItem.Description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Вибір відділення */}
      <div>
        <label className="text-[#8e8e8e] block">Відділення</label>
        <div className="relative">
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            onFocus={() => setIsDepartmentInputActive(true)}
            ref={departmentInputRef}
            className="border block w-[412px] h-12 border-[#C6C6C6] bg-[#F6F6F6] rounded-lg mb-4 py-2.5 px-3"
          />
          {isDepartmentInputActive && departments.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-10 max-h-48 overflow-y-auto">
              {departments.map((deptItem) => (
                <li
                  key={deptItem.Ref}
                  className="p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleDepartmentSelect(deptItem.Description)}
                >
                  {deptItem.Description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default NovaPoshtaCheckout;
