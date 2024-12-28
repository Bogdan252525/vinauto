import React from 'react';
import { Button } from "@/components/ui"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui"
import { Input } from "@/components/ui"
import { Label } from "@/components/ui"
import { LogIn } from 'lucide-react';

export const ModalRegister: React.FC = () => {
	return (
		<Dialog>
      <DialogTrigger asChild>
        <Button
					variant="link"
					className='text-background text-lg'
				>
					<div
						className="w-5 h-5 flex items-center [&_svg]:size-5"
					>
						<LogIn />			
					</div>
					Вхід
				</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Реєстрація</DialogTitle>
          <DialogDescription>
            Введіть будь-ласка ваш email та пароль
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Email
            </Label>
            <Input id="name" value="vasya@pupkin.com" className="col-span-3" type="email" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Пароль
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" type="password" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Зберегти</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
	);
};