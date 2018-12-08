document.addEventListener('DOMContentLoaded', function () {

	// Trigger sidenav on smaller screens
	const sidenav = document.querySelectorAll('.sidenav')
	const nav_instance = M.Sidenav.init(sidenav)

	// Trigger modal
	const elems = document.querySelectorAll('.modal')
	const instances = M.Modal.init(elems)

	// Tabs highlighter
	const tabEl = document.querySelectorAll('.tabs')
	const tabs_instance = M.Tabs.init(tabEl)

})
