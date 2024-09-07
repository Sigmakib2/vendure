import { $, component$, useContext, useVisibleTask$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
import { APP_STATE, CUSTOMER_NOT_DEFINED_ID } from '~/constants';
import { logoutMutation } from '~/providers/shop/account/account';
import { getActiveCustomerQuery } from '~/providers/shop/customer/customer';
//import { GitHubLink } from '../GitHubLink/GitHubLink';
import LogoutIcon from '../icons/LogoutIcon';
import MenuIcon from '../icons/MenuIcon';
import ShoppingBagIcon from '../icons/ShoppingBagIcon';
//import UserIcon from '../icons/UserIcon';
import SearchBar from '../search-bar/SearchBar';

export default component$(() => {
	const appState = useContext(APP_STATE);
	const collections = useContext(APP_STATE).collections.filter(
		(item) => item.parent?.name === '__root_collection__' && !!item.featuredAsset
	);

	const totalQuantity =
		appState.activeOrder?.state !== 'PaymentAuthorized'
			? appState.activeOrder?.totalQuantity || 0
			: 0;

	useVisibleTask$(async () => {
		if (appState.customer.id === CUSTOMER_NOT_DEFINED_ID) {
			const activeCustomer = await getActiveCustomerQuery();
			if (activeCustomer) {
				appState.customer = {
					title: activeCustomer.title ?? '',
					firstName: activeCustomer.firstName,
					id: activeCustomer.id,
					lastName: activeCustomer.lastName,
					emailAddress: activeCustomer.emailAddress,
					phoneNumber: activeCustomer.phoneNumber ?? '',
				};
			}
		}
	});

	const logout = $(async () => {
		await logoutMutation();
		// force hard refresh
		window.location.href = '/';
	});

	return (
		<div
			class={`bg-gradient-to-r from-blue-700 to-indigo-900 transform shadow-xl sticky top-0 z-10 animate-dropIn`}
		>
			<header>
				<div class="max-w-6xl mx-auto p-4 flex items-center justify-between">
					<div class="flex items-center space-x-4">
						<button
							class="block sm:hidden text-white"
							onClick$={() => (appState.showMenu = !appState.showMenu)}
						>
							<MenuIcon />
						</button>
						<h1 class="text-white w-10">
							<Link href="/">
								<img src={`/vape.png`} width={40} height={31} alt="Vendure logo" />
							</Link>
						</h1>
						<div class="hidden space-x-4 sm:block">
							{collections.map((collection) => (
								<Link
									class="text-sm md:text-base text-gray-200 hover:text-white"
									href={`/collections/${collection.slug}`}
									key={collection.id}
								>
									{collection.name}
								</Link>
							))}
						</div>
					</div>

					<div class="flex items-center space-x-4">
						<div class="flex items-center space-x-4">
							<Link
								href={appState.customer.id !== CUSTOMER_NOT_DEFINED_ID ? '/account' : '/sign-in'}
								class="flex items-center space-x-1 pb-1 pr-2"
							>
								<span class="mt-1 text-white">
									{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID
										? $localize`Account`
										: $localize`Sign In`}
								</span>
							</Link>
							{appState.customer.id !== CUSTOMER_NOT_DEFINED_ID && (
								<button onClick$={logout} class="text-gray-700">
									<div class="flex items-center cursor-pointer">
										<LogoutIcon />
									</div>
								</button>
							)}
						</div>

						<div>
							<button
								name="Cart"
								aria-label={`${totalQuantity} items in cart`}
								class="relative w-9 h-9 bg-white bg-opacity-20 rounded text-white p-1"
								onClick$={() => (appState.showCart = !appState.showCart)}
							>
								<ShoppingBagIcon />
								{totalQuantity ? (
									<div class="absolute rounded-full -top-2 -right-2 bg-primary-600 w-6 h-6">
										{totalQuantity}
									</div>
								) : (
									''
								)}
							</button>
						</div>
						<div class="relative inline-block text-left">
							<input type="checkbox" id="dropdownToggle" class="hidden peer" />
							<label for="dropdownToggle" class="px-4 py-2 bg-white bg-opacity-20 text-white rounded-md hover:bg-blue-600 cursor-pointer">
								🔍 Search
							</label>
							<div class="absolute right-0 mt-8 w-96 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 peer-checked:opacity-100 peer-checked:block hidden transition-opacity duration-300">
								<div class="py-1">
									<SearchBar />
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
});
