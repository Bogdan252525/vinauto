'use client'

import { CitySelect } from './new-post/city-select'
import { DepartmentSelect } from './new-post/department-select'
import { useFormContext } from 'react-hook-form'

export const NewPostCheckout = () => {

  const { watch, setValue } = useFormContext();

  const city = watch('city');
  const department = watch('department');

  return (
    <div className="mt-4">
      <h2 className="mt-2 mb-6 text-[20px]">Доставка Новою Поштою</h2>
      <CitySelect
        city={city}
        setCity={(value) => setValue('city', value)}
        setDepartment={(value) => setValue('department', value)}
      />
      <DepartmentSelect
        city={city}
        department={department}
        setDepartment={(value) => setValue('department', value)}
      />
    </div>
  )
}
