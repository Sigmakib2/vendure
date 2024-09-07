import { component$, useContext } from '@builder.io/qwik';
import { Image } from 'qwik-image';
import CollectionCard from '~/components/collection-card/CollectionCard';
import { APP_STATE, HOMEPAGE_IMAGE } from '~/constants';

export default component$(() => {
	const collections = useContext(APP_STATE).collections;
	return (
		<div>
			<div class="relative h-[600px]">
				<div class="absolute inset-0 overflow-hidden">
					<Image
						layout="fullWidth"
						class="h-full md:w-full"
						width="800"
						height="600"
						src={HOMEPAGE_IMAGE}
						alt="Background header photo of bicycle taken by Mikkel Bech"
					/>
					<div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 mix-blend-overlay" />
				</div>
				<div class="absolute inset-0 bg-gray-900 opacity-50" />
				<div class="relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center text-center sm:py-64 lg:px-0">
					<div class="relative bg-zinc-800 bg-opacity-0 rounded-lg p-0">
						<h1 class="text-6xl text-transparent bg-clip-text font-extrabold tracking-normal lg:text-6xl bg-gradient-to-r from-cyan-400 via-cyan-300-500 to-white">
							{$localize`The Vape Shop`}
						</h1>
					</div>

					<p class="mt-4 text-2xl text-white">
						The Description of the shop which is SEO friendly
					</p>
				</div>
			</div>

			<section class="pt-12 xl:max-w-7xl xl:mx-auto xl:px-8">
				<div class="mt-4 flow-root mb-10">
					<div class="-my-2">
						<div class="box-content py-2 px-2 relative overflow-x-auto xl:overflow-visible">
							<div class="sm:px-6 lg:px-8 xl:px-0 pb-4 items-center text-center mb-10">
								<h2 class="text-2xl font-light tracking-tight text-gray-900">Our Collection</h2>
							</div>
							<div class="grid justify-items-center grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-8 sm:px-6 lg:px-8 xl:relative xl:px-0 xl:space-x-0 xl:gap-x-8">
								{collections.map((collection) =>
									collection.featuredAsset ? (
										<CollectionCard key={collection.id} collection={collection} />
									) : null
								)}
							</div>
						</div>
					</div>
				</div>

				<div>
					<h2>About Us</h2>
					<p>
						Welcome to Your Vape Shop Name, your ultimate destination for premium vaping products and accessories. Located in the heart of City/Region, we pride ourselves on offering a wide range of high-quality e-liquids, top-brand devices, and accessories to satisfy both new and experienced vapers. Our knowledgeable team is here to provide personalized recommendations, ensuring you find the perfect product to suit your style and preference. At Your Vape Shop Name, we are committed to promoting a responsible and enjoyable vaping experience. Explore our selection today, and join our community of satisfied customers who trust us for all their vaping needs.
					</p>

					<h2>Our Products</h2>
					<p>
						Discover our extensive selection of products, including the latest e-cigarettes, vape mods, e-liquids in a variety of flavors, coils, tanks, and more. We only stock top-quality brands that meet rigorous safety standards, ensuring you enjoy a superior vaping experience every time. Whether you're looking for the newest tech or just starting your vaping journey, we have something for everyone.
					</p>

					<h2>Why Us?</h2>
					<p>
						At Your Vape Shop Name, we offer more than just products — we provide a complete vaping experience. Here’s why you should choose us:
					</p>
					<ul>
						<li>Extensive Range: A wide variety of products to suit all preferences and experience levels.</li>
						<li>Quality Assurance: Only the best brands, tested for safety and performance.</li>
						<li>Customer-Centric Service: Friendly, knowledgeable staff ready to help with any questions.</li>
						<li>Exclusive Deals: Regular promotions and discounts to ensure you get the best value.</li>
						<li>Community-Focused: A welcoming environment for all, from beginners to seasoned vapers.</li>
					</ul>

					<h3>Contact Us</h3>
					<p>
						Got questions? We’re here to help! Reach out to us via phone, email, or visit our store for in-person assistance. Stay connected with us through our social media channels for the latest updates, special offers, and exclusive promotions.
					</p>
				</div>
			</section>
		</div>
	);
});
