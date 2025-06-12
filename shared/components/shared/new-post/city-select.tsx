import { useCities } from '@/shared/hooks/use-cities'
import { useRef, useState } from 'react'

interface Props {
  city: string
  setCity: (city: string) => void
  setDepartment: (department: string) => void
  className?: string
}

export const CitySelect: React.FC<Props> = ({
  city,
  setCity,
  setDepartment,
}) => {
  const [isActive, setIsActive] = useState(false)
  const cities = useCities(city, isActive)

  const cityInputRef = useRef<HTMLInputElement>(null)

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity)
    setIsActive(false)
    setDepartment('')
  }

  return (
    <div>
      <label className="text-[#8e8e8e] block">Місто</label>
      <div className="relative">
        <input
          type="text"
          value={city}
          placeholder='Введіть місто'
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setIsActive(true)}
          ref={cityInputRef}
          className="border block w-[412px] h-12 border-input rounded-md mb-4 py-2.5 px-3 placeholder:text-muted-foreground text-sm"
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
  )
}
