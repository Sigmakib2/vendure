import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { Image } from 'qwik-image';
import { Collection } from '~/generated/graphql';

interface IProps {
	collection: Collection;
}

export default component$(({ collection }: IProps) => {
	return (
		<Link href={`/collections/${collection.slug}`} key={collection.id}>
			<div class="max-w-[350px] relative rounded-lg overflow-hidden hover:opacity-95 xl:w-auto mx-auto shadow-sm border group">
				<div class="w-full h-full overflow-hidden">
					<Image
						layout="fixed"
						width="350"
						height="350"
						src={collection.featuredAsset?.preview}
						alt={collection.name}
						class="transform transition-transform duration-300 group-hover:scale-110"
					/>
				</div>
				<span class="absolute w-full bottom-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50" />
				<span class="absolute w-full bottom-2 mt-auto text-center text-xl font-bold text-white">
					{collection.name}
				</span>
			</div>

		</Link>
	);
});
