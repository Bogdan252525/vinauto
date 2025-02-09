'use client'

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import { Dancing_Script } from 'next/font/google'
import { useCategoryStore } from '@/store/categoryStore';
import Link from 'next/link';

const dancingScript = Dancing_Script({
	weight: "700",
	subsets: ["latin"]
});

interface Props {
	className?: string;
}

export const HeaderLogo: React.FC<Props> = ({ className }) => {
	const setSelectedCategory = useCategoryStore((state) => state.setSelectedCategory);
  const setProducts = useCategoryStore((state) => state.setProducts);

	const handleLogoClick = () => {
    setSelectedCategory(null);
    setProducts([]);
  };

	return (
		<div
			onClick={handleLogoClick}
			className={cn('flex flex-col justify-center items-center cursor-pointer', className)}>
			<Link href="/">
				<p className={`${dancingScript.className} uppercase text-background text-xl`}>vinauto</p>
				<Image
					src="/assets/img/logo.png"
					alt="Logo"
					width={0}
					height={0}
					sizes="100vw"
					priority
					className="w-[100px] h-auto"
				/>
			</Link>
		</div>
	);
};