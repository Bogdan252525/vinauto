import { useDepartments } from '@/shared/hooks'
import { useRef, useState } from 'react'

interface Props {
  department: string
  setDepartment: (department: string) => void
  city: string
  className?: string
}

export const DepartmentSelect: React.FC<Props> = ({
  department,
  setDepartment,
  city,
}) => {
  const [isActive, setIsActive] = useState(false)
  const departments = useDepartments(city, department, isActive)

  const cityInputRef = useRef<HTMLInputElement>(null)

  const handleDepartmentSelect = (selectedDepartment: string) => {
    setDepartment(selectedDepartment)
    setIsActive(false)
  }

  return (
    <div>
      <label className="text-[#8e8e8e] block">Відділення</label>
      <div className="relative">
        <input
          type="text"
          value={department}
          placeholder='Введіть відділення'
          onChange={(e) => setDepartment(e.target.value)}
          onFocus={() => setIsActive(true)}
          ref={cityInputRef}
          className="border block w-[412px] h-12 border-input rounded-md mb-4 py-2.5 px-3 placeholder:text-muted-foreground text-sm"
        />
        {departments.length > 0 && (
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
  )
}
