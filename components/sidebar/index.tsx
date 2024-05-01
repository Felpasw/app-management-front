export default function sidebar(){
    return <div className="flex flex-col h-full p-3 w-60  bg-gradient-to-r from-black via-black to-blue-900  min-h-[100vh]">
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<h2>Dashboard</h2>
			<button className="p-2">
			</button>
		</div>
		<div className="relative">
			<span className="absolute inset-y-0 left-0 flex items-center py-4">
				<button type="submit" className="p-2 focus:outline-none focus:ring">
				</button>
			</span>
		</div>
		<div className="flex-1">
			<ul className="pt-2 pb-4 space-y-1 text-sm">
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md text-white">
						<span>PCs disponíveis</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md text-white">
						<span>Gerenciar usuários</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md text-white">
						<span>Monitorar</span>
					</a>
				</li>
				<li className="rounded-sm">
				<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md text-white">
						<span>Orders</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md text-white">
						<span>Wishlist</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
						<span>Settings</span>
					</a>
				</li>
				<li className="rounded-sm">
					<a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
						<span>Logout</span>
					</a>
				</li>
			</ul>
		</div>
	</div>
	<div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
		<img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500" />
		<div>
			<h2 className="text-lg font-semibold">Leroy Jenkins</h2>
			<span className="flex items-center space-x-1">
				<a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-600">View profile</a>
			</span>
		</div>
	</div>
</div>
}