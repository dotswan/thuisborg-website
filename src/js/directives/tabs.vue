<script>
export default {
	inserted: el => {
		let mobile = el.classList.contains('mobile');
		setUp();

		function setUp() {
			let navs = document.createElement('ul'),
					contents = document.createElement('div'),
					rawTabs = el.getElementsByClassName('tab');
			el.classList.add('tabs');
			navs.classList.add('nav');
			contents.classList.add('tab-contents');
			let index = 0, id = null;
			for (let tab of rawTabs) {
				index++;
				let navItem = document.createElement('li'),
						navInMobile = document.createElement('span');
				navInMobile.innerHTML = navItem.innerHTML = tab.getAttribute('data-tab-title');
				navInMobile.setAttribute('title', tab.getAttribute('data-tab-title'));
				navItem.setAttribute('title', tab.getAttribute('data-tab-title'));
				if (tab.classList.contains('active')) {
					navItem.classList.add('active');
					navInMobile.classList.add('active');
					id = index;
				}
				navItem.classList.add('nav-item');
				navInMobile.classList.add('switchtitle');
				navItem.setAttribute('data-tab-index', index);
				navInMobile.setAttribute('data-tab-index', index);
				tab.setAttribute('data-tab-index', index);
				navs.appendChild(navItem);
				navItem.addEventListener('click', function (e) {
					switchTabTo(e)
				});
				navInMobile.addEventListener('click', function (e) {
					switchTabTo(e)
				});
				//wrapp
				let intabwrapper = document.createElement('div');
				intabwrapper.classList.add('tab-contnent__wrapper');
				intabwrapper.innerHTML = rawTabs[index - 1].innerHTML;
				while (rawTabs[index - 1].firstChild) {
					rawTabs[index - 1].removeChild(rawTabs[index - 1].lastChild);
				}
				rawTabs[index - 1].append(navInMobile)
				rawTabs[index - 1].append(intabwrapper);
			}
			el.appendChild(navs);
			el.appendChild(contents);
			for (let i = 0; i < index; i++) {
				contents.appendChild(rawTabs[0]);
				let search = rawTabs[0].querySelectorAll('[click]');
				addListenerToAll(search)
			}
			if (!!el.getAttribute('handle-url') && el.getAttribute('handle-url') == 'hash') {
				handleUrl(id);
			}
		}

		function addListenerToAll(array) {
			if (array.length > -1) {
				array.forEach(item => {
					item.addEventListener('click', (e) => {
						eval(e.target.getAttribute('click'))
					});
				})
			}
		}

		function handleUrl(id) {
			let urlHash = window.location.hash.replace('#', '');
			if (!!urlHash) {
				for (let item of el.getElementsByClassName('nav-item')) {
					if (item.getAttribute('title').toLowerCase() == urlHash.toLowerCase()) {
						item.click();
					}
				}
			}
		}

		function switchTabTo(e) {
			let me = e.target,
					myIndex = me.getAttribute('data-tab-index'),
					myclass = me.classList,
					myParent = me.parentNode,
					navchilds = myParent.getElementsByClassName('nav-item'),
					contents = el.getElementsByClassName('tab-contents'),
					contentChilds = contents[0].getElementsByClassName('tab'),
					innerswitchs = el.querySelectorAll('.switchtitle');
			if (!myclass.contains('active')) {
				window.location.hash = contentChilds[myIndex - 1].getAttribute('data-tab-title');
				activeIndex(navchilds, myIndex);
				activeIndex(contentChilds, myIndex);
				activeIndex(innerswitchs, myIndex);
			} else if (mobile) {
				me.classList.remove('active');
				myParent.classList.remove('active')
			}
		}

		function activeIndex(obj, index) {
			for (let item of obj) {
				if (item.classList.contains('active')) {
					item.classList.remove('active');
				}
				if (item.getAttribute('data-tab-index') == index) {
					item.classList.add('active');
				}
			}
		}
	}
}
</script>
