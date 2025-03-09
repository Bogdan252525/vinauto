import Image from 'next/image';

interface Props {
  src: string;
	alt: string;
	width: number;
	height: number;
	sizes: string;
	priority: boolean;
  className?: string;
}

export const CartItemDetailsImage: React.FC<Props> = ({ src, alt, width, height, sizes, priority, className }) => {
  return 	(
	<div className='w-[60px] h-[60px] flex justify-center items-center'>
		<Image
			src={src}
			alt={alt}
			width={width}
			height={height}
			sizes={sizes}
			priority={priority}
			className={className}
		/>
	</div>
	)
};